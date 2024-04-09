import { useState, useEffect } from "react";

export const useGetUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
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

  console.log(users);
  return users;
};
