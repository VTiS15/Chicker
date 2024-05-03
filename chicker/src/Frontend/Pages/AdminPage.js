/*
This is the admin page, where only admin users can access to this page. Also, Admin users can do user managment here.
Functions:
- view all users displaying username and userid
- delete users
*/

import "./AdminPage.css";
import React, { useState, useEffect } from "react";
import Sidebar from "../components/sidebar";

const AdminPage = () => {
  const [users, setUsers] = useState([]);

  // Using useEffect for single rendering
  useEffect(() => {
    // Using fetch to fetch the api from
    // flask server it will be redirected to proxy
    fetch("/api/users").then((res) =>
      res.json().then((data) => {
        const modifiedUsers = data.users.map((user) => ({
          id: user._id.$oid,
          username: user.username,
        }));
        setUsers(modifiedUsers);
      })
    );
  }, []);

  // function for deleting users
  const deleteUser = (user_id) => {
    fetch("/api/user/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.msg === "Deletion of self is forbidden.") {
          console.log("Deletion of self is forbidden.");
          alert("Deletion of self is forbidden.");
        } else if (data.msg === "Success") {
          console.log("Delete user successfully");
          alert("Delete user successfully");
        } else if (data.msg === "User not found.") {
          console.log("User not found.");
          alert("User not found.");
        } else if (data.msg === "Permission denied.") {
          console.log("Permission denied.");
          alert("Permission denied.");
        } else {
          console.log("Failed dunno why.");
        }
      });
  };

  return (
    <div>
      <Sidebar />
      <div className="AdminPage">
        <div>Admin Page</div>
        <table>
          <thead>
            <tr>
              <th>User ID</th>
              <th>User Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>
                  <button onClick={() => deleteUser(user.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPage;
