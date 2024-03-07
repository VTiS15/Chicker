import "./HomePage.css";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="HomePage">
      <button>
        <Link to="/Login">Login</Link>
      </button>
    </div>
  );
}
