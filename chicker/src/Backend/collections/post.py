import random
import string

import gridfs
from db import post_db

fs = gridfs.GridFS(post_db)


class Post:
    def __init__(
        self,
        creator_id,
        content,
        visibility,
        image_paths=[],
        video_paths=[],
    ):
        self.post_id = (
            f"p{''.join(random.choices(string.ascii_letters + string.digits, k=12))}"
        )
        self.creator_id = creator_id
        self.content = content
        self.likes = []
        self.visibility = visibility
        self.image_paths = image_paths
        self.video_paths = video_paths

    def save(self):
        post_data = {
            "post_id": self.post_id,
            "creator_id": self.creator_id,
            "content": self.content,
            "visibility": self.visibility,
            "likes": self.likes,
            "images": [],
            "videos": []
        }
        for image_path in self.image_paths:
            with open(image_path, "rb") as file:
                image_data = file.read()
            image_id = fs.put(image_data, filename=f"{self.post_id}_image{len(post_data["images"] + 1)}.jpg")
            post_data["images"].append(image_id)

        for video_path in self.video_paths:
            with open(video_path, "rb") as file:
                video_data = file.read()
            video_id = fs.put(video_data, filename=f"{self.post_id}_video{len(post_data["videos"] + 1)}.mp4")
            post_data["videos"].append(video_id)

        return post_db.post.insert_one(post_data)


class Comment:
    def __init__(
        self,
        post_id,
        content,
        image_paths=[],
        video_paths=[],
    ):
        self.comment_id = (
            f"c{''.join(random.choices(string.ascii_letters + string.digits, k=12))}"
        )
        self.post_id = post_id
        self.content = content
        self.likes = []
        self.image_paths = image_paths
        self.video_paths = video_paths

    def save(self):
        comment_data = post_db.comment.insert_one({
            "comment_id": self.comment_id,
            "post_id": self.postid,
            "content": self.content,
            "likes": self.likes,
            "images": [],
            "videos": []
        })
    
        for image_path in self.image_paths:
            with open(image_path, "rb") as file:
                image_data = file.read()
            comment_data["images"].append(
                fs.put(
                    image_data,
                    filename=f"{self.comment_id}_image{len(comment_data["images"] + 1)}.jpg"
                )
            )

        for video_path in self.video_paths:
            with open(video_path, "rb") as file:
                video_data = file.read()
            comment_data["videos"].append(
                fs.put(
                    video_data,
                    filename=f"{self.comment_id}_video{len(comment_data["videos"] + 1)}.mp4"
                )
            )

        return post_db.post.insert_one(comment_data)
