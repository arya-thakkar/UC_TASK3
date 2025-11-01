import React, { useEffect, useState } from "react";
import "/src/styles/ExplorePage.css";
import DiscoverPeoplePage from "../components/DiscoverPage";

const TMDB_KEY = "1d2b59b501725f87bc90a44ba50f860e";
const NEWS_KEY = "2cc6c23d127944c4a9ecb6499f731564";

const ExplorePage = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const celebRes = await fetch(
          `https://api.themoviedb.org/3/person/popular?api_key=${TMDB_KEY}`
        );
        const celebData = await celebRes.json();

        const celebPosts = celebData.results.slice(0, 100).map((c, i) => ({
          id: `celeb-${i}`,
          username: c.name,
          image: `https://image.tmdb.org/t/p/w500${c.profile_path}`,
          caption: `Latest update from ${c.name}`,
          likes: Math.floor(Math.random() * 1000),
          comments: Math.floor(Math.random() * 300),
          type: "celeb",
        }));

        const newsRes = await fetch(
          `https://newsapi.org/v2/top-headlines?language=en&pageSize=10&apiKey=${NEWS_KEY}`
        );
        const newsData = await newsRes.json();

        const newsPosts = newsData.articles.map((n, i) => ({
          id: `news-${i}`,
          username: n.source.name || "Global News",
          image: n.urlToImage || `https://picsum.photos/500/500?random=${i}`,
          caption: n.title,
          likes: Math.floor(Math.random() * 1000),
          comments: Math.floor(Math.random() * 300),
          url: n.url,
          type: "news",
        }));

        const combined = [...celebPosts, ...newsPosts].sort(() => 0.5 - Math.random());
        setPosts(combined);
      } catch (err) {
        console.error(err);
      }
    }

    fetchData();
  }, []);

  const handleLike = (id) => {
    setPosts((prev) =>
      prev.map((post) => (post.id === id ? { ...post, likes: post.likes + 1 } : post))
    );
  };

  return (
      <>
      <DiscoverPeoplePage/>
    <div className="explore-container">
      <div className="explore-grid">
        {posts.map((post) => (
            <div
            className="explore-card"
            key={post.id}
            onClick={() => setSelectedPost(post)}
          >
            <img src={post.image} alt={post.username} />
            <div className="overlay">
              <span>❤️ {post.likes}</span>
              <span>💬 {post.comments}</span>
            </div>
          </div>
        ))}
      </div>

      {selectedPost && (
        <div className="modal" onClick={() => setSelectedPost(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={selectedPost.image} alt="post" className="modal-img" />
            <div className="modal-details">
              <h2>{selectedPost.username}</h2>
              <p>{selectedPost.caption}</p>
              <div className="modal-actions">
                <button onClick={() => handleLike(selectedPost.id)}>❤️ {selectedPost.likes}</button>
                <button>💬 Comment</button>
                <button>🔗 Share</button>
              </div>
              {selectedPost.url && (
                  <a
                  href={selectedPost.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="read-more"
                  >
                  Read full article →
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default ExplorePage;
