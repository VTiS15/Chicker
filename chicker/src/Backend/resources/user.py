from datetime import datetime, timedelta

from db import chat_db, post_db, user_db
from collections.user import User
from flask_login import current_user, login_required, login_user, logout_user
from flask_restful import Resource, reqparse
from login import login_manager
from pymongo import DESCENDING
from werkzeug.security import check_password_hash, generate_password_hash
from PIL import Image
from io import BytesIO
from bson.objectid import ObjectId
from flask import jsonify
from bson import json_util
import json


@login_manager.user_loader
def load_user(id):
    user = user_db.user.find_one({"_id": ObjectId(id)})
    if not user:
        return None
    return User(**json.loads(json_util.dumps(user)))


@login_manager.unauthorized_handler
def unauthorized():
    return {"msg": "Not logged in."}, 401


class GetUser(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument("user_id", type=str, required=True, help="ID of target user.")

    def get(self):
        data = GetUser.parser.parse_args()
        user = user_db.user.find_one({"_id": ObjectId(data.user_id)})

        if user:
            return json.loads(json_util.dumps(user))

        return {"msg": "User not found."}, 404


class UserLogin(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument("username", type=str, required=True, help="Name of user.")
    parser.add_argument("password", type=str, required=True, help="Password of user.")

    def post(self):
        data = UserLogin.parser.parse_args()
        user = user_db.user.find_one({"username": data["username"]})

        if user:
            if check_password_hash(user["password_hash"], data.password):
                login_user(User(**json.loads(json_util.dumps(user))))
                return {"msg": "Success."}, 200

            return {"msg": "Invalid password."}, 401

        return {"msg": "Invalid username."}, 401


class UserLogout(Resource):
    @login_required
    def post(self):
        logout_user()
        return {"msg": "Success."}, 200


class UserRegister(Resource):
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
    parser = reqparse.RequestParser()
    parser.add_argument("user_id", type=str, required=True, help="ID of target user.")

    @login_required
    def delete(self):
        if current_user.is_admin:
            data = UserDelete.parser.parse_args()

            if data.user_id == str(current_user._id):
                return {"msg": "Deletion of self is forbidden."}, 400
            
            user_id = ObjectId(data.user_id)

            if user_db.user.delete_one({"_id": user_id}).deleted_count == 1:
                user_db.user.update_many({}, {"$pull": {"followers": user_id}})
                user_db.user.update_many({}, {"$pull": {"followees": user_id}})
                post_db.post.delete_many({"creator_id": user_id})
                post_db.comment.delete_many({"creator_id": user_id})
                chat_db.chat.delete_many(
                    {"$or": [{"user1_id": user_id}, {"user2_id": user_id}]}
                )

                return {"msg": "Success"}, 200

            return {"msg": "User not found."}, 404

        return {"msg": "Permission denied."}, 403


class UserFollow(Resource):
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
    parser = reqparse.RequestParser()
    parser.add_argument("user_id", type=str, required=True, help="ID of target user.")

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
                    {
                        "$set": {
                            "is_admin": not user_db.user.find_one(
                                {"_id": user_id}
                            )["is_admin"]
                        }
                    },
                ).matched_count
                == 1
            ):
                return {"msg": "Success."}, 200

            return {"msg": "User not found."}, 404

        return {"msg": "Permission denied."}, 403


class UserRecommend(Resource):
    def get(self):
        return {
            "recommended_users": [
                str(user["_id"])
                for user in user_db.user.find(
                    {"date": {"$gte": datetime.now() - timedelta(days=30)}}
                ).sort("date", DESCENDING)
            ][:5]
        }


class UserUpdate(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument("email", type=str, help="New email of user")
    parser.add_argument("bio", type=str, help="New bio of user.")

    @login_required
    def post(self):
        data = UserUpdate.parser.parse_args()

        if not data.email and not data.bio:
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
            file = user_db.fs.files.find_one_and_delete(
                {"filename": f"{current_user._id}_icon.ico"}
            )
            if file:
                user_db.fs.chunks.delete_many({"files_id": file["_id"]})

            icon = Image.open(data.icon)
            icon.resize((64, 64))
            with BytesIO as f:
                icon.save(f, format="ICO")
                user_db.user.update_one(
                    {"_id": current_user._id},
                    {
                        "$set": {
                            "icon_id": gridfs.GridFS(user_db).put(
                                f.getvalue(),
                                filename=f"{str(current_user._id)}_icon.ico",
                            )
                        }
                    },
                )

        return {"msg": "Success."}, 200
