from flask_pymongo import pymongo

connection_string = None # Assign connection string before running!

client = pymongo.MongoClient(connection_string)

user_db = client.get_database("User_data")
chat_db = client.get_database("Chat_data")
post_db = client.get_database("Post_data")
