import "./RegistrationPage.css";
import { Link } from "react-router-dom";
import logo from "../Pictures/IconPicture.jpeg";

export default function RegistrartionPage() {
  return (
    <div className="RegistrartionPage">
      Create an account
      <div className="card">
        <img className="logo" src={logo} />
        <form className="form">
          <input type="text" placeholder="Username" id="fname" />
          <input type="email" placeholder="Email" id="femail" />
          <input type="password" placeholder="Password" id="fpassword" />
          <input
            type="password"
            placeholder="Enter Password again"
            id="fcheck"
          />
        </form>
        <button>Create account</button>
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
