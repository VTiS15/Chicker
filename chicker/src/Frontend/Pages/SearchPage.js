import "./SearchPage.css";
import { useState, useEffect } from "react";
import { useToggle } from "@uidotdev/usehooks";
import { Link, useNavigate } from "react-router-dom";

import Sidebar from "../components/sidebar";
import UserCard from "../components/UserCard";
import { userData } from "../functions/dummydata";
import { getUserLogin } from "./LoginPage";
import { getStyling } from "../functions/style";
import CryPic from "../Pictures/crying.jpg";

export default function SearchPage() {
  const styling = getStyling();
  const userLogin = getUserLogin();

  const [recommandationtype, setRecommandationtype] = useToggle(true);
  const [showSearchResult, setShowSearchResult] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = (event) => {
    event.preventDefault();
    setShowSearchResult(true);
    setResults(searchUsers(searchTerm, userData));
  };

  const searchUsers = (term) => {
    return userData.filter((user) => {
      return user.name.toLowerCase().includes(term.toLowerCase());
    });
  };

  return (
    <body style={{ ...styling }}>
      <Sidebar className="SideBar" />{" "}
      <div className="SearchPage">
        <h2 className="SearchTitle">Search for Users, Posts</h2>
        <form
          className="SearchForm"
          role="search"
          value={searchTerm}
          onSubmit={handleSearch}
        >
          <input
            className="SearchInput"
            id="search"
            type="search"
            placeholder="Search..."
            autofocus
            required
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="SubmitButton">Go</button>
        </form>
        {showSearchResult ? (
          <div className="SearchResult">
            <button onClick={() => setShowSearchResult(false)}>Back</button>
            {results.length > 0 ? (
              <div className="SearchResultBox">
                {results.map((data) => (
                  <UserCard
                    Username={data.name}
                    UserIcon={data.image}
                    UserEmail={data.email}
                    UserStatus={data.isfollowing}
                  />
                ))}
              </div>
            ) : (
              <>
                <div>No matchces...</div>
                <img
                  src={CryPic}
                  style={{ height: "50vh", borderRadius: "12px" }}
                ></img>
              </>
            )}
          </div>
        ) : (
          <div className="Recommandation">
            <div className="RecommandationNavBar">
              <p className="RecommandationTitle">Recommand to you: </p>
              <input
                type="checkbox"
                id="toggle"
                className="RecommandationCheckbox"
                onClick={setRecommandationtype}
              />
              <label for="toggle" className="RecommandationContainer">
                <div>Users</div>
                <div>Posts</div>
              </label>
            </div>
            <div className="RecommandationBox">
              {recommandationtype ? (
                <>
                  {userData.map((data) => (
                    <UserCard
                      Username={data.name}
                      UserIcon={data.image}
                      UserEmail={data.email}
                      UserStatus={data.isfollowing}
                    />
                  ))}
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        )}
      </div>
    </body>
  );
}
