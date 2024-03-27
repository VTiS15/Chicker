import Sidebar from "../components/sidebar";
import "./SettingPage.css";

export default function SettingPage() {
  return (
    <>
      <Sidebar />
      <div className="SettingPage">
        <h1>SETTINGS</h1>
        <a id="Profile"></a>
        <a id="Security"></a>
        <a id="Theme"></a>
        <ul className="NavBar">
          <li>
            <a href="#Profile">Profile</a>
          </li>
          <li>
            <a href="#Security">Security</a>
          </li>
          <li>
            <a href="#Theme">Theme</a>
          </li>
        </ul>
        <main class="WrapperContainer" id="siteContainer">
          <section className="Profile BaseLayers" id="profile">
            <h2>Profile</h2>
            <form>
              <label>Username</label>
              <input></input>
              <br />
              <label>About you</label>
              <input></input>
              <br />
              <label>Gender</label>
              <input></input>
              <br />
              <label>Phone Number</label>
              <input></input>
              <br />
              <label>Email</label>
              <input></input>
              <br />
              <label>Address</label>
              <input></input>
              <br />
            </form>
          </section>
          <section className="Security BaseLayers" id={"security"}>
            <h2>Security</h2>
          </section>
          <section className="Theme BaseLayers" id={"theme"}>
            <h2>Theme</h2>
          </section>
        </main>
      </div>
    </>
  );
}
