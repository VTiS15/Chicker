import { Link } from "react-router-dom";
import React from "react";
import "./sidebar.css";

import logo from "../Pictures/IconClear.png";
import home from "../Pictures/home.svg";
import search from "../Pictures/search.svg";
import profile from "../Pictures/profile.svg";
import chat from "../Pictures/chat.svg";
import setting from "../Pictures/setting.svg";

const linkstyle = { textDecoration: "none" };

const Sidebar = () => {
  return (
    <div className="sidebar">
      <img className="sidebar-image" src={logo} alt="Home" />
      <Link to="/" style={linkstyle}>
        <button className="sidebar-button">
          <img className="icon" src={home} alt="Home" />
          <span className="button-text">Home</span>
        </button>
      </Link>
      <Link to="/Search" style={linkstyle}>
        <button className="sidebar-button">
          <img className="icon" src={search} alt="Home" />
          <span className="button-text">Search</span>
        </button>
      </Link>
      <Link to="/Profile" style={linkstyle}>
        <button className="sidebar-button">
          <img className="icon" src={profile} alt="Home" />
          <span className="button-text">Profile</span>
        </button>
      </Link>
      <button className="sidebar-button">
        <img className="icon" src={chat} alt="Home" />
        <span className="button-text">Chat</span>
      </button>
      <button className="sidebar-button">
        <img className="icon" src={setting} alt="Home" />
        <span className="button-text">Setting</span>
      </button>
    </div>
  );
};

export default Sidebar;
