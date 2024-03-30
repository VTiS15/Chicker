import React from "react";
import "./UserCard.css";

const UserCard = ({ Username, UserIcon, UserEmail }) => {
  return (
    <div className="UserCard">
      <div className="UserContent">
        <img src={UserIcon} alt="" />
        <div className="UserInfo">
          <h4>{Username}</h4>
          <p>{UserEmail}</p>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
