import "./AdminPage.css";

import React, { useState, useEffect } from 'react';
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
          username: user.username
        }));
        setUsers(modifiedUsers);
      })
    );
  }, []);

  const deleteUser = (userId) => {
    fetch(`/api/user/delete/${userId}`) // Replace with your Flask API endpoint for deleting a user
      .then(response => {
        if (response.ok) {
          setUsers(users.filter(user => user.id !== userId));
        } else {
          console.log('Failed to delete user');
        }
      })
      .catch(error => console.log(error));
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
            {users.map(user => (
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