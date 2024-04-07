from db import connection_string
from flask import Flask
from flask_restful import Api
from login import login_manager
from resources.chat import *
from resources.user import *
from resources.post import *

app = Flask(__name__)
app.config["MONGO_URI"] = connection_string
app.secret_key = "fuck3100"  # Assign random string before running!

login_manager.init_app(app)
api = Api(app)

api.add_resource(GetUser, "/user")
api.add_resource(GetUsers, "/users")
api.add_resource(UserLogin, "/login")
api.add_resource(UserLogout, "/logout")
api.add_resource(UserRegister, "/register")
api.add_resource(UserDelete, "/user/delete")
api.add_resource(UserStatusChange, "/status")
api.add_resource(UserFollow, "/follow")
api.add_resource(UserUnfollow, "/unfollow")
api.add_resource(UserRecommend, "/user/recommend")
api.add_resource(UserUpdate, "/user/update")
api.add_resource(SearchUsers, "/user/search")
api.add_resource(SettingsUpdate, "/settings/update")
api.add_resource(CreatePost, "/post/create")
api.add_resource(GetPost, "/post")
api.add_resource(UpdatePost, "/post/update")
api.add_resource(CreateComment, "/comment/create")
api.add_resource(DeleteComment, "/comment/delete")
api.add_resource(LikeComment, "/comment/like")
api.add_resource(LikePost, "/post/like")
api.add_resource(DeletePost, "/post/delete")
api.add_resource(ChatCreate, "/chat/create")
api.add_resource(MessageSend, "/send")
api.add_resource(GetHistory, "/history")

if __name__ == "__main__":
    app.run(debug=True)
