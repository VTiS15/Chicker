import Sidebar from "../components/sidebar";
import { globaltextstyle } from "./SettingPage";
import "./ChatPage.css";

export default function ChatPage() {
  return (
    <>
      <Sidebar />
      <div className="ChatPage" style={globaltextstyle}>
        <h1>CHAT WITH FRIENDS</h1>
      </div>
    </>
  );
}
