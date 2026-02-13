import React, { useEffect } from "react";
import Navbar from "./componemts/Navbar";
import { Route, Routes } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import Settingpage from "./pages/Settingpage";
import ProfilePage from "./pages/ProfilePage";
import HomePage from "./HomePage";
import { useAuthStore } from "./stores/useAuth.store";

const App = () => {
  const {authUser,checkAuth}=useAuthStore()

  useEffect(() =>{
    checkAuth()
  },[checkAuth])

  console.log({authUser});
  
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/settings" element={<Settingpage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </div>
  );
};

export default App;
