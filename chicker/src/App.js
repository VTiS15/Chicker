import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Frontend/Layout";

import LoginPage from "./Frontend/Pages/LoginPage";
import RegistrartionPage from "./Frontend/Pages/RegistrationPage";
import SearchPage from "./Frontend/Pages/SearchPage";
import ProfilePage from "./Frontend/Pages/ProfilePage";
import SettingPage from "./Frontend/Pages/SettingPage";
import Home from "./Frontend/Pages/Home";
import { AuthProvider } from "./Frontend/AuthContext";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/Login" element={<LoginPage />} />
            <Route path="/Registrartion" element={<RegistrartionPage />} />
            <Route path="/Search" element={<SearchPage />} />
            <Route path="/Setting" element={<SettingPage />} />
            <Route path="/Profile" element={<ProfilePage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
