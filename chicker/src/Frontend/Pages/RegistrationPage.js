import { Link } from "react-router-dom";
import "./RegistrationPage.css";
import logo from "../Pictures/IconPicture.jpeg";

export default function RegistrartionPage() {
  return (
    <div className="RegistrartionPage">
      <div className="RegistrartionBackground"></div>
      <div className="RegistrartionCard">
        <img className="logo" src={logo} />
        <h2>Create an account</h2>
        <form className="RegistrartionForm">
          <input type="text" placeholder="Username" id="fname" />
          <input type="email" placeholder="Email" id="femail" />
          <input type="password" placeholder="Password" id="fpassword" />
          <input
            type="password"
            placeholder="Enter Password again"
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
