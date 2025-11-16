import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UsefulLinkPage from "./Views/UsefulLinkPage";
import TestPage from "./Views/TestPage";

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<UsefulLinkPage />} />
          <Route path="/test" element={<TestPage />} />
        </Routes>
      </Router>
  );
}

export default App;
