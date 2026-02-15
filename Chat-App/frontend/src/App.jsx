import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";

import Navbar from "./componemts/Navbar";

import HomePage from "./HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/Settingpage";
import ProfilePage from "./pages/ProfilePage";

import { useAuthStore } from "./stores/useAuth.store.js";


const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
 

  // 🔹 Check authentication on app load
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // 🔹 Show loader while checking authentication
  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div >
      <Navbar />

      <Routes>
        {/* Home - Protected */}
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to="/login" />}
        />
  
        {/* Signup - Only if NOT logged in */}
        <Route
          path="/signup"
          element={authUser ? <SignUpPage /> : <Navigate to="/" />}
        />

        {/* Login - Only if NOT logged in */}
        <Route
          path="/login"
          element={authUser ? <LoginPage /> : <Navigate to="/" />}
        />

        {/* Profile - Protected */}
        <Route
          path="/profile"
          element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
        />

        {/* Settings - Protected */}
        <Route
          path="/settings"
          element={authUser ? <SettingsPage /> : <Navigate to="/login" />}
        />
      </Routes>

      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default App;
