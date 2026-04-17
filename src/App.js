import React, { useEffect } from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Cursor from "./components/Cursor";
import Header from "./components/Header";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import PlatformsPage from "./pages/PlatformsPage";
import ProgressPage from "./pages/ProgressPage";

// Protected Route Component
function ProtectedRoute({ children }) {
  const isAuthenticated = true;
  return isAuthenticated ? children : <Navigate to="/" replace />;
}

function App() {
  // Sync platform data to localStorage whenever it changes
  useEffect(() => {
    const syncData = () => {
      const platformData = localStorage.getItem("platformData");
      if (platformData) {
        // already stored
      }
    };
    syncData();
  }, []);

  return (
  <Router>
    <Cursor />
    <Routes>
      {/* Public Route */}
      <Route path="/" element={<LoginPage />} />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <>
              <Header />
              <DashboardPage />
            </>
          </ProtectedRoute>
        }
      />

      <Route
        path="/platforms"
        element={
          <ProtectedRoute>
            <>
              <Header />
              <PlatformsPage />
            </>
          </ProtectedRoute>
        }
      />

      <Route
        path="/progress"
        element={
          <ProtectedRoute>
            <>
              <Header />
              <ProgressPage />
            </>
          </ProtectedRoute>
        }
      />

      {/* ✅ ADD THIS LINE HERE */}
      <Route path="*" element={<Navigate to="/" />} />
      
    </Routes>
  </Router>
);
}
export default App;