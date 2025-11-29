import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import UsefulLinkPage from "./Views/UsefulLinkPage";
import TestPage from "./Views/TestPage";
import LoginPage from "./Views/LoginPage";
import AddShelterPage from "./Views/AddShelterPage";
import MainPostsPage from "./Views/MainPostsPage";
import ModeratorComplaintsPage from "./Views/ComplaintsPage";
import MenuBar from "./Components/MenuBar";
import ShelterPage from "./Views/ShelterPage";
import UserProfilePage from "./Views/UserPage";
import ResourcesPage from "./Views/ResourcesPage";
import VerificationsPage from "./Views/VerificationsPage";

function AppWrapper() {
    const location = useLocation();
    const hideMenuPaths = ["/"];

    const hideMenu = hideMenuPaths.includes(location.pathname);

    return (
        <>
            {!hideMenu && <MenuBar />}

            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/complaints" element={<ModeratorComplaintsPage />} />
                <Route path="/verifications" element={<VerificationsPage />} />
                <Route path="/main" element={<MainPostsPage />} />
                <Route path="/test" element={<TestPage />} />
                <Route path="/useful-links" element={<UsefulLinkPage />} />
                <Route path="/add-shelter" element={<AddShelterPage />} />
                <Route path="/profile/:userId" element={<UserProfilePage />} />
                <Route path="/shelter/:shelterId" element={<ShelterPage />} />
                <Route path="/resources/:shelterId" element={<ResourcesPage />} />

            </Routes>
        </>
    );
}

function App() {
    return (
        <Router>
            <AppWrapper />
        </Router>
    );
}

export default App;
