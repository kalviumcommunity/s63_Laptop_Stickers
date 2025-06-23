import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import LandingPage from "./components/LandingPage";
import Auth from "./components/Auth";
import Profile from "./components/Profile";
import { AuthProvider } from "./context/AuthContext";
import "./App.css";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: '#333',
                color: '#fff',
                border: '1px solid #8b5cf6',
              },
              success: {
                iconTheme: {
                  primary: '#8b5cf6',
                  secondary: '#fff',
                },
              },
              error: {
                iconTheme: {
                  primary: '#ff4b4b',
                  secondary: '#fff',
                },
              },
            }}
          />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
