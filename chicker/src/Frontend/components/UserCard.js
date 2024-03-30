import React from "react";
import "./UserCard.css";

const UserCard = ({ Username, UserIcon, UserEmail, UserStatus }) => {
  return (
    <div className="UserCard">
      <div className="UserContent">
        <img src={UserIcon} alt="" />
        <div className="UserInfo">
          <h4>{Username}</h4>
          <p>{UserEmail}</p>
        </div>
        <div className="Buttons">
          {UserStatus ? (
            <button className="UnfollowButton">Unfollow</button>
          ) : (
            <button className="FollowButton">Follow</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCard;
