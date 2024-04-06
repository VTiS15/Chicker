from flask import Flask
from flask_restful import Api
from login import login_manager
from resources.user import *

app = Flask(__name__)
app.config[
    "MONGO_URI"
] = "mongodb+srv://csci3100:chicker@cluster0.7tf1swn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
app.secret_key = "diu"  # Assign a random string to this before running!

login_manager.init_app(app)
api = Api(app)

api.add_resource(UserLogin, "/login")
api.add_resource(UserLogout, "/logout")
api.add_resource(UserRegister, "/register")
api.add_resource(UserDelete, "/user/delete")
api.add_resource(UserStatusChange, "/status")
api.add_resource(UserFollow, "/follow")
api.add_resource(UserUnfollow, "/unfollow")
api.add_resource(UserRecommend, "/user/recommend")
api.add_resource(UserUpdate, "/user/update")

if __name__ == "__main__":
    app.run(debug=True)
