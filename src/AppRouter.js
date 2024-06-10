import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home.jsx";
import ChatPage from "./Pages/Chat/Chat.jsx";
import RecognitionPage from "./Pages/Recognition/Recognition.jsx";
import TipsPage from "./Pages/Tips/Tips.jsx";




function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Chat" element={<ChatPage />} />
        <Route path="/Recognition" element={<RecognitionPage />} />
        <Route path="/Tips" element={<TipsPage/>} />
      </Routes>
    </Router>
  );
}

export default AppRouter;