from datetime import datetime, timedelta

from db import chat_db, post_db, user_db
from collections.user import User
from flask_restful import Resource, reqparse
from login import login_manager
from pymongo import DESCENDING