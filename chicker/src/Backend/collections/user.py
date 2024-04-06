import random
import string
from datetime import datetime

from db import user_db


class User:
    def __init__(
        self,
        username,
        email,
        password_hash,
        user_id=f"u{''.join(random.choices(string.ascii_letters + string.digits, k=12))}",
        followers=[],
        followees=[],
        bio="",
        is_admin=False,
        date=datetime.now(),
    ):
        self.username = username
        self.user_id = user_id
        self.password_hash = password_hash
        self.email = email
        self.followers = followers
        self.followees = followees
        self.bio = bio
        self.is_admin = is_admin
        self.date = date

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
        return self.user_id

    def save(self):
        return user_db.user.insert_one(
            {
                "username": self.username,
                "user_id": self.user_id,
                "password_hash": self.password_hash,
                "email": self.email,
                "followers": self.followers,
                "followees": self.followees,
                "bio": self.bio,
                "is_admin": self.is_admin,
                "date": self.date,
            }
        )
