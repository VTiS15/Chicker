from flask_restful import Resource, reqparse
from flask_login import current_user, login_required
from werkzeug.datastructures import FileStorage
from db import chat_db
from mongo.chat import Chat
import gridfs


def allowed_file(filename, extensions):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in extensions


class ChatCreate(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument(
        "user1_id", type=str, required=True, help="ID of user1 of chat."
    )
    parser.add_argument(
        "user2_id", type=str, required=True, help="ID of user2 of chat."
    )

    def post(self):
        data = ChatCreate.parser.parse_args()

        if chat_db.chat.find_one(
            {
                "$and": [
                    {"$or": [{"user1_id": data.user1_id}, {"user2_id": data.user1_id}]},
                    {"$or": [{"user1_id": data.user2_id}, {"user2_id": data.user2_id}]},
                ]
            }
        ):
            return {"msg": "Chat already exists."}, 409

        if Chat(data.user1_id, data.user2_id).save().inserted_id:
            return {"msg": "Success."}, 200

        return {"msg": "Unexpected error occured."}, 500


class MessageSend(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument(
        "receiver_id",
        type=str,
        required=True,
        help="Receiver of message.",
        location="form",
    )
    parser.add_argument("text", type=str, help="Text of message.", location="form")
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
        data = MessageSend.parser.parse_args()
        chat = chat_db.chat.find_one({"$or": [{"$and": [{"user1_id": current_user.user_id}, {"user2_id": data.receiver_id}]}, {"$and": [{"user1_id": data.receiver_id}, {"user2_id": current_user.user_id}]}]})

        if chat:
            if not data.text and not data.images and not data.videos:
                return {"msg": "Input is null."}, 400

            message = {
                "sender_id": current_user.user_id,
                "text": data.text,
                "image_ids": [],
                "video_ids": []
            }

            if data.images:
                for image in data.images:
                    if allowed_file(image.filename, ["png", "jpg", "jpeg"]):
                        message["image_ids"].append(
                            gridfs.GridFS(chat_db).put(image.read())
                        )
                    else:
                        return {"msg": "Only images with extension \"png\", \"jpg\", and \"jpeg\" are allowed."}, 400
            
            if data.videos:
                for video in data.videos:
                    if allowed_file(video.filename, ["mp4", "mov"]):
                        message["video_ids"].append(
                            gridfs.GridFS(chat_db).put(video.read())
                        )
                    else:
                        return {"msg": "Only images with extension \"mp4\" and \"mov\" are allowed."}, 400
            
            if chat_db.chat.update_one(
                {"_id": chat["_id"]},
                {"$push": {"messages": message}}
            ).modified_count == 1:
                return {"msg": "Success."}, 200
            
            return {"msg": "Unexpected error occurred."}, 500

        return {"msg": "Chat not found."}, 404
