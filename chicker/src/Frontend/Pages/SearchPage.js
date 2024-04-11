import "./SearchPage.css";
import { useState, useEffect } from "react";
import { useToggle } from "@uidotdev/usehooks";
import { Link, useNavigate } from "react-router-dom";

import Sidebar from "../components/sidebar";
import UserCard from "../components/UserCard";
import { userData } from "../functions/dummydata";
import { getMyID } from "./LoginPage";
import { getStyling } from "../functions/style";
import CryPic from "../Pictures/crying.jpg";
const styling = getStyling();

export default function SearchPage() {
  // const userLogin = getUserLogin();
  const myID = getMyID();
  const user = userData.find((user) => user._id === myID);
  const [recommandationtype, setRecommandationtype] = useToggle(true);
  const [showSearchResult, setShowSearchResult] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [users, setUsers] = useState([]);
  const [recommandUserID, setRecommandUserID] = useState([]);
  const [recommandPostID, setRecommandPostID] = useState([]);

  const handleSearch = (event) => {
    event.preventDefault();
    setShowSearchResult(true);
    setResults(searchUsers(searchTerm, users));
  };

  const searchUsers = (term) => {
    return users.filter((user) => {
      return (
        user.username.toLowerCase().includes(term.toLowerCase()) &&
        user.user_id !== myID
      );
    });
  };

  useEffect(() => {
    fetch("/api/users").then((res) =>
      res.json().then((data) => {
        const modifiedUsers = data.users.map((user) => ({
          id: user._id.$oid,
          username: user.username,
          email: user.email,
        }));
        setUsers(modifiedUsers);
      })
    );

    fetch("/api/user/recommend").then((res) =>
      res.json().then((data) => {
        setRecommandUserID(data);
      })
    );

    fetch("/api/post/recommend").then((res) =>
      res.json().then((data) => {
        setRecommandPostID(data);
      })
    );
  }, []);

  const recommendedUsers = users.filter((user) => {
    return [].concat(...Object.values(recommandUserID)).includes(user.id);
  });

  return (
    <body style={{ ...styling }}>
      <Sidebar className="SideBar" />{" "}
      <div className="SearchPage">
        <h2 className="SearchTitle">Search for Users</h2>
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
                    Username={data.username}
                    UserIcon={data.image}
                    UserEmail={data.email}
                    UserStatus={user && user.follower.includes(data._id)}
                  />
                ))}
              </div>
            ) : (
              <>
                <div>No matches...</div>
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
              <p className="RecommandationTitle">Recommend to you: </p>
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
                  {recommendedUsers.map((data) => (
                    <UserCard
                      UserID={data.user_id}
                      Username={data.username}
                      UserIcon={data.icon_id}
                      UserEmail={data.email}
                      UserStatus={user && user.follower.includes(data._id)}
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
