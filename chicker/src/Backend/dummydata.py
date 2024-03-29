import json


def userdata():
    data = {
        "users": [
            {
                "userImage": "../Pictures/cyan.png",
                "username": "User 1",
            },
            {
                "userImage": "../Pictures/cyan.png",
                "username": "User 2",
            },
            {
                "userImage": "../Pictures/cyan.png",
                "username": "User 3",
            },
        ],
    }
    return json.dumps(data)
