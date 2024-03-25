import React from 'react';
import "./sidebar.css";
import logo from "../Pictures/IconClear.png";
import home from "../Pictures/home.svg";
import search from "../Pictures/search.svg";
import profile from "../Pictures/profile.svg";
import chat from "../Pictures/chat.svg";
import setting from "../Pictures/setting.svg";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <img className="sidebar-image" src={logo} alt="Home" />
      <button className="sidebar-button">
        <img className="icon" src={home} alt="Home" />
        <span className="button-text">Home</span>
      </button>
      <button className="sidebar-button">
        <img className="icon" src={search} alt="Home" />
        <span className="button-text">Search</span>
      </button>
      <button className="sidebar-button">
        <img className="icon" src={profile} alt="Home" />
        <span className="button-text">Profile</span>
      </button>
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