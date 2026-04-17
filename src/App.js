import React from "react";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Cursor from "./components/Cursor";
import Header from "./components/Header";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import PlatformsPage from "./pages/PlatformsPage";
import ProgressPage from "./pages/ProgressPage";

function ProtectedRoute({ children }) {
  const isAuthenticated = true;
  return isAuthenticated ? children : <Navigate to="/" replace />;
}

function App() {
  return (
    <Router>
      <Cursor />
      <Routes>
        <Route path="/" element={<LoginPage />} />

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

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;