import json


def userdata():
    data = {"User": {"name": "Sus", "Followers": 2, "Following": 3}}
    return json.dump(data)
