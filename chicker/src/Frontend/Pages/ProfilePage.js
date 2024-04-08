import React, { useEffect, useState, useRef } from "react";
import Sidebar from "../components/sidebar";
import UserCard from "../components/UserCard";
import profilePic from "../Pictures/cyan.png";
import defaultAvatar from "../Pictures/DeafaultUserIcon.png";
import "./ProfilePage.css";

import { getStyling } from "../functions/style";

export default function ProfilePage() {
  const styling = getStyling();
  const [isOther, setIsOther] = useState(false);

  const followersData = [
    {
      name: "John",
      image: "https://imgur.com/zhRjMzY",
      age: 20,
      email: "john@example.com",
    },
    {
      name: "Yuden",
      image: "https://imgur.com/zhRjMzY",
      age: 24,
      email: "yuden@example.com",
    },
    {
      name: "VT",
      image: "https://imgur.com/zhRjMzY",
      age: 21,
      email: "vt@example.com",
    },
    {
      name: "Jack",
      image: "https://imgur.com/zhRjMzY",
      age: 21,
      email: "jack@example.com",
    },
    {
      name: "JC",
      image: "https://imgur.com/zhRjMzY",
      age: 21,
      email: "jc@example.com",
    },
    {
      name: "John",
      image: "https://imgur.com/zhRjMzY",
      age: 20,
      email: "john@example.com",
    },
    {
      name: "Yuden",
      image: "https://imgur.com/zhRjMzY",
      age: 24,
      email: "yuden@example.com",
    },
    {
      name: "VT",
      image: "https://imgur.com/zhRjMzY",
      age: 21,
      email: "vt@example.com",
    },
    {
      name: "Jack",
      image: "https://imgur.com/zhRjMzY",
      age: 21,
      email: "jack@example.com",
    },
    {
      name: "JC",
      image: "https://imgur.com/zhRjMzY",
      age: 21,
      email: "jc@example.com",
    },
  ];

  const followingData = [
    {
      name: "John",
      image: { defaultAvatar },
      age: 20,
      email: "john@example.com",
    },
  ];

  const posts = [];

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
