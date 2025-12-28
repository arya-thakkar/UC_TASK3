import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import Profile from "./pages/ProfilePage";
import PostFeed from "./pages/PostPage";
import LogInForm from "./pages/LogINForm";
import SignupForm from "./pages/SignInForm";
import Explore from "./pages/ExplorePage";
import ReelsPage from "./pages/ReelPage";
import LandingPage from "./pages/LandingPage";
import { useState } from "react";
import "./styles/App.css";
import ProtectedRoute from "./components/ProtectedRoutes";

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
                <Route path="/home" element={
                  <ProtectedRoute>
                    <HomePage />
                  </ProtectedRoute>
                } />
                <Route path="/profile" element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } />
                <Route path="/post" element={
                  <ProtectedRoute>
                    <PostFeed />
                  </ProtectedRoute>
                } />
                <Route path="/explore" element={
                  <ProtectedRoute>
                    <Explore />
                  </ProtectedRoute>
                } />
                <Route path="/reel" element={
                  <ProtectedRoute>
                    <ReelsPage />
                  </ProtectedRoute>
                } />
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