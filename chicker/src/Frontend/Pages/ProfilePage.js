import React, { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
import profilePic from "../Pictures/cyan.png";
import "./ProfilePage.css";

export default function ProfilePage() {
  const [isOther, setIsOther] = useState(false);

  const followersData = [
    { name: "John", age: 20, email: "john@example.com" },
    { name: "Yuden", age: 24, email: "yuden@example.com" },
    { name: "VT", age: 21, email: "vt@example.com" },
    { name: "Jack", age: 21, email: "jack@example.com" },
    { name: "JC", age: 21, email: "jc@example.com" },
  ];

  const followingData = [{ name: "John", age: 20, email: "john@example.com" }];

  const posts = [];

  const UserCard = ({ Username }) => {
    return (
      <>
        <div className="UserCard">
          <p>{Username}</p>
        </div>
      </>
    );
  };

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
                <h3 className="Number">{posts.length}</h3>
                <small>Posts</small>
              </a>
              <a className="NumberContainer" href="#Followers">
                <h3 className="Number">{followersData.length}</h3>
                <small>Followers</small>
              </a>
              <a className="NumberContainer" href="#Following">
                <h3 className="Number">{followingData.length}</h3>
                <small>Following</small>
              </a>
            </div>
            <main className="Container" id="siteContainer">
              <section className="Posts Base" id="posts">
                {posts.length > 0 ? <></> : <h3>There is no Posts yet!</h3>}
              </section>
              <section className="Followers Base" id="followers">
                <h3>Users following you:</h3>
                {followersData.map((data) => (
                  <UserCard Username={data.name} />
                ))}
              </section>
              <section className="Following Base" id="following">
                {followingData.length > 0 ? (
                  <>
                    <h3>Users you following:</h3>
                    {followingData.map((data) => (
                      <UserCard Username={data.name} />
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
    </>
  );
}
