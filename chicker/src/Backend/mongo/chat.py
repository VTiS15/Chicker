from io import BytesIO

import gridfs
from db import chat_db
from PIL import Image

fs = gridfs.GridFS(chat_db)


class Chat:
    def __init__(self, user1_id, user2_id):
        self.user1_id = user1_id
        self.user2_id = user2_id
        self.messages = []

    def save(self):
        return chat_db.chat.insert_one(
            {
                "user1_id": self.user1_id,
                "user2_id": self.user2_id,
                "messages": self.messages,
            }
        )
