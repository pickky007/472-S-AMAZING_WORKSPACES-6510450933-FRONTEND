// src/App.tsx
import React, { useState } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import { LoginPage } from "./pages/LoginPage";
import {ActivityDetail} from "./components/activity/ActivityDetail" 
import { Home } from "./pages/Home";

import { WorkspacePage } from "./pages/WorkspacePage";
import { RegisterPage } from "./pages/RegisterPage";

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <div style={{ display: 'flex' }}>
        {isAuthenticated && <Sidebar />}
        <main style={{ flex: 1}}>
          <Routes>
            <Route path="/" element={isAuthenticated ? <Home /> : <LoginPage setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/Home" element={<Home/>}/>
            <Route path="/news-feed" element={<div>News Feed Page</div>} />
            <Route path="/kanbanboard" element={<WorkspacePage/>} />
            <Route path="/project-1" element={<div>Project 1</div>} />
            <Route path="/project-2" element={<div>Project 2</div>} />
            <Route path="/project-3" element={<div>Project 3</div>} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/activityDetail" element={<ActivityDetail title="Se" description="เป็นการทำงานร่วมกัน" status="ยังไม่เสร็จ" assignee ="peet" startDate="10" endDate="11"/>}/>
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
