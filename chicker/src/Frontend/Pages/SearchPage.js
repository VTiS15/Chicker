import { useState } from "react";
import { useToggle } from "@uidotdev/usehooks";
import Sidebar from "../components/sidebar";
import UserCard from "../components/UserCard";
import { userData } from "../functions/dummydata";
import "./SearchPage.css";

import { getStyling } from "../functions/style";

export default function SearchPage() {
  const styling = getStyling();
  const [recommandationtype, setRecommandationtype] = useToggle(true);

  return (
    <>
      <body style={{ ...styling }}>
        <Sidebar className="SideBar" />
        <div className="SearchPage">
          <h2 className="SearchTitle">Search for Users, Posts</h2>
          <form className="SearchForm" role="search">
            <input
              className="SearchInput"
              id="search"
              type="search"
              placeholder="Search..."
              autofocus
              required
            />
            <button className="SubmitButton">Go</button>
          </form>
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
        </div>
      </body>
    </>
  );
}
