// src/App.tsx
import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Section } from "./components/section/Section";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <main style={{ flex: 1, padding: 20 }}>
          <Routes>
            <Route path="/" element={<Section />} />
            <Route path="/news-feed" element={<div>News Feed Page</div>} />
            <Route path="/kanbanboard" element={<Section />} />
            <Route path="/project-1" element={<div>Project 1</div>} />
            <Route path="/project-2" element={<div>Project 2</div>} />
            <Route path="/project-3" element={<div>Project 3</div>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;