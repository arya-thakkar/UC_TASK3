import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import Profile from "./pages/ProfilePage";
import PostFeed from "./pages/PostPage";
import LogInForm from "./pages/LogInForm";
import SignupForm from "./pages/SignInForm";
import Explore from "./pages/ExplorePage";
import ReelsPage from "./pages/ReelPage";
import LandingPage from "./pages/LandingPage";
import { useState } from "react";
import "./styles/App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <div style={{ minHeight: "100vh" }}>

        {isAuthenticated && <Header />}

        <div className="main-content">
          <Routes>
   
            <Route path="/" element={<LandingPage />} />
            <Route
              path="/login"
              element={<LogInForm setIsAuthenticated={setIsAuthenticated} />}
            />
            <Route
              path="/signup"
              element={<SignupForm setIsAuthenticated={setIsAuthenticated} />}
            />

      
            {isAuthenticated ? (
              <>
                <Route path="/home" element={<HomePage />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/post" element={<PostFeed />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/reel" element={<ReelsPage />} />
              </>
            ) : (
              <>
                <Route path="/home" element={<Navigate to="/" replace />} />
                <Route path="/profile" element={<Navigate to="/" replace />} />
                <Route path="/post" element={<Navigate to="/" replace />} />
                <Route path="/explore" element={<Navigate to="/" replace />} />
                <Route path="/reel" element={<Navigate to="/" replace />} />
              </>
            )}

  
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
