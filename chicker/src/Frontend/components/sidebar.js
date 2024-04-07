import { Link } from "react-router-dom";
import React, { useContext } from "react";
import "./sidebar.css";
import { AuthContext } from "../AuthContext"

import logo from "../Pictures/IconClear.png";
import home from "../Pictures/home.svg";
import search from "../Pictures/search.svg";
import profile from "../Pictures/profile.svg";
import chat from "../Pictures/chat.svg";
import setting from "../Pictures/setting.svg";

const linkstyle = { textDecoration: "none" };

const Sidebar = () => {
  const { isLoggedIn, handleLogStatus } = useContext(AuthContext);

  return (
    <div className="sidebar">
      <img className="sidebar-image" src={logo} alt="Home" />
      <Link to={isLoggedIn ? '/' : '/Login'} style={linkstyle}>
        <button className="sidebar-button">
          <img className="icon" src={home} alt="Home" />
          <span className="button-text">Home</span>
        </button>
      </Link>
      <Link to={isLoggedIn ? '/Search' : '/Login'} style={linkstyle}>
        <button className="sidebar-button">
          <img className="icon" src={search} alt="Login" />
          <span className="button-text">Search</span>
        </button>
      </Link>
      <Link to={isLoggedIn ? '/Profile' : '/Login'} style={linkstyle}>
        <button className="sidebar-button">
          <img className="icon" src={profile} alt="Search" />
          <span className="button-text">Profile</span>
        </button>
      </Link>
      <Link to={isLoggedIn ? '/Chat' : '/Login'} style={linkstyle}>
        <button className="sidebar-button">
          <img className="icon" src={chat} alt="Chat" />
          <span className="button-text">Chat</span>
        </button>
      </Link>
      <Link to={isLoggedIn ? '/Setting' : '/Login'} style={linkstyle}>
        <button className="sidebar-button">
          <img className="icon" src={setting} alt="Setting" />
          <span className="button-text">Setting</span>
        </button>
      </Link>
      <Link to={isLoggedIn ? '/' : '/Login'} style={linkstyle} 
      className={`${isLoggedIn ? "logoutButtonContainer" : "loginButtonContainer"}`}
      onClick={handleLogStatus}>
        <button className={`${isLoggedIn ? "logoutButton" : "loginButton"}`}>
          {isLoggedIn ? "LOGOUT" : "LOGIN"}
        </button>
      </Link>
    </div>
  );
};

export default Sidebar;