import React, { useEffect, useState } from "react";
import "/src/styles/HomePage.css";
import Header from "../components/Header";
import DiscoverPeoplePage from "../components/DiscoverPage";
import Stories from "../components/Stories";

const HomePage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const userRes = await fetch("https://randomuser.me/api/?results=50");
        const userData = await userRes.json();

        const mockPosts = userData.results.map((user, index) => ({
          id: index + 1,
          username: user.login.username,
          avatar: user.picture.medium,
          image: `https://picsum.photos/500/400?random=${index + 1}`,
          caption: "Enjoying the moment!",
          likes: Math.floor(Math.random() * 500),
          comments: Math.floor(Math.random() * 100),
        }));

        setPosts(mockPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }

    fetchPosts();
  }, []);

  return (
   <>
  <Header />
  <Stories />
  <div className="feed-container">
    {posts.map((post, index) => (
      <div className="post-card" key={post.id}>
        <div className="post-header">
          <img src={post.avatar} alt="avatar" className="avatar" />
          <span className="username">{post.username}</span>
        </div>
        <img src={post.image} alt="post" className="post-image" />
        <div className="post-info">
          <p className="caption">{post.caption}</p>
          <div className="post-stats">
            <span>❤️ {post.likes}</span>
            <span>💬 {post.comments}</span>
          </div>
          <button className="like-btn">♡ Like</button>
        </div>
      </div>
    ))}
  </div>
  <DiscoverPeoplePage />
  </>

  );
};

export default HomePage;
