import { useState } from "react";
import { useToggle } from "@uidotdev/usehooks";
import Sidebar from "../components/sidebar";
import "./SearchPage.css";

export default function SearchPage() {
  const [recommandationtype, setRecommandationtype] = useToggle(true);
  if (recommandationtype == true) {
    console.log("Users");
  } else {
    console.log("Posts");
  }

  return (
    <>
      <Sidebar className="SideBar" />
      <div className="SearchPage">
        <h2 className="SearchTitle">Search for Users, Posts</h2>
        <form
          className="SearchForm"
          onsubmit="event.preventDefault();"
          role="search"
        >
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
          <p className="RecommandationTitle">Recommand to you</p>
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
      </div>
    </>
  );
}
