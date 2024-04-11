import json
from io import BytesIO
from random import choices

import gridfs
from bson import ObjectId, json_util
from db import post_db
from flask import send_file
from flask_login import current_user, login_required
from flask_restful import Resource, reqparse
from mongo.post import Comment, Post
from utils import allowed_file
from werkzeug.datastructures import FileStorage


class PostCreate(Resource):
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
        required=True,
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
        data = PostCreate.parser.parse_args()

        if not data.text and not data.images and not data.videos:
            return {"msg": "Input is null."}, 400

        image_ids = []
        video_ids = []

        if data.images:
            for image in data.images:
                if allowed_file(image.filename, {"png", "jpg", "jpeg"}):
                    extension = image.filename.rsplit(".", 1)[1].lower()
                    if extension == "png":
                        mimetype = "image/png"
                    else:
                        mimetype = "image/jpeg"

                    image_ids.append(
                        gridfs.GridFS(post_db).put(
                            image.read(),
                            filename=f"{ObjectId()}.{extension}",
                            metadata={"contentType": mimetype},
                        )
                    )
                else:
                    return {
                        "msg": 'Only images with extension "png", "jpg", and "jpeg" are allowed.'
                    }, 400

        if data.videos:
            for video in data.videos:
                if allowed_file(video.filename, {"mp4", "mov"}):
                    extension = video.filename.rsplit(".", 1)[1].lower()
                    if extension == "mp4":
                        mimetype = "video/mp4"
                    else:
                        mimetype = "video/quicktime"

                    video_ids.append(
                        gridfs.GridFS(post_db).put(
                            video.read(),
                            filename=f"{ObjectId()}.{extension}",
                            metadata={"contentType": mimetype},
                        )
                    )
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

        post = post_db.post.find_one({"_id": ObjectId(data.post_id)})
        if post:
            return json.loads(json_util.dumps(post)), 200
        else:
            return {"msg": "Post not found."}, 404


class GetPostFile(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument("file_id", type=str, required=True, help="ID of target file.")

    def get(self):
        data = GetPostFile.parser.parse_args()
        fs = gridfs.GridFS(post_db)

        try:
            f = fs.get(ObjectId(data.file_id))
        except gridfs.NoFile:
            return {"msg": "File not found."}, 404

        return send_file(
            BytesIO(f.read()),
            mimetype=f.metadata["contentType"],
            as_attachment=True,
            download_name=f.filename,
        )


class PostRecommend(Resource):
    def get(self):
        posts = list(post_db.post.find({}))
        if len(posts) > 5:
            recommended_posts = choices(posts, k=5)
        else:
            recommended_posts = posts

        return {
            "recommended_posts": [
                json.loads(json_util.dumps(p)) for p in recommended_posts
            ]
        }, 200


class PostUpdate(Resource):
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
        data = PostUpdate.parser.parse_args()

        if (
            post_db.post.update_one(
                {"_id": ObjectId(data.post_id)},
                {"$set": {"is_private": data.is_private}},
            ).modified_count
            == 1
        ):
            return {"msg": "Success."}, 200

        return {"msg": "Post not found"}, 404


class PostLike(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument(
        "post_id",
        type=str,
        help="ID of target post.",
        required=True,
    )

    @login_required
    def post(self):
        data = PostLike.parser.parse_args()

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


class PostUnlike(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument(
        "post_id",
        type=str,
        help="ID of target post.",
        required=True,
    )

    @login_required
    def post(self):
        data = PostUnlike.parser.parse_args()

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


class PostDelete(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument(
        "post_id",
        type=str,
        help="ID of target post.",
        required=True,
    )

    @login_required
    def delete(self):
        data = PostDelete.parser.parse_args()

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


class CommentCreate(Resource):
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
        data = CommentCreate.parser.parse_args()

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


class CommentLike(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument(
        "comment_id",
        type=str,
        help="ID of target comment.",
        required=True,
    )

    @login_required
    def post(self):
        data = CommentLike.parser.parse_args()
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


class CommentUnlike(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument(
        "comment_id",
        type=str,
        help="ID of target comment.",
        required=True,
    )

    @login_required
    def post(self):
        data = CommentUnlike.parser.parse_args()
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


class CommentDelete(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument(
        "comment_id",
        type=str,
        help="ID of comment.",
        required=True,
    )

    @login_required
    def delete(self):
        data = CommentDelete.parser.parse_args()
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
