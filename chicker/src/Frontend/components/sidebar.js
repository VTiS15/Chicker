import "./sidebar.css";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import { getUserLogin, setUserLogin } from "../Pages/LoginPage";

import logo from "../Pictures/IconClear.png";
import home from "../Pictures/home.svg";
import search from "../Pictures/search.svg";
import profile from "../Pictures/profile.svg";
import chat from "../Pictures/chat.svg";
import setting from "../Pictures/setting.svg";

const linkstyle = {
  textDecoration: "none",
  padding: "5px 10px",
};

const disablestyle = {
  cursor: "not-allowed",
  opacity: 0.5,
};

function LogInOut() {
  const isLoggedIn = getUserLogin();
  const navigate = useNavigate();

  const handleLogOut = () => {
    setUserLogin(false);
    navigate("/");
    window.location.reload();
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
  return (
    <div className="sidebar">
      <img className="sidebar-image" src={logo} alt="Home" />
      <div className="ButtonContainer">
        <Link to="/" style={{ padding: "5px 0", textDecoration: "none" }}>
          <button className="sidebar-button" style={linkstyle}>
            <img className="icon" src={home} alt="Home" />
            <span className="button-text">Home</span>
          </button>
        </Link>
        <Link to="/Search" style={{ padding: "5px 0", textDecoration: "none" }}>
          <button
            className="sidebar-button"
            style={isLoggedIn ? linkstyle : disablestyle}
            disabled={!isLoggedIn}
          >
            <img className="icon" src={search} alt="Home" />
            <span className="button-text">Search</span>
          </button>
        </Link>
        <Link
          to="/Profile"
          style={{ padding: "5px 0", textDecoration: "none" }}
        >
          <button
            className="sidebar-button"
            style={isLoggedIn ? linkstyle : disablestyle}
            disabled={!isLoggedIn}
          >
            <img className="icon" src={profile} alt="Home" />
            <span className="button-text">Profile</span>
          </button>
        </Link>
        <Link to="/Chat" style={{ padding: "5px 0", textDecoration: "none" }}>
          <button
            className="sidebar-button"
            style={isLoggedIn ? linkstyle : disablestyle}
            disabled={!isLoggedIn}
          >
            <img className="icon" src={chat} alt="Home" />
            <span className="button-text">Chat</span>
          </button>
        </Link>
        <Link
          to="/Setting"
          style={{ padding: "5px 0", textDecoration: "none" }}
        >
          <button
            className="sidebar-button"
            style={isLoggedIn ? linkstyle : disablestyle}
            disabled={!isLoggedIn}
          >
            <img className="icon" src={setting} alt="Home" />
            <span className="button-text">Setting</span>
          </button>
        </Link>
      </div>
      <LogInOut />
    </div>
  );
};

export default Sidebar;
