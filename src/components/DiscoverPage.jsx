import React, { useEffect, useState } from "react";
import Header from "./Header";
import "/src/styles/DiscoverPage.css";

function DiscoverPeoplePage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://randomuser.me/api/?results=150")
      .then((res) => res.json())
      .then((data) => {
        const formattedUsers = data.results.map((user) => ({
          name: `${user.name.first} ${user.name.last}`,
          username: user.login.username,
          img: user.picture.large,
        }));
        setUsers(formattedUsers);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <div className="discover-people-container">
        <h2>People You May Know</h2>
        {loading ? (
          <p>Loading users...</p>
        ) : (
          <div className="user-cards-grid">
            {users.map((user, index) => (
              <div key={index} className="user-card">
                <img src={user.img} alt={user.username} className="user-img" />
                <div className="user-info">
                  <span className="user-name">{user.name}</span>
                  <span className="user-username">@{user.username}</span>
                </div>
                <button className="follow-btn">Follow</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default DiscoverPeoplePage;
