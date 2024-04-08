import "./LoginPage.css";
import { Link } from "react-router-dom";
import logo from "../Pictures/IconPicture.jpeg";

export default function LoginPage() {
  return (
    <div className="LoginPage">
      <div className="LoginBackgrond"></div>
      <div className="LoginCard">
        <img className="logo" src={logo} />
        <h2>Sign in to Chicker</h2>
        <form className="LoginForm">
          <input type="text" placeholder="UserName" id="fname"></input>
          <input type="password" placeholder="Password" id="fpassword"></input>
          <Link to="/">
            <button>Sign In</button>
          </Link>
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
