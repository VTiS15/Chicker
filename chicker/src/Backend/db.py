from flask_pymongo import pymongo

client = pymongo.MongoClient(
    "mongodb+srv://csci3100:chicker@cluster0.7tf1swn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
)

user_db = client.get_database("User_data")
chat_db = client.get_database("Chat_data")
post_db = client.get_database("Post_data")
