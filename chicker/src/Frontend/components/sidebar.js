import { Link } from "react-router-dom";
import React, { useContext } from "react";
import "./sidebar.css";
import { getUserLogin, setUserLogin } from "../Pages/LoginPage";

import logo from "../Pictures/IconClear.png";
import home from "../Pictures/home.svg";
import search from "../Pictures/search.svg";
import profile from "../Pictures/profile.svg";
import chat from "../Pictures/chat.svg";
import setting from "../Pictures/setting.svg";

const linkstyle = {
  textDecoration: "none",
  cursor: "pointer",
  padding: "5px 10px",
};

function LogInOut() {
  const isLoggedIn = getUserLogin();

  return (
    <>
      {isLoggedIn ? (
        <Link to="/" className="logoutButtonContainer">
          <button className="logoutButton" onClick={setUserLogin(false)}>
            LogOut
          </button>
        </Link>
      ) : (
        <Link to="/Login" className="loginButtonContainer" style={linkstyle}>
          <button className="loginButton">LogIn</button>
        </Link>
      )}
    </>
  );
}

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
      <Link to="/Chat" style={linkstyle}>
        <button className="sidebar-button">
          <img className="icon" src={chat} alt="Home" />
          <span className="button-text">Chat</span>
        </button>
      </Link>
      <Link to="/Setting" style={linkstyle}>
        <button className="sidebar-button">
          <img className="icon" src={setting} alt="Home" />
          <span className="button-text">Setting</span>
        </button>
      </Link>
      <Link to="/Admin" style={linkstyle}>
        <button className="sidebar-button">
          <img className="icon" src={setting} />
          <span className="button-text">Admin</span>
        </button>
      </Link>
      <LogInOut />
    </div>
  );
};

export default Sidebar;
