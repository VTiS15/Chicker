import "./AdminPage.css";

import React, { useState, useEffect } from 'react';
import Sidebar from "../components/sidebar";

const AdminPage = () => {
  // const [users, setUsers] = useState([]);

  // useEffect(() => {
  //   fetch('/api/users') // Replace with your Flask API endpoint for retrieving user information
  //     .then(response => response.json())
  //     .then(data => setUsers(data))
  //     .catch(error => console.log(error));
  // }, []);

  // const deleteUser = (userId) => {
  //   fetch(`/api/users/${userId}`, { method: 'DELETE' }) // Replace with your Flask API endpoint for deleting a user
  //     .then(response => {
  //       if (response.ok) {
  //         setUsers(users.filter(user => user.id !== userId));
  //       } else {
  //         console.log('Failed to delete user');
  //       }
  //     })
  //     .catch(error => console.log(error));
  // };

  const users = [{id: 1, name: "John",}, {id: 2, name: "Jack",},]

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
                <td>{user.name}</td>
                <td>
                  <button>Delete</button>
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