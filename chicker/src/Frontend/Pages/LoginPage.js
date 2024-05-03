import "./LoginPage.css";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../Pictures/IconPicture.jpeg";

let login = false;
export const setUserLogin = (updatedUserLogin) => {
  login = updatedUserLogin;
};
export const getUserLogin = () => {
  return login;
};

let myID = null;
export const setMyID = (id) => {
  myID = id;
};
export const getMyID = () => {
  return myID;
};

// let isAdmin = false;
// export const setIsAdmin = (x) => {
//   isAdmin = x;
// };
// export const getIsAdmin = () => {
//   return isAdmin;
// };

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    if (event.target.id === "fname") {
      setUsername(event.target.value);
    }

    if (event.target.id === "fpassword") {
      setPassword(event.target.value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.user_id) {
          console.log("Login successfully");
          setUserLogin(true);
          setMyID(data.user_id);
          console.log(data.user_id);
          navigate("/");
        } else {
          console.log("Login failed");
          alert("Wrong username/password");
        }
      })
      .catch((error) => {
        console.log(error);
      });

    // let user_id = getMyID();
    // fetch("/api/user/delete", {
    //   method: 'DELETE',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({ user_id })
    // })
    //   .then(response => response.json())
    //   .then(data => {
    //     if (data.msg === "Deletion of self is forbidden.") {
    //       console.log("Welcome dear admin~");
    //       setIsAdmin(true);
    //       navigate("/");
    //     } else {
    //       console.log("You are not admin!");
    //       setIsAdmin(false);
    //       navigate("/");
    //     }
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
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
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></input>
          <input
            type="password"
            placeholder="Password"
            id="fpassword"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <button type="submit">Sign In</button>
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
