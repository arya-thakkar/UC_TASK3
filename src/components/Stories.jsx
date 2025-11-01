import React, { useEffect, useState } from "react";
import "/src/styles/Stories.css";

const Stories = () => {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    async function fetchStories() {
      try {
        const res = await fetch("https://randomuser.me/api/?results=50");
        const data = await res.json();
        setStories(data.results);
      } catch (error) {
        console.error("Error fetching stories:", error);
      }
    }

    fetchStories();
  }, []);

  return (
    <>
    <div className="main-layout">
    <p className="story">Stories</p>
    <div className="stories-container">
      {stories.map((story, index) => (
        <div className="story-card" key={index}>
          <img
            src={story.picture.medium}
            alt={story.login.username}
            className="story-avatar"
          />
          <span className="story-username">{story.login.username}</span>
        </div>
      ))}
    </div>
    </div>
    </>
  );
};

export default Stories;
