import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LandingPage.css";
import img from "../assets/taskImg1.png"
const LandingPage = () => {
  const navigate = useNavigate();

  return (<>
    <div className="landing-container">
    <img src={img} alt="landingPage" className="image"></img>
    <div>
      <h1 className="landing-title">NotInstagram</h1>
      <p className="landing-subtitle">Explore. Connect. Inspire.</p>
      <div className="landing-buttons">
        <button className="landing-btn" onClick={() => navigate("/login")}>
          Log In
        </button>
        <button className="landing-btn secondary" onClick={() => navigate("/signup")}>
          Sign Up
        </button>
      </div>
      </div>
    </div>
    </>
  );
};

export default LandingPage;
