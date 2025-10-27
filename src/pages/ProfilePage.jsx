import React, { useState } from "react";
import "/src/styles/ProfilePage.css";
import Header from "../components/Header";

function Profile() {

  const [selectedImage, setSelectedImage] = useState(null);
  const openImage = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const closeImage = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <Header />
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-info">
            <div className="profile-top">
              <h2 className="username">arya_thakkar</h2>
              <button className="edit-btn">Edit Profile</button>
            </div>
            <div className="profile-bio">
              <p><strong>Arya</strong></p>
              <p>Frontend Developer | React Enthusiast ⚛️</p>
              <a href="#">arya.dev</a>
            </div>
            <ul className="profile-stats">
              <li><strong>101</strong> posts</li>
              <li><strong>700M</strong> followers</li>
              <li><strong>7</strong> following</li>
            </ul>
          </div>
        </div>
        <div className="posts-grid">
          {Array.from({ length: 101 }).map((_, i) => (
            <img
              key={i}
              src={`https://picsum.photos/seed/${i + 1}/300/300`}
              alt={`Post ${i + 1}`}
              className="post-image"
              onClick={() => openImage(`https://picsum.photos/seed/${i + 1}/600/600`)}
            />
          ))}
        </div>
        {selectedImage && (
          <div className="image-modal" onClick={closeImage}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <img src={selectedImage} alt="Full size post" />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Profile;
