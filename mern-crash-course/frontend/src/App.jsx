import React from "react";
import { Box } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import HomePages from "./pages/HomePages";
import CreatePage from "./pages/CreatePage";
import NavBar from "./components/NavBar";

const App = () => {
  return (
    <Box minH="100vh">
      <NavBar />

      
      <Routes>
        <Route path="/" element={<HomePages />} />
        <Route path="/create" element={<CreatePage />} />
      </Routes>
    </Box>
  );
};

export default App;
