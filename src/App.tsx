import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UsefulLinkPage from "./Views/UsefulLinkPage";

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<UsefulLinkPage />} />
        </Routes>
      </Router>
  );
}

export default App;
