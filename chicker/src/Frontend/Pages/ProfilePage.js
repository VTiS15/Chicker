/*
This is the profile page, where users can view their own information like username, bios, user icon
They can view their posts they posted, followers, and user following them
Funcitons:
- Show username, user icon and bios
- display user followers, followees and posts
*/
import React, { useEffect, useState, useRef } from "react";
import Sidebar from "../components/sidebar";
import UserCard from "../components/UserCard";
import profilePic from "../Pictures/cyan.png";
import "./ProfilePage.css";

import { getStyling } from "../functions/style";
import { getMyID } from "./LoginPage";
import { userData } from "../functions/dummydata";

var posts = [];
var followees = [];
var followers = [];

export default function ProfilePage() {
  const myID = getMyID();
  // getting the user followers and followees from user
  const user = userData.find((user) => user._id === myID);
  if (user) {
    followees = userData.filter((users) => user.followee.includes(users._id));
    followers = userData.filter((users) => user.follower.includes(users._id));
    console.log(followees, followers);
  }
  // getting the global styling
  const styling = getStyling();

  const [isOther, setIsOther] = useState(false);
  // allow user to choose different sections will sliding animation
  const postRef = useRef();
  const followerRef = useRef();
  const followingRef = useRef();
  const [activeSection, setActiveSection] = useState("post");

  const handleNavClick = (section) => {
    setActiveSection(section);
  };

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
                <img src={user && user.icon_id} alt="user" />
              </div>
              <div>
                <h3 className="Name">{user && user.username}</h3>
                <p>{user && user.bio}</p>
              </div>
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
                <h3 className="Number">{followers.length}</h3>
                <small>Followers</small>
              </button>
              <button
                className="NumberContainer"
                style={{ ...styling }}
                onClick={() => handleNavClick("following")}
              >
                <h3 className="Number">{followees.length}</h3>
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
                {followers.length > 0 ? (
                  <>
                    <h3>Users following you:</h3>
                    {followers.map((data) => (
                      <UserCard
                        key={data._id}
                        UserID={data.user_id}
                        Username={data.username}
                        UserIcon={data.icon_id}
                        UserEmail={data.email}
                        UserStatus={
                          user && user.follower.includes(data.user_id)
                        }
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
                {followees.length > 0 ? (
                  <>
                    <h3>Users you following:</h3>
                    {followees.map((data) => (
                      <UserCard
                        key={data._id}
                        Username={data.username}
                        UserIcon={data.icon_id}
                        UserEmail={data.email}
                        UserStatus={true}
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
