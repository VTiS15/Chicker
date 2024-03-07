import "./LoginPage.css";
import { Link } from "react-router-dom";
import logo from "../Pictures/IconPicture.jpeg";

export default function LoginPage() {
  return (
    <div className="LoginPage">
      <div className="background"></div>
      <div className="card">
        <img className="logo" src={logo} />
        <h2>Sign in to Chicker</h2>
        <form className="form">
          <input type="text" placeholder="UserName" id="fname"></input>
          <input type="password" placeholder="Password" id="fpassword"></input>
          <button>Sign In</button>
        </form>
        <footer>
          Do not have an account? Click{" "}
          <a>
            <Link to="/Registrartion">here</Link>
          </a>{" "}
          to register!
        </footer>
      </div>
    </div>
  );
}
