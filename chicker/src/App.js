import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Frontend/Layout";

import LoginPage from "./Frontend/Pages/LoginPage";
import RegistrartionPage from "./Frontend/Pages/RegistrationPage";
import SearchPage from "./Frontend/Pages/SearchPage";
import SettingPage from "./Frontend/Pages/SettingPage";
import Home from "./Frontend/Pages/Home";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/Login" element={<LoginPage />} />
          <Route path="/Registrartion" element={<RegistrartionPage />} />
          <Route path="/Search" element={<SearchPage />} />
          <Route path="/Setting" element={<SettingPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
