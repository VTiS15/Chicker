import json
import gridfs
from bson import ObjectId, json_util
from flask import Flask
from flask_restful import Resource, reqparse
from mongo.post import Post, Comment
from flask_login import current_user, login_required, login_user, logout_user
from db import post_db
from resources.user import User
from werkzeug.datastructures import FileStorage
app = Flask(__name__)

def allowed_file(filename, extensions):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in extensions

class CreatePost(Resource):
#    
    parser = reqparse.RequestParser()
    parser.add_argument(
        "text",
        type=str,
        help="Text of post.",
        location="form",
    )
    parser.add_argument(
        "visibility",
        type=bool,
        help="Visibility of post.",
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
        creator_id = current_user._id
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
                        "msg": 'Only images with extension "mp4" and "mov" are allowed.'
                    }, 400
        post = Post(
            creator_id=creator_id,
            text=data.text,
            visibility=data.visibility,
            image_ids = image_ids,
            video_ids = video_ids
        )
        post.save()
        return {'message': 'Post created successfully'}, 200
    
class GetPost(Resource):
  #   @app.route('/posts/get', methods=['GET'])
    parser = reqparse.RequestParser()
    parser.add_argument(
        "post_id",
        type=str,
        help="Id of post.",
    )
    def get(self):
        data = GetPost.parser.parse_args()
        post_id = ObjectId(data.post_id)
        post_data = post_db.post.find_one({'_id': post_id})
        if post_data:
            return json.loads(json_util.dumps(post_data)), 200
        else:
            return {'error': 'Post not found'}, 404

class UpdatePost(Resource):
   #  @app.route('/posts/updata', methods=['PUT'])
    parser = reqparse.RequestParser()
    parser.add_argument(
        "visibility",
        type=bool,
        help="Visibility of post.",
        required=True,
    )
    parser.add_argument(
        "post_id",
        type=str,
        help="Id of post.",
        required=True,
    )
    @login_required
    def put(self):
        data = UpdatePost.parser.parse_args()
        post_id = ObjectId(data.post_id)
        visibility = data.visibility
        if post_db.post.update_one({'_id': post_id}, {'$set':{"visibility":visibility}}).modified_count==1:           
            return {'message': 'Post updated successfully'}, 200
        else:
            return {'error': 'Post not found'}, 404

class CreateComment(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument(
        "post_id",
        type=str,
        help="Id of post.",
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
        creator_id = current_user._id
        post_id = ObjectId(data.post_id)
        comment = Comment(
            creator_id=creator_id,
            post_id = post_id,
            text=data.text,
        )
        comment.save()
        return {'message': 'Comment created successfully'}, 200
class DeleteComment(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument(
        "comment_id",
        type=str,
        help="Id of comment.",
        required=True,
    )
    @login_required
    def delete(self):
        data = DeleteComment.parser.parse_args()
        comment_id = ObjectId(data.comment_id)
        if post_db.comment.delete_one({'_id': comment_id}).deleted_count == 1:        
            return {'message': 'Comment deleted successfully'}, 200
        else:
            return {'error': 'Comment not found'}, 404

class LikeComment(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument(
        "comment_id",
        type=str,
        help="Id of comment.",
        required=True,
    )
    @login_required
    def post(self):
        data = LikeComment.parser.parse_args()
        creator_id = current_user._id
        comment_id = ObjectId(data.comment_id)
        comment = post_db.comment.find_one({"_id": comment_id})
        if comment:
            comment_likes = comment.get("likes", [])
            if creator_id not in comment_likes:
                comment_likes.append(creator_id)
                post_db.comment.update_one(
                    {"_id": comment_id},
                    {"$set": {"likes": comment_likes}}
                )
                return {"message": "Comment liked successfully"}, 200
            else:
                return {"message": "Comment already liked"}, 200
        else:
            return {"error": "Comment not found"}, 404

class LikePost(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument(
        "post_id",
        type=str,
        help="Id of post.",
        required=True,
    )
    @login_required
    def post(self):
        data = LikePost.parser.parse_args()
        creator_id = current_user._id
        post_id = ObjectId(data.post_id)
        post = post_db.post.find_one({"_id": post_id})
        if post:
            post_likes = post.get("likes", [])
            if creator_id not in post_likes:
                post_likes.append(creator_id)
                post_db.post.update_one(
                    {"_id": post_id},
                    {"$set": {"likes": post_likes}}
                )
                return {"message": "Post liked successfully"}, 200
            else:
                return {"message": "Post already liked"}, 200
        else:
            return {"error": "Post not found"}, 404

class DeletePost(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument(
        "post_id",
        type=str,
        help="Id of post.",
        required=True,
    )
    @login_required
    def delete(self):
        data = DeletePost.parser.parse_args()
        post_id = ObjectId(data.post_id)
        post = post_db.post.find_one({"_id": post_id})
        for image_id in post["image_ids"]:
            post_db.fs.chunks.delete_many({'files_id': image_id})
            post_db.fs.files.delete_one({'_id': image_id})
        for video_id in post["video_ids"]:
            post_db.fs.chunks.delete_many({'files_id': video_id})
            post_db.fs.files.delete_one({'_id': video_id})
        if post_db.post.delete_one({'_id': post_id}).deleted_count == 1:        
            return {'message': 'Post deleted successfully'}, 200
        else:
            return {'error': 'Post not found'}, 404
