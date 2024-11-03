// src/App.tsx
import React, { useState } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Section } from "./components/section/Section";
import Sidebar from "./components/Sidebar";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <div style={{ display: 'flex' }}>
        {isAuthenticated && <Sidebar />}
        <main style={{ flex: 1, padding: 20 }}>
          <Routes>
            <Route path="/" element={isAuthenticated ? <Section /> : <LoginPage setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/news-feed" element={<div>News Feed Page</div>} />
            <Route path="/kanbanboard" element={<Section />} />
            <Route path="/project-1" element={<div>Project 1</div>} />
            <Route path="/project-2" element={<div>Project 2</div>} />
            <Route path="/project-3" element={<div>Project 3</div>} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;