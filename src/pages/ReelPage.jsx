import React, { useState, useEffect } from "react";
import "/src/styles/ReelPage.css";

const PEXELS_API_KEY = "sQlqnEUF0wUiRDguKcKat7UIeZpiL9QYytFCUrior6auUzIdqRr0z5K0";


const getLowQualityVideo = (videoFiles) => {
  return [...videoFiles].sort((a, b) => a.width - b.width)[0];
};

const getHighQualityVideo = (videoFiles) => {
  return [...videoFiles].sort((a, b) => b.width - a.width)[0];
};

const ReelsPage = () => {
  const [reels, setReels] = useState([]);
  const [selectedReel, setSelectedReel] = useState(null);

  useEffect(() => {
    async function fetchReels() {
      try {
        const res = await fetch(
          "https://api.pexels.com/videos/search?query=people&orientation=portrait&per_page=20",
          {
            headers: { Authorization: PEXELS_API_KEY },
          }
        );
        const data = await res.json();
        setReels(data.videos || []);
      } catch (error) {
        console.error("Error fetching reels:", error);
      }
    }
    fetchReels();
  }, []);

  return (
    <div className="reels-page">
      <h2 className="reels-title">Explore Reels</h2>

      <div className="reels-grid">
        {reels.map((reel) => (
          <div
            key={reel.id}
            className="reel-card"
            onClick={() => setSelectedReel(reel)}
          >
            <video
              src={getLowQualityVideo(reel.video_files)?.link}
              poster={reel.image}
              className="reel-thumb"
              muted
              loop
              playsInline
              preload="metadata"
            />
          </div>
        ))}
      </div>

      {selectedReel && (
        <div className="reel-modal" onClick={() => setSelectedReel(null)}>
          <div
            className="reel-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              src={getHighQualityVideo(selectedReel.video_files)?.link}
              className="reel-video"
              controls
              autoPlay
              loop
              playsInline
            />

            <div className="reel-details">
              <h3>Reel by {selectedReel.user?.name || "Unknown"}</h3>
              <div className="reel-actions">
                <button className="like-btn">❤️ Like</button>
                <button className="share-btn">🔗 Share</button>
              </div>
            </div>

            <button className="close-btn" onClick={() => setSelectedReel(null)}>
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReelsPage;
