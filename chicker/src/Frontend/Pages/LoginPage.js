import "./LoginPage.css";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../Pictures/IconPicture.jpeg";

// const loginCheck = () => {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     fetch("/api/users").then((res) =>
//       res.json().then((data) => {
//         const modifiedUsers = data.users.map((user) => ({
//           id: user._id.$oid,
//           username: user.username,
//         }));
//         setUsers(modifiedUsers);
//       })
//     );
//   }, []);

//   console.log(users);
// };

export default function LoginPage() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (e) => {
    if (e.target.id === "fname") {
      setName(e.target.value);
    }

    if (e.target.id === "fpassword") {
      setPassword(e.target.value);
    }
  };
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    if (name && password) {
      console.log("valid");
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
