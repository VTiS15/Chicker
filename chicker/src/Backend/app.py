import os

from db import connection_string
from dotenv import load_dotenv
from flask import Flask
from flask_restful import Api
from login import login_manager
from resources.chat import *
from resources.post import *
from resources.user import *

load_dotenv(".env")

app = Flask(__name__)
app.config["MONGO_URI"] = connection_string
app.secret_key = os.getenv("APP_SECRET_KEY")

login_manager.init_app(app)
api = Api(app)

api.add_resource(GetUser, "/api/user")
api.add_resource(GetUsers, "/api/users")
api.add_resource(GetIcon, "/api/icon")
api.add_resource(UserLogin, "/api/login")
api.add_resource(UserLogout, "/api/logout")
api.add_resource(UserRegister, "/api/register")
api.add_resource(UserDelete, "/api/user/delete")
api.add_resource(UserStatusChange, "/api/status")
api.add_resource(UserFollow, "/api/follow")
api.add_resource(UserUnfollow, "/api/unfollow")
api.add_resource(UserRecommend, "/api/user/recommend")
api.add_resource(UserUpdate, "/api/user/update")
api.add_resource(SearchUsers, "/api/user/search")
api.add_resource(SettingsUpdate, "/api/settings/update")

api.add_resource(PostCreate, "/api/post/create")
api.add_resource(GetPost, "/api/post")
api.add_resource(PostRecommend, "/api/post/recommend")
api.add_resource(PostUpdate, "/api/post/update")
api.add_resource(PostLike, "/api/post/like")
api.add_resource(PostUnlike, "/api/post/unlike")
api.add_resource(Repost, "/api/repost")
api.add_resource(PostDelete, "/api/post/delete")
api.add_resource(CommentCreate, "/api/comment/create")
api.add_resource(CommentLike, "/api/comment/like")
api.add_resource(CommentUnlike, "/api/comment/unlike")
api.add_resource(CommentDelete, "/api/comment/delete")

api.add_resource(ChatCreate, "/api/chat/create")
api.add_resource(MessageSend, "/api/send")
api.add_resource(GetHistory, "/api/history")

if __name__ == "__main__":
    app.run(debug=True)
