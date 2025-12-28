import React, { useEffect, useState } from "react";
import Header from "./Header";
import "/src/styles/DiscoverPage.css";

function DiscoverPeoplePage() {
  const [mockUsers, setMockUsers] = useState([]);
  const [realUsers, setRealUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState("");

  const getRandomImage = (seed) => {
    const imageId = Math.floor(Math.random() * 1000);
    return `https://picsum.photos/seed/${seed || imageId}/150/150`;
  };


  useEffect(() => {
    fetch("https://randomuser.me/api/?results=30")
      .then((res) => res.json())
      .then((data) => {
        const formattedUsers = data.results.map((user, index) => ({
          name: `${user.name.first} ${user.name.last}`,
          username: user.login.username,
          img: getRandomImage(user.login.username + index),
          type: "mock",
          source: "Suggested Profiles"
        }));
        setMockUsers(formattedUsers);
      })
      .catch((err) => {
        console.error("Error fetching mock users:", err);
      });
  }, []);


  useEffect(() => {
    const fetchRealUsers = async () => {
      const cookies = document.cookie;
      const tokenMatch = cookies.match(/token=([^;]+)/);

      if (!tokenMatch) {
        setLoading(false);
        return;
      }

      const token = tokenMatch[1];

      try {
        const response = await fetch('https://task4-authdb.onrender.com/auth/all', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json();
          const formattedRealUsers = data.map((user, index) => ({
            name: user.name || "Anonymous User",
            username: user.email ? user.email.split('@')[0] : "user",

            img: getRandomImage(user.email || user.name + index),
            bio: user.bio || "",
            city: user.city || "",
            type: "real",
            source: "Platform Users"
          }));
          setRealUsers(formattedRealUsers);
        } else {
          console.log("Real users API failed, showing only mock users");
        }
      } catch (error) {
        console.error("Real users API error:", error);
        setApiError("Real users temporarily unavailable");
      } finally {
        setLoading(false);
      }
    };

    fetchRealUsers();
  }, []);

  const allUsers = [...realUsers, ...mockUsers];

  return (
    <>
      <div className="discover-people-container">
        <h2>Discover People</h2>

        {realUsers.length > 0 && (
          <div className="user-section">
            <div className="user-cards-grid">
              {realUsers.map((user, index) => (
                <div key={`real-${index}`} className="user-card real-user">
                  <img
                    src={user.img}
                    alt={user.username}
                    className="user-img"
                    style={{
                      borderRadius: '50%',
                      border: '3px solid #4CAF50',
                      objectFit: 'cover',
                      width: '150px',
                      height: '150px'
                    }}
                  />
                  <div className="user-info">
                    <span className="user-name">{user.name}</span>
                    <span className="user-username">@{user.username}</span>
                    {user.bio && (
                      <p className="user-bio" style={{
                        fontSize: '12px',
                        color: '#666',
                        marginTop: '8px',
                        fontStyle: 'italic'
                      }}>
                        "{user.bio.length > 60 ? user.bio.substring(0, 60) + '...' : user.bio}"
                      </p>
                    )}
                    {user.city && (
                      <p className="user-city" style={{
                        fontSize: '11px',
                        color: '#888',
                        marginTop: '5px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px'
                      }}>
                        📍 {user.city}
                      </p>
                    )}
                  </div>
                  <button className="follow-btn">Follow</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {mockUsers.length > 0 && (
          <div className="user-section">
            <h3 style={{
              color: '#2196F3',
              marginTop: realUsers.length > 0 ? '40px' : '0',
              marginBottom: '15px',
              paddingBottom: '10px',
              borderBottom: '2px solid #2196F3'
            }}>
              Suggested Profiles
            </h3>
            <div className="user-cards-grid">
              {mockUsers.map((user, index) => (
                <div key={`mock-${index}`} className="user-card mock-user">
                  <img
                    src={user.img}
                    alt={user.username}
                    className="user-img"
                    style={{
                      borderRadius: '50%',
                      border: '3px solid #2196F3',
                      objectFit: 'cover',
                      width: '150px',
                      height: '150px'
                    }}
                  />
                  <div className="user-info">
                    <span className="user-name">{user.name}</span>
                    <span className="user-username">@{user.username}</span>
                    <small style={{
                      color: '#2196F3',
                      fontSize: '10px',
                      fontWeight: 'bold',
                      marginTop: '8px',
                      display: 'inline-block'
                    }}>
                      Suggested
                    </small>
                  </div>
                  <button className="follow-btn">Follow</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {apiError && (
          <div style={{
            background: '#fff8e1',
            color: '#856404',
            padding: '15px',
            borderRadius: '8px',
            margin: '20px 0',
            textAlign: 'center',
            border: '1px solid #ffeaa7'
          }}>
            ⚠️ {apiError} - Showing suggested profiles only
          </div>
        )}

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              border: '4px solid #f3f3f3',
              borderTop: '4px solid #3498db',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 15px'
            }}></div>
            <p>Discovering people...</p>
          </div>
        ) : allUsers.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#666', padding: '40px' }}>
            No users to display yet. Be the first to invite friends!
          </p>
        ) : null}
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
}

export default DiscoverPeoplePage;