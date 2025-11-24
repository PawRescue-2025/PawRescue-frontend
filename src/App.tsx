import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UsefulLinkPage from "./Views/UsefulLinkPage";
import TestPage from "./Views/TestPage";
import LoginPage from "./Views/LoginPage";
import AddShelterPage from "./Views/AddShelterPage";
import MainPostsPage from "./Views/MainPostsPage";
import ModeratorComplaintsPage from "./Views/ComplaintsPage";

function App() {
  return (
      <Router>
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/complaints" element={<ModeratorComplaintsPage />} />
            <Route path="/main" element={<MainPostsPage />} />
            <Route path="/test" element={<TestPage />} />
            <Route path="/useful-links" element={<UsefulLinkPage />} />
            <Route path="/add-shelter" element={<AddShelterPage />} />
        </Routes>
      </Router>
  );
}

export default App;
