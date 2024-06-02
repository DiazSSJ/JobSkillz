import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home.jsx";
import ChatPage from "./Pages/Chat/Chat.jsx";



function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Chat" element={<ChatPage />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;