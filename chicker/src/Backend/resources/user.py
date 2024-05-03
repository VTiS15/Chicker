import json
from datetime import datetime, timedelta
from io import BytesIO

import gridfs
from bson import json_util
from bson.objectid import ObjectId
from db import chat_db, post_db, user_db
from flask import send_file
from flask_login import current_user, login_required, login_user, logout_user
from flask_restful import Resource, reqparse
from login import login_manager
from mongo.user import User
from PIL import Image
from pymongo import DESCENDING
from utils import allowed_file
from werkzeug.datastructures import FileStorage
from werkzeug.security import check_password_hash, generate_password_hash


@login_manager.user_loader
def load_user(id):
    """This is a callback function for login_manager.user_loader.
    
    It reload the user object from the user ID stored in the session.

    Args:
        id (str): ID of a user

    Returns:
        mongo.user.User: the corresponding user object
    """

    user = user_db.user.find_one({"_id": ObjectId(id)})
    if not user:
        return None
    return User(**json.loads(json_util.dumps(user)))


@login_manager.unauthorized_handler
def unauthorized():
    """This is a callback function for login_manager.unauthorized_handler.

    Returns:
        dict: an error message in JSON format.
        int: 401 HTTP status code
    """
    return {"msg": "Not logged in."}, 401


class GetUser(Resource):
    """RESTful API resource that returns the information of a user."""
    parser = reqparse.RequestParser()
    parser.add_argument(
        "user_id", type=str, required=True, help="ID of target user.", location="args"
    )

    def get(self):
        data = GetUser.parser.parse_args()
        user = user_db.user.find_one({"_id": ObjectId(data.user_id)})

        if user:
            response = json.loads(json_util.dumps(user))
            del response["password_hash"]
            del response["settings"]
            del response["is_admin"]

            return response, 200

        return {"msg": "User not found."}, 404


class GetUsers(Resource):
    """RESTful API resource that returns the information of all users."""
    def get(self):
        response = {"users": []}

        for user in user_db.user.find({}):
            d = json.loads(json_util.dumps(user))
            del d["password_hash"]
            del d["settings"]
            del d["followers"]
            del d["followees"]

            response["users"].append(d)

        return response, 200


class GetIcon(Resource):
    """RESTful API resource that returns a user's icon."""
    parser = reqparse.RequestParser()
    parser.add_argument(
        "user_id", type=str, required=True, help="ID of target user.", location="args"
    )

    def get(self):
        data = GetIcon.parser.parse_args()
        fs = gridfs.GridFS(user_db)

        user = user_db.user.find_one({"_id": ObjectId(data.user_id)})
        if user:
            try:
                f = fs.get(ObjectId(user["icon_id"]))
            except gridfs.NoFile:
                return {"msg": "File not found."}, 404

            return send_file(
                BytesIO(f.read()),
                mimetype="image/vnd.microsoft.icon",
                as_attachment=True,
                download_name=f.filename,
            )

        return {"msg": "User not found."}, 404


class UserLogin(Resource):
    """RESTful API resource that logs in a user."""
    parser = reqparse.RequestParser()
    parser.add_argument("username", type=str, required=True, help="Name of user.")
    parser.add_argument("password", type=str, required=True, help="Password of user.")

    def post(self):
        data = UserLogin.parser.parse_args()
        user = user_db.user.find_one({"username": data["username"]})

        if user:
            if check_password_hash(user["password_hash"], data.password):
                login_user(User(**json.loads(json_util.dumps(user))))
                return {"user_id": str(current_user._id)}, 200

            return {"msg": "Invalid password."}, 401

        return {"msg": "Invalid username."}, 401


class UserLogout(Resource):
    """RESTful API resource that logs out a user."""
    @login_required
    def post(self):
        logout_user()
        return {"msg": "Success."}, 200


class UserRegister(Resource):
    """RESTful API resource that registers a new user."""
    parser = reqparse.RequestParser()
    parser.add_argument("username", type=str, required=True, help="Name of new user.")
    parser.add_argument(
        "email", type=str, required=True, help="Email address of new user."
    )
    parser.add_argument(
        "password", type=str, required=True, help="Password of new user."
    )

    def post(self):
        data = UserRegister.parser.parse_args()

        if not user_db.user.find_one({"username": data["username"]}):
            if (
                User(data.username, data.email, generate_password_hash(data.password))
                .save()
                .inserted_id
            ):
                return {"msg": "Success."}, 200

        return {"msg": "Username taken."}, 409


class UserDelete(Resource):
    """RESTful API resource that deletes a user."""
    parser = reqparse.RequestParser()
    parser.add_argument("user_id", type=str, required=True, help="ID of target user.")

    @login_required
    def delete(self):
        if current_user.is_admin:
            data = UserDelete.parser.parse_args()

            if data.user_id == str(current_user._id):
                return {"msg": "Deletion of self is forbidden."}, 400

            user_id = ObjectId(data.user_id)
            user = user_db.user.find_one_and_delete({"_id": user_id})

            if user:
                user_db.user.update_many({}, {"$pull": {"followers": user_id}})
                user_db.user.update_many({}, {"$pull": {"followees": user_id}})

                icon = user_db.fs.files.find_one_and_delete({"_id": user["icon_id"]})
                if icon:
                    user_db.fs.chunks.delete_many({"files_id": icon["_id"]})

                for post in post_db.post.find({"creator_id": user_id}):
                    for image_id in post["image_ids"]:
                        post_db.fs.chunks.delete_many({"files_id": image_id})
                        post_db.fs.files.delete_one({"_id": image_id})

                    for video_id in post["video_ids"]:
                        post_db.fs.chunks.delete_many({"files_id": video_id})
                        post_db.fs.files.delete_one({"_id": video_id})

                    for comment_id in post["comment_ids"]:
                        post_db.comment.delete_one({"_id": comment_id})

                post_db.post.delete_many({"creator_id": user_id})
                post_db.comment.delete_many({"creator_id": user_id})

                for chat in chat_db.chat.find(
                    {"$or": [{"user1_id": user_id}, {"user2_id": user_id}]}
                ):
                    for message in chat["messages"]:
                        for image_id in message["image_ids"]:
                            chat_db.fs.chunks.delete_many({"files_id": image_id})
                            chat_db.fs.files.delete_one({"_id": image_id})

                        for video_id in message["video_ids"]:
                            chat_db.fs.chunks.delete_many({"files_id": video_id})
                            chat_db.fs.files.delete_one({"_id": video_id})

                chat_db.chat.delete_many(
                    {"$or": [{"user1_id": user_id}, {"user2_id": user_id}]}
                )

                return {"msg": "Success"}, 200

            return {"msg": "User not found."}, 404

        return {"msg": "Permission denied."}, 403


class UserFollow(Resource):
    """RESTful API resource that follows another user for a user."""
    parser = reqparse.RequestParser()
    parser.add_argument("user_id", type=str, required=True, help="ID of target user.")

    @login_required
    def post(self):
        data = UserFollow.parser.parse_args()

        if data.user_id == str(current_user._id):
            return {"msg": "Following self is forbidden."}, 400

        user_id = ObjectId(data.user_id)

        if user_id in current_user.followees:
            return {"msg": "Operator is already following user."}, 400

        if (
            user_db.user.update_one(
                {"_id": user_id},
                {"$push": {"followers": current_user._id}},
            ).matched_count
            == 1
        ):
            user_db.user.update_one(
                {"_id": current_user._id},
                {"$push": {"followees": user_id}},
            )

            return {"msg": "Success."}, 200

        return {"msg": "User not found."}, 404


class UserUnfollow(Resource):
    """RESTful API resource that unfollows another user for a user."""
    parser = reqparse.RequestParser()
    parser.add_argument("user_id", type=str, required=True, help="ID of target user.")

    @login_required
    def post(self):
        data = UserUnfollow.parser.parse_args()

        if data.user_id == str(current_user._id):
            return {"msg": "Unfollowing self is forbidden."}, 400

        user_id = ObjectId(data.user_id)

        update_result = user_db.user.update_one(
            {"_id": user_id},
            {"$pull": {"followers": current_user._id}},
        )
        if update_result.matched_count == 1:
            if update_result.modified_count == 1:
                user_db.user.update_one(
                    {"_id": current_user._id},
                    {"$pull": {"followees": user_id}},
                )

                return {"msg": "Success."}, 200

            return {"msg": "Operator is not following user."}, 404

        return {"msg": "User not found."}, 404


class UserStatusChange(Resource):
    """RESTful API resource that changes the status of a user."""
    parser = reqparse.RequestParser()
    parser.add_argument("user_id", type=str, required=True, help="ID of target user.")
    parser.add_argument(
        "is_admin", type=bool, required=True, help="New status of target user."
    )

    @login_required
    def post(self):
        if current_user.is_admin:
            data = UserStatusChange.parser.parse_args()

            if str(current_user._id) == data.user_id:
                return {"msg": "Change of status of self is forbidden."}, 400

            user_id = ObjectId(data.user_id)

            if (
                user_db.user.update_one(
                    {"_id": user_id},
                    {"$set": {"is_admin": data.is_admin}},
                ).matched_count
                == 1
            ):
                return {"msg": "Success."}, 200

            return {"msg": "User not found."}, 404

        return {"msg": "Permission denied."}, 403


class UserRecommend(Resource):
    """RESTful API resource that recommends maximum 10 users."""
    def get(self):
        return {
            "recommended_users": [
                str(user["_id"])
                for user in user_db.user.find(
                    {"date": {"$gte": datetime.now() - timedelta(days=30)}}
                ).sort("date", DESCENDING)
            ][:10]
        }


class UserUpdate(Resource):
    """RESTful API resource that updates a user's email, bio, or icon."""
    parser = reqparse.RequestParser()
    parser.add_argument("email", type=str, help="New email of user", location="form")
    parser.add_argument("bio", type=str, help="New bio of user.", location="form")
    parser.add_argument(
        "icon", type=FileStorage, help="New icon of user.", location="files"
    )

    @login_required
    def post(self):
        data = UserUpdate.parser.parse_args()

        if not data.email and not data.bio and not data.icon:
            return {"msg": "Input is null."}, 400

        if data.email:
            user_db.user.update_one(
                {"_id": current_user._id}, {"$set": {"email": data.email}}
            )
        if data.bio:
            user_db.user.update_one(
                {"_id": current_user._id}, {"$set": {"bio": data.bio}}
            )
        if data.icon:
            if current_user.icon_id:
                file = user_db.fs.files.find_one_and_delete(
                    {"_id": ObjectId(current_user.icon_id["$oid"])}
                )
                if file:
                    user_db.fs.chunks.delete_many({"files_id": file["_id"]})

            if allowed_file(data.icon.filename, {"png", "jpg", "jpeg", "ico"}):
                icon = Image.open(data.icon)
                icon.resize((64, 64))
                with BytesIO() as f:
                    icon.save(f, format="ICO")
                    if (
                        user_db.user.update_one(
                            {"_id": current_user._id},
                            {
                                "$set": {
                                    "icon_id": gridfs.GridFS(user_db).put(
                                        f.getvalue(), filename=f"{current_user._id}.ico"
                                    )
                                }
                            },
                        ).modified_count
                        == 1
                    ):
                        return {"msg": "Success."}, 200

                return {
                    "msg": 'Only images with extension "png", "jpg", "jpeg", and "ico" are allowed.'
                }, 400

            return {"msg": "Unexpected error occurred."}, 500


class SearchUsers(Resource):
    """RESTful API resource that searches for a user given a text prompt."""
    parser = reqparse.RequestParser()
    parser.add_argument("prompt", type=str, help="Search prompt.", location="args")

    def get(self):
        data = SearchUsers.parser.parse_args()
        response = {"result": []}

        for user in user_db.user.find(
            {"username": {"$regex": data.prompt, "$options": "i"}}
        ):
            d = json.loads(json_util.dumps(user))
            del d["password_hash"]
            del d["settings"]
            del d["is_admin"]
            del d["followers"]
            del d["followees"]
            del d["date"]
            del d["bio"]

            response["result"].append(d)

        return response, 200


class SettingsUpdate(Resource):
    """RESTful API resource that updates a user's settings."""
    parser = reqparse.RequestParser()
    parser.add_argument("color", type=str, required=True, help="Color of font.")
    parser.add_argument("size", type=int, required=True, help="Size of font.")
    parser.add_argument("style", type=str, required=True, help="Style of font.")

    @login_required
    def post(self):
        data = SettingsUpdate.parser.parse_args()

        if (
            user_db.user.update_one(
                {"_id": current_user._id},
                {
                    "$set": {
                        "settings": {
                            "color": data.color,
                            "size": data.size,
                            "style": data.style,
                        }
                    }
                },
            ).modified_count
            == 1
        ):
            return {"msg": "Success."}, 200

        return {"msg": "Unexpected error occurred."}, 500
