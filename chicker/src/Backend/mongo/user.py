from datetime import datetime

from bson import ObjectId
from db import user_db


class User:
    def __init__(
        self,
        username,
        email,
        password_hash,
        _id=None,
        icon_id=None,
        followers=[],
        followees=[],
        bio="",
        is_admin=False,
        date=datetime.now(),
        settings={"color": "White", "size": 16, "style": "courier new"},
    ):
        if _id:
            self._id = ObjectId(_id["$oid"])
        else:
            self._id = None
        self.username = username
        self.password_hash = password_hash
        self.email = email
        self.icon_id = icon_id
        self.followers = [ObjectId(id["$oid"]) for id in followers]
        self.followees = [ObjectId(id["$oid"]) for id in followees]
        self.bio = bio
        self.is_admin = is_admin
        self.date = date
        self.settings = settings

    @staticmethod
    def is_authenticated():
        return True

    @staticmethod
    def is_active():
        return True

    @staticmethod
    def is_anonymous():
        return False

    def get_id(self):
        return str(self._id)

    def save(self):
        result = user_db.user.insert_one(
            {
                "username": self.username,
                "password_hash": self.password_hash,
                "email": self.email,
                "icon_id": self.icon_id,
                "followers": self.followers,
                "followees": self.followees,
                "bio": self.bio,
                "is_admin": self.is_admin,
                "date": self.date,
                "settings": self.settings,
            }
        )
        self._id = result.inserted_id

        return result
