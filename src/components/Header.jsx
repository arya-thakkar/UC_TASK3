import React, { useEffect, useRef } from 'react';
import './../styles/Header.css';
import { FaHome, FaUser, FaPlusSquare } from 'react-icons/fa';
import { FiCompass } from 'react-icons/fi';
import { FaVideo } from 'react-icons/fa';
import { Link } from 'react-router-dom'; 

const Header = () => {
  const headerRef = useRef(null);

  return (
    <header className="header" ref={headerRef}>
      <h1 className="header-title">NotInstagram</h1>
      <nav className="header-nav-container">
        <ul className="header-nav">
          <li className="header-nav-item">
            <Link to="/home" className="nav-link">
              <FaHome className="nav-icon" />
              <span className="home">Home</span>
            </Link>
          </li>
          <li className="header-nav-item">
            <Link to="/profile" className="nav-link">
              <FaUser className="nav-icon" />
              <span className="profile">Profile</span>
            </Link>
          </li>
          <li className="header-nav-item">
            <Link to="/post" className="nav-link">
              <FaPlusSquare className="nav-icon" />
              <span className="post">Post</span>
            </Link>
          </li>
          <li className="header-nav-item">
            <Link to="/explore" className="nav-link">
              <FiCompass className="nav-icon" />
              <span className="login">Explore</span>
            </Link>
          </li>
          <li className="header-nav-item">
            <Link to="/reel" className="nav-link">
              <FaVideo className="nav-icon" />
              <span className="signup">Reels</span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
