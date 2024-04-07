from flask_restful import Resource, reqparse
from flask_login import current_user, login_required
from werkzeug.datastructures import FileStorage
from db import chat_db
from mongo.chat import Chat


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
