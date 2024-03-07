import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Frontend/Layout";

import HomePage from "./Frontend/Pages/HomePage";
import LoginPage from "./Frontend/Pages/LoginPage";
import RegistrartionPage from "./Frontend/Pages/RegistrationPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/Login" element={<LoginPage />} />
          <Route path="/Registrartion" element={<RegistrartionPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
