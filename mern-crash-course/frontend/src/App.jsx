import React from "react";
import { Box,useColorModeValue } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import HomePages from "./pages/HomePages";
import CreatePage from "./pages/CreatePage";
import NavBar from "./components/NavBar";

const App = () => {
  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <NavBar />


      <Routes>
        <Route path="/" element={<HomePages />} />
        <Route path="/create" element={<CreatePage />} />
      </Routes>
    </Box>
  );
};

export default App;
