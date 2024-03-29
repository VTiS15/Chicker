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
            <a id="Posts"></a>
            <a id="Followers"></a>
            <a id="Following"></a>
            <div className="DetailContainer">
              <a className="NumberContainer" href="#Posts">
                <h3 className="Number">0</h3>
                <small>Posts</small>
              </a>
              <a className="NumberContainer" href="#Followers">
                <h3 className="Number">3</h3>
                <small>Followers</small>
              </a>
              <a className="NumberContainer" href="#Following">
                <h3 className="Number">4</h3>
                <small>Following</small>
              </a>
            </div>
            <main className="Container" id="siteContainer">
              <section className="Posts Base" id="posts">
                There is no Posts yet
              </section>
              <section className="Followers Base" id="followers">
                3 followers
              </section>
              <section className="Following Base" id="following">
                4 users following
              </section>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
