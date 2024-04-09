import "./LoginPage.css";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../Pictures/IconPicture.jpeg";
import { useGetUsers } from "../functions/getUsers";

let login = false;

export const setUserLogin = (updatedUserLogin) => {
  login = updatedUserLogin;
};

export const getUserLogin = () => {
  return login;
};

export default function LoginPage() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const users = useGetUsers();
  const navigate = useNavigate();
  console.log(users);

  const handleChange = (event) => {
    if (event.target.id === "fname") {
      setName(event.target.value);
    }

    if (event.target.id === "fpassword") {
      setPassword(event.target.value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (name && password) {
      setUserLogin(true);
      console.log(login);
      navigate("/");
    } else {
      alert("Please fill out all fields");
      return;
    }
  };

  return (
    <div className="LoginPage">
      <div className="LoginBackgrond"></div>
      <Link to="/" style={{ position: "fixed", top: 0 }}>
        <button className="BackButton">Back</button>
      </Link>
      <div className="LoginCard">
        <img className="logo" src={logo} />
        <h2>Sign in to Chicker</h2>
        <form className="LoginForm" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="UserName"
            id="fname"
            onChange={handleChange}
          ></input>
          <input
            type="password"
            placeholder="Password"
            id="fpassword"
            onChange={handleChange}
          ></input>
          <button>Sign In</button>
        </form>
        <footer>
          Do not have an account? Click{" "}
          <a>
            <Link to="/Registrartion">here</Link>
          </a>
        </footer>
      </div>
    </div>
  );
}
