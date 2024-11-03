// src/App.tsx
import React, { useState } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import {ActivityDetail} from "./components/activity/ActivityDetail" 

import { WorkspacePage } from "./pages/WorkspacePage";
import { AllProject } from "./pages/AllProject";

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(true);

  return (

    <Router>
      <div style={{ display: 'flex' }}>
        {isAuthenticated && <Sidebar />}
        <main style={{ flex: 1, padding: 20 }}>
          <Routes>
            <Route path="/" element={isAuthenticated ? <AllProject /> : <LoginPage setIsAuthenticated={setIsAuthenticated} />} />
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
