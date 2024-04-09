import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Frontend/Layout";

import LoginPage from "./Frontend/Pages/LoginPage";
import RegistrartionPage from "./Frontend/Pages/RegistrationPage";
import SearchPage from "./Frontend/Pages/SearchPage";
import ProfilePage from "./Frontend/Pages/ProfilePage";
import SettingPage from "./Frontend/Pages/SettingPage";
import ChatPage from "./Frontend/Pages/ChatPage";
import Home from "./Frontend/Pages/Home";
import AdminPage from "./Frontend/Pages/AdminPage";

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
          <Route path="/Chat" element={<ChatPage />} />
          <Route path="/Profile" element={<ProfilePage />} />
          <Route path="/Admin" element={<AdminPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
