import json

import gridfs
from bson import ObjectId, json_util
from db import post_db
from flask_login import current_user, login_required
from flask_restful import Resource, reqparse
from mongo.post import Comment, Post
from utils import allowed_file
from werkzeug.datastructures import FileStorage


class CreatePost(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument(
        "text",
        type=str,
        help="Text of post.",
        location="form",
    )
    parser.add_argument(
        "is_private",
        type=bool,
        help="Whether post is private.",
        location="form",
    )
    parser.add_argument(
        "images",
        type=FileStorage,
        action="append",
        help="Images of message.",
        location="files",
    )
    parser.add_argument(
        "videos",
        type=FileStorage,
        action="append",
        help="Videos of message.",
        location="files",
    )

    @login_required
    def post(self):
        data = CreatePost.parser.parse_args()

        if not data.text and not data.images and not data.videos:
            return {"msg": "Input is null."}, 400

        image_ids = []
        video_ids = []

        if data.images:
            for image in data.images:
                if allowed_file(image.filename, ["png", "jpg", "jpeg"]):
                    image_ids.append(gridfs.GridFS(post_db).put(image.read()))
                else:
                    return {
                        "msg": 'Only images with extension "png", "jpg", and "jpeg" are allowed.'
                    }, 400

        if data.videos:
            for video in data.videos:
                if allowed_file(video.filename, ["mp4", "mov"]):
                    video_ids.append(gridfs.GridFS(post_db).put(video.read()))
                else:
                    return {
                        "msg": 'Only videos with extension "mp4" and "mov" are allowed.'
                    }, 400

        if (
            Post(
                creator_id=current_user._id,
                text=data.text,
                is_private=data.is_private,
                image_ids=image_ids,
                video_ids=video_ids,
            )
            .save()
            .inserted_id
        ):
            return {"msg": "Success."}, 200

        return {"msg": "Unexpected error occurred."}, 500


class GetPost(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument(
        "post_id",
        type=str,
        help="Id of post.",
    )

    def get(self):
        data = GetPost.parser.parse_args()

        post_data = post_db.post.find_one({"_id": ObjectId(data.post_id)})
        if post_data:
            return json.loads(json_util.dumps(post_data)), 200
        else:
            return {"msg": "Post not found."}, 404


class UpdatePost(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument(
        "is_private",
        type=bool,
        help="Whether post is private.",
        required=True,
    )
    parser.add_argument(
        "post_id",
        type=str,
        help="ID of target post.",
        required=True,
    )

    @login_required
    def post(self):
        data = UpdatePost.parser.parse_args()

        if (
            post_db.post.update_one(
                {"_id": ObjectId(data.post_id)},
                {"$set": {"is_private": data.is_private}},
            ).modified_count
            == 1
        ):
            return {"msg": "Success."}, 200

        return {"msg": "Post not found"}, 404


class LikePost(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument(
        "post_id",
        type=str,
        help="ID of target post.",
        required=True,
    )

    @login_required
    def post(self):
        data = LikePost.parser.parse_args()

        post_id = ObjectId(data.post_id)
        post = post_db.post.find_one({"_id": post_id})
        if post:
            likes = post["likes"]

            if current_user._id not in likes:
                likes.append(current_user._id)
                if (
                    post_db.post.update_one(
                        {"_id": post_id}, {"$set": {"likes": likes}}
                    ).modified_count
                    == 1
                ):
                    return {"message": "Success."}, 200

                return {"msg": "Unexpected error occurred."}, 500

            return {"msg": "Operator has already liked post."}, 200

        return {"msg": "Post not found."}, 404


class UnlikePost(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument(
        "post_id",
        type=str,
        help="ID of target post.",
        required=True,
    )

    @login_required
    def post(self):
        data = UnlikePost.parser.parse_args()

        post_id = ObjectId(data.post_id)
        post = post_db.post.find_one({"_id": post_id})
        if post:
            likes = post["likes"]

            if current_user._id in likes:
                likes.remove(current_user._id)
                if (
                    post_db.post.update_one(
                        {"_id": post_id}, {"$set": {"likes": likes}}
                    ).modified_count
                    == 1
                ):
                    return {"message": "Success."}, 200

                return {"msg": "Unexpected error occurred."}, 500

            return {"msg": "Operator has not liked post."}, 200

        return {"msg": "Post not found."}, 404


class Repost(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument("post_id", type=str, required=True, help="ID of target post.")
    parser.add_argument(
        "is_private",
        type=bool,
        required=True,
        help="Whether repost is private.",
    )

    @login_required
    def post(self):
        data = Repost.parser.parse_args()
        repost_id = ObjectId(data.post_id)
        post = post_db.post.find_one({"_id": repost_id})

        if post:
            if (
                Post(
                    creator_id=current_user._id,
                    is_private=data.is_private,
                    repost_id=repost_id,
                )
                .save()
                .inserted_id
            ):
                return {"msg": "Success."}, 200

            return {"msg": "Unexpected error occurred."}, 500
        
        return {"msg": "Post not found."}, 404


class DeletePost(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument(
        "post_id",
        type=str,
        help="ID of target post.",
        required=True,
    )

    @login_required
    def delete(self):
        data = DeletePost.parser.parse_args()

        post_id = ObjectId(data.post_id)
        post = post_db.post.find_one({"_id": post_id})

        if post:
            for image_id in post["image_ids"]:
                post_db.fs.chunks.delete_many({"files_id": image_id})
                post_db.fs.files.delete_one({"_id": image_id})

            for video_id in post["video_ids"]:
                post_db.fs.chunks.delete_many({"files_id": video_id})
                post_db.fs.files.delete_one({"_id": video_id})

            for comment_id in post["comment_ids"]:
                post_db.comment.delete_one({"_id", comment_id})

            post_db.post.delete_many({"repost_id": post_id})

            if post_db.post.delete_one({"_id": post_id}).deleted_count == 1:
                return {"msg": "Success"}, 200

        return {"msg": "Post not found."}, 404


class CreateComment(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument(
        "post_id",
        type=str,
        help="ID of post.",
        required=True,
    )
    parser.add_argument(
        "text",
        type=str,
        help="Text of comment.",
    )

    @login_required
    def post(self):
        data = CreateComment.parser.parse_args()

        if (
            Comment(
                creator_id=current_user._id,
                post_id=ObjectId(data.post_id),
                text=data.text,
            )
            .save()
            .modified_count
            == 1
        ):
            return {"message": "Success."}, 200

        return {"msg": "Unexpected error occurred."}, 500


class LikeComment(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument(
        "comment_id",
        type=str,
        help="ID of target comment.",
        required=True,
    )

    @login_required
    def post(self):
        data = LikeComment.parser.parse_args()
        comment_id = ObjectId(data.comment_id)
        comment = post_db.comment.find_one({"_id": comment_id})

        if comment:
            likes = comment["likes"]

            if current_user._id not in likes:
                likes.append(current_user._id)
                if (
                    post_db.comment.update_one(
                        {"_id": comment_id}, {"$set": {"likes": likes}}
                    ).modified_count
                    == 1
                ):
                    return {"msg": "Success."}, 200

                return {"msg": "Unexpected error occurred."}, 500

            return {"msg": "Operator has already liked comment."}, 409

        return {"msg": "Comment not found."}, 404


class UnlikeComment(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument(
        "comment_id",
        type=str,
        help="ID of target comment.",
        required=True,
    )

    @login_required
    def post(self):
        data = UnlikeComment.parser.parse_args()
        comment_id = ObjectId(data.comment_id)
        comment = post_db.comment.find_one({"_id": comment_id})

        if comment:
            likes = comment["likes"]

            if current_user._id in likes:
                likes.remove(current_user._id)
                if (
                    post_db.comment.update_one(
                        {"_id": comment_id}, {"$set": {"likes": likes}}
                    ).modified_count
                    == 1
                ):
                    return {"msg": "Success."}, 200

                return {"msg": "Unexpected error occurred."}, 500

            return {"msg": "Operator has not liked comment."}, 409

        return {"msg": "Comment not found."}, 404


class DeleteComment(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument(
        "comment_id",
        type=str,
        help="ID of comment.",
        required=True,
    )

    @login_required
    def delete(self):
        data = DeleteComment.parser.parse_args()
        comment_id = ObjectId(data.comment_id)
        comment = post_db.comment.find_one({"_id": comment_id})

        if comment:
            if (
                post_db.post.update_one(
                    {"_id": comment["post_id"]}, {"$pull": {"comment_ids": comment_id}}
                ).modified_count
                == post_db.comment.delete_one({"_id": comment_id}).deleted_count
                == 1
            ):
                return {"msg": "Success."}, 200

            return {"msg": "Unexpected error occurred."}, 500

        return {"msg": "Comment not found"}, 404
