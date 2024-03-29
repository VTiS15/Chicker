import React, { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
import "./ProfilePage.css";
import profilePic from "../Pictures/cyan.png";

export default function ProfilePage() {
  const [isOther, setIsOther] = useState(false);

  return (
    <>
      <Sidebar />
      <div className="ProfilePage">
        <div className="ProfileContainer">
          <div className="ProfileCard">
            <div className="SelfInfo">
              <div className="ProfileImange">
                <img src={profilePic} alt="user" />
              </div>
              <h3 className="Name">Not Imposter</h3>
              <p>I am not sus!!! I saw Green comes out from the vent!!!!</p>
              {isOther ? <a className="FollowButton">Follow</a> : <></>}
            </div>
            <div class="DetailContainer">
              <div className="NumberContainer">
                <h3 className="Number">10</h3>
                <small>Posts</small>
              </div>
              <div class="NumberContainer">
                <h3 className="Number">43</h3>
                <small>Followers</small>
              </div>
              <div className="NumberContainer">
                <h3 className="Number">54</h3>
                <small>Following</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
