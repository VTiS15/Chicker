import "./sidebar.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import React from "react";
import { getUserLogin, setUserLogin } from "../Pages/LoginPage";
import { getMyID, setMyID } from "../Pages/LoginPage";

import logo from "../Pictures/IconClear.png";
import home from "../Pictures/home.svg";
import search from "../Pictures/search.svg";
import profile from "../Pictures/profile.svg";
import chat from "../Pictures/chat.svg";
import setting from "../Pictures/setting.svg";
import admin from "../Pictures/admin.svg";

let isAdmin = false;
export const setIsAdmin = (x) => {
  isAdmin = x;
};
export const getIsAdmin = () => {
  return isAdmin;
};

const linkstyle = {
  textDecoration: "none",
};

const disablestyle = {
  cursor: "not-allowed",
  opacity: 0.5,
};

function LogInOut() {
  const isLoggedIn = getUserLogin();
  const navigate = useNavigate();

  const handleLogOut = () => {
    fetch("/api/logout", {
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.msg === "Success.") {
          console.log("Logout successfully");
          setUserLogin(false);
          navigate("/");
          window.location.reload();
        } else {
          console.log("Logout failed");
          alert("Logout failed");
        }
      });
  };

  return (
    <>
      {isLoggedIn ? (
        <Link
          to="/"
          className="logoutButtonContainer"
          style={{
            textDecoration: "none",
            padding: "5px 10px",
            marginBottom: "20px",
          }}
          onClick={handleLogOut}
        >
          <button className="logoutButton" onClick={handleLogOut}>
            Logout
          </button>
        </Link>
      ) : (
        <Link
          to="/Login"
          className="loginButtonContainer"
          style={{
            textDecoration: "none",
            padding: "5px 10px",
            marginBottom: "20px",
          }}
        >
          <button className="loginButton">Login</button>
        </Link>
      )}
    </>
  );
}

const Sidebar = () => {
  const isLoggedIn = getUserLogin();

  let user_id = getMyID();
  fetch("/api/user/delete", {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ user_id })
  })
    .then(response => response.json())
    .then(data => {
      if (data.msg === "Deletion of self is forbidden.") {
        console.log("Welcome dear admin~");
        setIsAdmin(true);
        console.log(isAdmin);
      } else {
        console.log("You are not admin!");
        setIsAdmin(false);
        console.log(isAdmin);
      }
    })
    .catch(error => {
      console.log(error);
    });

  return (
    <div className="sidebar">
      <img className="sidebar-image" src={logo} alt="Home" />
      <div className="ButtonContainer">
        <Link to="/" style={{ textDecoration: "none" }}>
          <button className="sidebar-button" style={linkstyle}>
            <img className="icon" src={home} alt="Home" />
            <span className="button-text">Home</span>
          </button>
        </Link>
        <Link to="/Search" style={{ textDecoration: "none" }}>
          <button
            className="sidebar-button"
            style={isLoggedIn ? linkstyle : disablestyle}
            disabled={!isLoggedIn}
          >
            <img className="icon" src={search} alt="Home" />
            <span className="button-text">Search</span>
          </button>
        </Link>
        <Link to="/Profile" style={{ textDecoration: "none" }}>
          <button
            className="sidebar-button"
            style={isLoggedIn ? linkstyle : disablestyle}
            disabled={!isLoggedIn}
          >
            <img className="icon" src={profile} alt="Home" />
            <span className="button-text">Profile</span>
          </button>
        </Link>
        <Link to="/Chat" style={{ textDecoration: "none" }}>
          <button
            className="sidebar-button"
            style={isLoggedIn ? linkstyle : disablestyle}
            disabled={!isLoggedIn}
          >
            <img className="icon" src={chat} alt="Home" />
            <span className="button-text">Chat</span>
          </button>
        </Link>
        <Link to="/Setting" style={{ textDecoration: "none" }}>
          <button
            className="sidebar-button"
            style={isLoggedIn ? linkstyle : disablestyle}
            disabled={!isLoggedIn}
          >
            <img className="icon" src={setting} alt="Home" />
            <span className="button-text">Setting</span>
          </button>
        </Link>
        {isAdmin ? <Link to="/Admin" style={{ textDecoration: "none" }}>
          <button
            className="sidebar-button"
            style={isLoggedIn ? linkstyle : disablestyle}
            disabled={!isLoggedIn}
          >
            <img className="icon" src={admin} alt="Home" />
            <span className="button-text">Admin</span>
          </button>
        </Link> : <></>}
      </div>
      <LogInOut />
    </div>
  );
};

export default Sidebar;
