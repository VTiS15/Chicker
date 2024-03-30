import Sidebar from "../components/sidebar";
import { useToggle } from "@uidotdev/usehooks";
import { useState } from "react";
import "./SettingPage.css";

import { getStyling, setStyling } from "../functions/style";

export default function SettingPage() {
  const [selectedFont, setSelectedFont] = useState("Courier New");
  const [selectedFontColor, setSelectedFontColor] = useState("white");
  const [sliderValue, setSliderValue] = useState(1);
  const [themeColor, setThemeColor] = useToggle(true);

  const handleFontChange = (event) => {
    const font = event.target.value;
    setSelectedFont(font);
    setStyling({ fontFamily: font });
  };

  const handleSliderChange = (event) => {
    const value = parseInt(event.target.value);
    console.log(value);
    setSliderValue(value);
  };

  const handleFontColorChange = (event) => {
    const color = event.target.value;
    setSelectedFontColor(color);
    setStyling({ color });
  };

  const handleThemeColorChange = () => {
    setThemeColor();
    if (!themeColor) setStyling({ backgroundColor: "#dfb682" });
    else setStyling({ backgroundColor: "#2f2f2f" });
  };

  const styling = getStyling();

  return (
    <>
      <body style={{ ...styling }}>
        <Sidebar />
        <div className="SettingPage">
          <h1>SETTINGS</h1>
          <a id="Profile"></a>
          <a id="Security"></a>
          <a id="Theme"></a>
          <ul className="NavBar">
            <li>
              <a href="#Profile" style={{ ...styling }}>
                Profile
              </a>
            </li>
            <li>
              <a href="#Security" style={{ ...styling }}>
                Security
              </a>
            </li>
            <li>
              <a href="#Theme" style={{ ...styling }}>
                Theme
              </a>
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
                  <option value="Central and Western">
                    Central and Western
                  </option>
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
                <input
                  type="checkbox"
                  id="toggle"
                  className="DarkModeCheckbox"
                  onClick={handleThemeColorChange}
                />
                <label for="toggle" className="DarkModeContainer">
                  <div>OFF</div>
                  <div>ON</div>
                </label>

                <label>Font style</label>
                <br />
                <select value={selectedFont} onChange={handleFontChange}>
                  <option value="Courier New">Courier New</option>
                  <option value="Trebuchet MS">Trebuchet MS</option>
                  <option value="Times New Roman">Times New Roman</option>
                </select>
                <br />
                <label>Font size</label>
                <div class="slidecontainer">
                  <input
                    className="Slider"
                    type="range"
                    min={1}
                    max={7}
                    value={sliderValue}
                    onChange={handleSliderChange}
                  />
                </div>
                <label>Font color</label>
                <br />
                <select
                  value={selectedFontColor}
                  onChange={handleFontColorChange}
                >
                  <option value="white">white</option>
                  <option value="black">black</option>
                  <option value="red">red</option>
                  <option value="#a26b89">purple</option>
                </select>
              </form>
            </section>
          </main>
        </div>
      </body>
    </>
  );
}
