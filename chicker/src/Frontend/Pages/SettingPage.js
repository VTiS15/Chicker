import Sidebar from "../components/sidebar";
import "./SettingPage.css";

export default function SettingPage() {
  const textstyle = { fontFamily: "Courier New" };

  return (
    <>
      <Sidebar />
      <div className="SettingPage" style={textstyle}>
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
            <p>Changing personal information</p>
            <form className="ProfileForm">
              <label>Username</label>
              <br />
              <input type="text" required></input>
              <br />
              <label>First Name</label>
              <br />
              <input></input>
              <br />
              <label>Last Name</label>
              <br />
              <input></input>
              <br />
              <label>Gender</label>
              <br />
              <select>
                <option value="--">--</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Attack Helicopter">Attack Helicopter</option>
              </select>
              <br />
              <label>Date of birth</label>
              <br />
              <input className="BirthSelect" type="date"></input>
              <br />
              <label type="tel">Phone Number</label>
              <br />
              <input></input>
              <br />
              <label>Email Address</label>
              <br />
              <input type="email"></input>
              <br />

              <label>Location</label>
              <br />
              <select>
                <option value="--">--</option>
                <option value="Central and Western">Central and Western</option>
                <option value="Wan Chai">Wan Chai</option>
                <option value="Eastern">Eastern</option>
                <option value="Southern">Southern</option>
                <option value="Sha Tin">Sha Tin</option>
                <option value="Tai Po">Tai Po</option>
                <option value="Tuen Mun">Tuen Mun</option>
              </select>
              <br />
              <label>About you</label>
              <br />
              <textarea placeholder="Write something.."></textarea>
              <br />
              <input className="Submit" type="submit" value="Submit"></input>
            </form>
          </section>
          <section className="Security BaseLayers" id={"security"}>
            <h2>Security</h2>
            <form className="SecurityForm">
              <p>Reset your password</p>
              <label>Old password</label>
              <br />
              <input></input>
              <br />
              <label>New password</label>
              <br />
              <input></input>
              <br />
              <label>Enter new password again</label>
              <br />
              <input></input>
              <br />
              <input className="Submit" type="submit" value="Submit"></input>
              <br />
            </form>
          </section>
          <section className="Theme BaseLayers" id={"theme"}>
            <h2>Theme</h2>
            <p>Changing Theme/Text style</p>
            <form className="ThemeForm">
              <label>Dark mode</label>
              <br />
              <input type="checkbox" id="toggle" className="DarkModeCheckbox" />
              <label for="toggle" className="DarkModeContainer">
                <div>Light</div>
                <div>Dark</div>
              </label>

              <label>Font style</label>
              <br />
              <select>
                <option value="Courier New">Courier New</option>
              </select>
              <br />
              <label>Font size</label>
              <div class="slidecontainer">
                <input className="Slider" type="range" min={1} max={7} />
              </div>
              <label>Font color</label>
              <br />
              <select>
                <option value="white">while</option>
                <option value="black">black</option>
              </select>
            </form>
          </section>
        </main>
      </div>
    </>
  );
}