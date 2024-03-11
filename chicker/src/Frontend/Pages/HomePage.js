import { Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import "./HomePage.css";

export default function HomePage() {
  return (
    <CSSTransition
      in={true}
      appear={true}
      timeout={300}
      classNames="Registrartion"
    >
      <div className="HomePage">
        <button>
          <Link to="/Login">Login</Link>
        </button>
      </div>
    </CSSTransition>
  );
}
