from db import connection_string
from flask import Flask
from flask_restful import Api
from login import login_manager
from resources.chat import *
from resources.user import *

app = Flask(__name__)
app.config["MONGO_URI"] = connection_string
app.secret_key = None  # Assign random string before running!

login_manager.init_app(app)
api = Api(app)

api.add_resource(GetUser, "/user")
api.add_resource(UserLogin, "/login")
api.add_resource(UserLogout, "/logout")
api.add_resource(UserRegister, "/register")
api.add_resource(UserDelete, "/user/delete")
api.add_resource(UserStatusChange, "/status")
api.add_resource(UserFollow, "/follow")
api.add_resource(UserUnfollow, "/unfollow")
api.add_resource(UserRecommend, "/user/recommend")
api.add_resource(UserUpdate, "/user/update")

api.add_resource(ChatCreate, "/chat/create")
api.add_resource(MessageSend, "/send")
api.add_resource(GetHistory, "/history")

if __name__ == "__main__":
    app.run(debug=True)
