import React, { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
import UserCard from "../components/UserCard";
import profilePic from "../Pictures/cyan.png";
import { userData } from "../functions/dummydata";
import "./ProfilePage.css";

import { getStyling } from "../functions/style";

export default function ProfilePage() {
  const styling = getStyling();
  const [isOther, setIsOther] = useState(false);

  const posts = [];

  const followersData = userData.filter((user) => user.isfollowing);
  const followingData = userData.filter((user) => user.isfollowingMe);

  return (
    <>
      <body style={{ ...styling }}>
        <Sidebar />
        <div className="ProfilePage">
          <div className="ProfileContainer">
            <div
              className="ProfileCard"
              style={{
                backgroundImage:
                  "https://cdn1.epicgames.com/salesEvent/salesEvent/amoguslandscape_2560x1440-3fac17e8bb45d81ec9b2c24655758075",
              }}
            >
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
                <a
                  className="NumberContainer"
                  href="#Posts"
                  style={{ ...styling }}
                >
                  <h3 className="Number">{posts.length}</h3>
                  <small>Posts</small>
                </a>
                <a
                  className="NumberContainer"
                  href="#Followers"
                  style={{ ...styling }}
                >
                  <h3 className="Number">{followersData.length}</h3>
                  <small>Followers</small>
                </a>
                <a
                  className="NumberContainer"
                  href="#Following"
                  style={{ ...styling }}
                >
                  <h3 className="Number">{followingData.length}</h3>
                  <small>Following</small>
                </a>
              </div>
              <main className="Container" id="siteContainer">
                <section className="Posts Base" id="posts">
                  {posts.length > 0 ? <></> : <h3>There is no Posts yet!</h3>}
                </section>

                <section className="Followers Base" id="followers">
                  {followersData.length > 0 ? (
                    <>
                      <h3>Users following you:</h3>
                      {followersData.map((data) => (
                        <UserCard
                          Username={data.name}
                          UserIcon={data.image}
                          UserEmail={data.email}
                          UserStatus={data.isfollowing}
                        />
                      ))}
                    </>
                  ) : (
                    <h3>No One is following you QAQ</h3>
                  )}
                </section>

                <section className="Following Base" id="following">
                  {followingData.length > 0 ? (
                    <>
                      <h3>Users you following:</h3>
                      {followingData.map((data) => (
                        <UserCard
                          Username={data.name}
                          UserIcon={data.image}
                          UserEmail={data.email}
                          UserStatus={data.isfollowing}
                        />
                      ))}
                    </>
                  ) : (
                    <h3>Go Follow someone!</h3>
                  )}
                </section>
              </main>
            </div>
          </div>
        </div>
      </body>
    </>
  );
}
