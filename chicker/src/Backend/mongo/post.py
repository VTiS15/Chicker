import random
import string

import gridfs
from db import post_db

fs = gridfs.GridFS(post_db)


class Post:
    def __init__(
        self,
        creator_id,
        text,
        visibility,
        image_ids=[],
        video_ids=[],
    ):
        self.creator_id = creator_id
        self.text = text
        self.likes = []
        self.visibility = visibility
        self.image_ids = image_ids
        self.video_ids = video_ids

    def save(self):
        post_data = {
            "creator_id": self.creator_id,
            "text": self.text,
            "visibility": self.visibility,
            "likes": self.likes,
            "image_ids": self.image_ids,
            "video_ids": self.video_ids
        }
        return post_db.post.insert_one(post_data)


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
        comment_data = post_db.comment.insert_one({
            "post_id": self.post_id,
            "creator_id": self.creator_id,
            "text": self.text,
            "likes": self.likes,
        })
        return comment_data
