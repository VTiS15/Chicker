/*
This is the register page, where users can create their account by entering username and passwords.
If they already have an account, they can go to login page to login
Functinos:
- Create user
- go to login page 
 */

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./RegistrationPage.css";
import logo from "../Pictures/IconPicture.jpeg";

export default function RegistrartionPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const navigate = useNavigate();

  // This is use to check user have enter passwords correctly
  // If they spell it correct, then they can create their new account
  const handleSubmit = (event) => {
    if (password !== password2) {
      alert("Password not same");
    } else {
      event.preventDefault();

      fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.msg === "Success.") {
            console.log("Register successfully");
            navigate("/Login");
          } else if (data.msg === "Username taken.") {
            console.log("Register failed");
            alert("Username taken");
          } else {
            console.log("Register failed");
            alert("Registered failed");
          }
        })
        .catch((error) => {
          // Handle any errors
        });
    }
  };

  return (
    <div className="RegistrartionPage">
      <div className="RegistrartionBackground"></div>
      <Link to="/" style={{ position: "fixed", top: 0 }}>
        <button className="BackButton">Back</button>
      </Link>
      <div className="RegistrartionCard">
        <img className="logo" src={logo} />
        <h2>Create an account</h2>
        <form className="RegistrartionForm" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            id="fname"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            id="femail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            id="fpassword"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter Password again"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            id="fcheck"
          />
          <button>Create account</button>
        </form>
        <footer>
          Already have an account?{" "}
          <a>
            <Link to="/Login">login</Link>
          </a>
        </footer>
      </div>
    </div>
  );
}
