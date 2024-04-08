import os

from flask_pymongo import pymongo

connection_string = os.getenv("MONGO_CONNECTION_STRING")

client = pymongo.MongoClient(connection_string)

user_db = client.get_database("User_data")
chat_db = client.get_database("Chat_data")
post_db = client.get_database("Post_data")
