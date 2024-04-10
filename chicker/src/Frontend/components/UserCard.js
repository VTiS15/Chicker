import React, { useState } from "react";
import "./UserCard.css";
import { getMyID } from "../Pages/LoginPage";
import { userData } from "../functions/dummydata";

const UserCard = ({ UserID, Username, UserIcon, UserEmail, UserStatus }) => {
  const myID = getMyID();
  var user = userData.find((user) => user._id === myID);
  const [isFollowing, setIsFollowing] = useState(UserStatus);
  const handleFollow = (target, name) => {
    if (isFollowing) {
      // Unfollow logic
      setIsFollowing(false);
      const index = user.followee.indexOf(target);
      if (index !== -1) {
        user.followee.splice(index, 1);
      }
    } else {
      // Follow logic
      setIsFollowing(true);
      user.followee.push(target);
      alert(`You have followed ${name}!`);
    }
  };

  return (
    <div className="UserCard">
      <div className="UserContent">
        <div className="UserPreview">
          <img src={UserIcon} alt="" />
          <div className="UserInfo">
            <h4>{Username}</h4>
            <p>{UserEmail}</p>
          </div>
        </div>
        <div className="Buttons">
          {isFollowing ? (
            <button
              className="UnfollowButton"
              onClick={() => handleFollow(UserID, Username)}
            >
              Unfollow
            </button>
          ) : (
            <button
              className="FollowButton"
              onClick={() => handleFollow(UserID, Username)}
            >
              Follow
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCard;
