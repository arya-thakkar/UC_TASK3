import React, { useState, useEffect } from "react";
import "/src/styles/ProfilePage.css";
import dhoni from "../assets/mahi.jpg"


function Profile() {
  const [selectedPost, setSelectedPost] = useState(null);
  const [funnyComments, setFunnyComments] = useState([]);

  const fetchFunnyComments = async (count = 5) => {
    try {
      const comments = [];
      for (let i = 0; i < count; i++) {
        const res = await fetch("https://v2.jokeapi.dev/joke/Any?type=single");
        const data = await res.json();
        comments.push(data.joke);
      }
      setFunnyComments(comments);
    } catch (error) {
      console.error("Error fetching funny comments:", error);
    }
  };

  const openImage = async (post) => {
    setSelectedPost(post);
    await fetchFunnyComments(); 
  };

  const closeImage = () => {
    setSelectedPost(null);
  };

  const mockPosts = Array.from({ length: 200 }).map((_, i) => ({
    id: i + 1,
    username: "arya_thakkar",
    image: `https://picsum.photos/seed/${i + 1}/600/600`,
    caption: "Enjoying the moment! 🌅",
    likes: Math.floor(Math.random() * 500),
    comments: ["Amazing shot! 🔥", "So cool!", "Looks awesome 😍"],
  }));

  return (
    <>
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-info">
            <div className="profile-top">
              <img
                src={dhoni}
                alt="profile"
                className="profile-picture"
              />
              <h2 className="username">arya_thakkar</h2>
              <button className="edit-btn">
                <span className="edit-text">Edit Profile</span>
                <span className="edit-text-mobile">Edit</span>
              </button>
            </div>

            <div className="profile-bio">
              <p><strong>Arya</strong></p>
              <p>ThalaPaglu Final Boss | Thala For A Reason </p>
              <a href="#">Mahi</a>
            </div>

            <ul className="profile-stats">
              <li><strong>12</strong> posts</li>
              <li><strong>700M</strong> followers</li>
              <li><strong>7</strong> following</li>
            </ul>
          </div>
        </div>

        <div className="posts-grid">
          {mockPosts.map((post) => (
            <img
              key={post.id}
              src={post.image}
              alt={`Post ${post.id}`}
              className="post-image"
              onClick={() => openImage(post)}
            />
          ))}
        </div>


        {selectedPost && (
          <div className="image-modal" onClick={closeImage}>
            <div
              className="modal-content"
              onClick={(e) => e.stopPropagation()}
            >

              <div className="modal-image-container">
                <img
                  src={selectedPost.image}
                  alt="Full size post"
                  className="modal-image"
                />
              </div>
              <div className="modal-details">
                <div className="modal-header">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/1/14/Mahendra_Singh_Dhoni.jpg"
                    alt="avatar"
                    className="avatar"
                  />
                  <span className="username">{selectedPost.username}</span>
                </div>

                <div className="modal-caption">
                  <p>{selectedPost.caption}</p>
                </div>

                <div className="modal-comments scrollable-comments">
                  {[...selectedPost.comments, ...funnyComments].map(
                    (comment, i) => (
                      <p key={i} className="comment">
                        {comment}
                      </p>
                    )
                  )}
                </div>

                <div className="modal-actions">
                  <button className="like-btn">❤️ Like</button>
                  <button className="comment-btn">💬 Comment</button>
                  <button className="share-btn">↗️ Share</button>
                </div>

                <div class Name="add-comment">
                  <input type="text" placeholder="Add a comment..." />
                  <button>Post</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Profile;
