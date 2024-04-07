import gridfs
from db import chat_db

fs = gridfs.GridFS(chat_db)


class Chat:
    def __init__(self, user1_id, user2_id):
        self.user1_id = user1_id
        self.user2_id = user2_id
        self.messages = []

    def add_message(self, sender_id, text="", image_paths=[], video_paths=[]):
        sender_name = self.user1_name if sender_id == self.user1_id else self.user2_name
        message = {
            "sender_id": sender_id,
            "sender_name": sender_name,
            "text": text,
            "images": [],
            "videos": [],
        }

        for image_path in image_paths:
            with open(image_path, "rb") as file:
                image_data = file.read()
            message["images"].append(
                fs.put(
                    image_data,
                    filename=f"{sender_name}_image{len(message['images']) + 1}.jpg",
                )
            )

        for video_path in video_paths:
            with open(video_path, "rb") as file:
                video_data = file.read()
            message["videos"].append(
                fs.put(
                    video_data,
                    filename=f"{sender_name}_video{len(message['videos']) + 1}.mp4",
                )
            )

        self.messages.append(message)

    def save(self):
        return chat_db.chat.insert_one(
            {
                "user1_id": self.user1_id,
                "user2_id": self.user2_id,
                "messages": self.messages,
            }
        )
