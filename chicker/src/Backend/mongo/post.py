from datetime import datetime

import gridfs
from db import post_db

fs = gridfs.GridFS(post_db)


class Post:
    def __init__(
        self,
        creator_id,
        text="",
        repost_id=None,
        is_private=False,
        image_ids=[],
        video_ids=[],
        comment_ids=[],
        date=datetime.now(),
    ):
        self.creator_id = creator_id
        self.text = text
        self.likes = []
        self.repost_id = repost_id
        self.is_private = is_private
        self.image_ids = image_ids
        self.video_ids = video_ids
        self.comment_ids = comment_ids
        self.date = date

    def save(self):
        return post_db.post.insert_one(
            {
                "creator_id": self.creator_id,
                "text": self.text,
                "repost_id": self.repost_id,
                "is_private": self.is_private,
                "likes": self.likes,
                "image_ids": self.image_ids,
                "video_ids": self.video_ids,
                "comment_ids": self.comment_ids,
                "date": self.date,
            }
        )


class Comment:
    def __init__(
        self,
        post_id,
        creator_id,
        text,
    ):
        self.post_id = post_id
        self.creator_id = creator_id
        self.text = text
        self.likes = []

    def save(self):
        return post_db.post.update_one(
            {"_id": self.post_id},
            {
                "$push": {
                    "comment_ids": post_db.comment.insert_one(
                        {
                            "post_id": self.post_id,
                            "creator_id": self.creator_id,
                            "text": self.text,
                            "likes": self.likes,
                        }
                    ).inserted_id
                }
            },
        )
