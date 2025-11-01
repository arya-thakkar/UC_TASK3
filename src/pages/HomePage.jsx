import React, { useEffect, useState } from "react";
import "/src/styles/HomePage.css";
import Header from "../components/Header";
import DiscoverPeoplePage from "../components/DiscoverPage";
import Stories from "../components/Stories";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [visiblePosts, setVisiblePosts] = useState(20);
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const userRes = await fetch("https://randomuser.me/api/?results=100");
        const userData = await userRes.json();

        const mockPosts = userData.results.map((user, index) => ({
          id: index + 1,
          username: user.login.username,
          avatar: user.picture.medium,
          image: `https://picsum.photos/500/400?random=${index + 1}`,
          caption: "Enjoying the moment!",
          likes: Math.floor(Math.random() * 500),
          comments: Math.floor(Math.random() * 100),
          liked: false, // ✅ track whether this post is liked
        }));

        setAllPosts(mockPosts);
        setPosts(mockPosts.slice(0, visiblePosts));
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }

    fetchPosts();
  }, []);

  const handleLike = (id) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === id) {
        const newLiked = !post.liked;
        const newLikes = newLiked ? post.likes + 1 : post.likes - 1;
        return { ...post, liked: newLiked, likes: newLikes };
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  const loadMorePosts = () => {
    const newVisiblePosts = visiblePosts + 20;
    setVisiblePosts(newVisiblePosts);
    setPosts(allPosts.slice(0, newVisiblePosts));
  };

  const currentPosts = posts.slice(0, visiblePosts);

  return (
    <>
      <div className="story">
        <Stories />
      </div>
      <div className="feed-container">
        {currentPosts.map((post) => (
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

              <button
                className={`like-btn ${post.liked ? "liked" : ""}`}
                onClick={() => handleLike(post.id)}
              >
                {post.liked ? "❤️ Liked" : "♡ Like"}
              </button>
            </div>
          </div>
        ))}

        {visiblePosts % 20 === 0 && visiblePosts < allPosts.length && (
          <div
            style={{
              gridColumn: "1 / -1",
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "20px",
            }}
          >
            <span
              onClick={loadMorePosts}
              style={{
                cursor: "pointer",
                fontWeight: "500",
                textDecoration: "none",
              }}
            >
              Show More
            </span>
          </div>
        )}
      </div>

      <DiscoverPeoplePage />
    </>
  );
};

export default HomePage;
