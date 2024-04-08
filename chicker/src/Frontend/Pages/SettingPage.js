import Sidebar from "../components/sidebar";
import { useToggle } from "@uidotdev/usehooks";
import { useState, useEffect, useRef } from "react";
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
    setSliderValue(value);
    setStyling({ fontSize: 10 + value * 2 });
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

  const profileRef = useRef();
  const securityRef = useRef();
  const themeRef = useRef();
  const [activeSection, setActiveSection] = useState("profile");

  const handleClick = (section) => {
    setActiveSection(section);
  };

  useEffect(() => {
    if (activeSection === "profile") {
      profileRef.current.style.left = "16vw";
    } else {
      profileRef.current.style.left = "100%";
    }
    if (activeSection === "security") {
      securityRef.current.style.left = "16vw";
    } else {
      securityRef.current.style.left = "100%";
    }
    if (activeSection === "theme") {
      themeRef.current.style.left = "16vw";
    } else {
      themeRef.current.style.left = "100%";
    }
  }, [activeSection]);

  return (
    <body style={{ ...styling }}>
      <Sidebar />
      <div className="SettingPage">
        <h1>SETTINGS</h1>
        <ul className="NavBar">
          <div className="NavBarButton">
            <button
              style={{ ...styling }}
              onClick={() => handleClick("profile")}
            >
              Profile
            </button>
            <button
              style={{ ...styling }}
              onClick={() => handleClick("security")}
            >
              Security
            </button>
            <button style={{ ...styling }} onClick={() => handleClick("theme")}>
              Theme
            </button>
          </div>
        </ul>
        <main class="WrapperContainer" id="siteContainer">
          <section className="Profile BaseLayers" id="profile" ref={profileRef}>
            <h2>Profile</h2>
            <p>Changing personal information</p>
            <form className="ProfileForm">
              <label>Profile Pictures</label>
              <br />
              <input type="file"></input>
              <br />
              <label>Email Address</label>
              <br />
              <input type="email"></input>
              <br />
              <label>About you</label>
              <br />
              <textarea placeholder="Write something about you.."></textarea>
              <br />
              <input className="Submit" type="submit" value="Submit"></input>
            </form>
          </section>
          <section
            className="Security BaseLayers"
            id={"security"}
            ref={securityRef}
          >
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
          <section className="Theme BaseLayers" id={"theme"} ref={themeRef}>
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
                  max={6}
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
  );
}
