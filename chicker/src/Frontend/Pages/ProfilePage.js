import React, { useEffect, useState, useRef } from "react";
import Sidebar from "../components/sidebar";
import UserCard from "../components/UserCard";
import profilePic from "../Pictures/cyan.png";
import { getMyUserID } from "./LoginPage";
import "./ProfilePage.css";

import { getStyling } from "../functions/style";

var posts = [],
  followersData = [],
  followingData = [];

export default function ProfilePage() {
  const styling = getStyling();
  const myUserID = getMyUserID();
  const [isOther, setIsOther] = useState(false);

  const postRef = useRef();
  const followerRef = useRef();
  const followingRef = useRef();
  const [activeSection, setActiveSection] = useState("post");
  const [myData, setMyData] = useState(null);

  const handleNavClick = (section) => {
    setActiveSection(section);
  };

  console.log(myUserID);
  useEffect(() => {
    fetch(`/api/user`, {
      method: "GET",
      params: {
        user_id: myUserID,
      },
    }).then((res) =>
      res.json().then((data) => {
        console.log(data);
      })
    );
  });

  useEffect(() => {
    if (activeSection === "post") {
      postRef.current.style.left = "16vw";
    } else {
      postRef.current.style.left = "100%";
    }
    if (activeSection === "follower") {
      followerRef.current.style.left = "16vw";
    } else {
      followerRef.current.style.left = "100%";
    }
    if (activeSection === "following") {
      followingRef.current.style.left = "16vw";
    } else {
      followingRef.current.style.left = "100%";
    }
  }, [activeSection]);

  return (
    <body style={{ ...styling }}>
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

            <div className="DetailContainer">
              <button
                className="NumberContainer"
                style={{ ...styling }}
                onClick={() => handleNavClick("post")}
              >
                <h3 className="Number">{posts.length}</h3>
                <small>Posts</small>
              </button>
              <button
                className="NumberContainer"
                style={{ ...styling }}
                onClick={() => handleNavClick("follower")}
              >
                <h3 className="Number">{followersData.length}</h3>
                <small>Followers</small>
              </button>
              <button
                className="NumberContainer"
                style={{ ...styling }}
                onClick={() => handleNavClick("following")}
              >
                <h3 className="Number">{followingData.length}</h3>
                <small>Following</small>
              </button>
            </div>
            <main className="Container" id="siteContainer">
              <section className="Posts Base" id="posts" ref={postRef}>
                {posts.length > 0 ? <></> : <h3>There is no Posts yet!</h3>}
              </section>

              <section
                className="Followers Base"
                id="followers"
                ref={followerRef}
              >
                {followersData.length > 0 ? (
                  <>
                    <h3>Users following you:</h3>
                    {followersData.map((data) => (
                      <UserCard
                        key={data.name}
                        Username={data.name}
                        UserIcon={data.image}
                        UserEmail={data.email}
                      />
                    ))}
                  </>
                ) : (
                  <h3>No One is following you QAQ</h3>
                )}
              </section>

              <section
                className="Following Base"
                id="following"
                ref={followingRef}
              >
                {followingData.length > 0 ? (
                  <>
                    <h3>Users you following:</h3>
                    {followingData.map((data) => (
                      <UserCard
                        key={data.name}
                        Username={data.name}
                        UserIcon={data.image}
                        UserEmail={data.email}
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
  );
}
