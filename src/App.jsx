import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Profile from './pages/ProfilePage';
import DiscoverPeoplePage from './components/DiscoverPage';
import HomePage from './pages/HomePage';
import Stories from './components/Stories';
import PostFeed from './pages/PostPage';

function App() {
  return (
    <PostFeed />
  );
}

export default App;
