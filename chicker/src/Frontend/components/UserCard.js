import React from "react";
import "./UserCard.css";
import { userData } from "../functions/dummydata";

const allUser = userData;

const UserCard = ({ Username, UserIcon, UserEmail, UserStatus }) => {
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
