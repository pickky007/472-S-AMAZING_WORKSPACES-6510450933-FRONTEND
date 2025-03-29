// src/App.tsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import { LoginPage } from './pages/LoginPage';
import { Home } from './pages/Home';
import { WorkspacePage } from './pages/WorkspacePage';
import { RegisterPage } from './pages/RegisterPage';
import { ChatPage } from './pages/ChatPage'; // Import the new ChatPage
import { IUserLogin } from './types/user.types';
import { Workspace } from './models/Workspace';
import { CalendarPage } from './pages/CalendarPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<IUserLogin | null>(null);
  const [workspaceTo, setWorkspaceTo] = useState<Workspace | null>(null);
  const [showHiddenMenu, setShowHiddenMenu] = useState(false); // เพิ่ม state สำหรับ showHiddenMenu
  
  // ฟังก์ชันสำหรับ handle การคลิกที่เมนู Home
  const handleHomeClick = () => {
    setShowHiddenMenu(false); // ซ่อนเมนู Chat และ Kanbanboard เมื่อคลิก Home
  };

  return (
    <Router>
      <div style={{ display: 'flex' }}>
        {isAuthenticated && (
          <Sidebar 
            user={user} 
            setIsAuthenticated={setIsAuthenticated} 
            showHiddenMenu={showHiddenMenu} 
            onHomeClick={handleHomeClick} // ส่งฟังก์ชันไปที่ Sidebar
          />
        )}
        <main style={{ flex: 1 }}>
          <Routes>
            <Route
              path="/"
              element={isAuthenticated ? <Home setWorkspaceTo={setWorkspaceTo} user={user!} setShowHiddenMenu={setShowHiddenMenu} /> : <LoginPage setUser={setUser} setIsAuthenticated={setIsAuthenticated} />}
            />
            <Route
              path="/home"
              element={<Home setWorkspaceTo={setWorkspaceTo} user={user!} setShowHiddenMenu={setShowHiddenMenu} />}
            />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/kanbanboard" element={workspaceTo ? <WorkspacePage workspaceTo={workspaceTo} user={user!} /> : <Navigate to="/" replace />} />
            <Route path="/chat" element={workspaceTo ? <ChatPage workspace={workspaceTo} user={user!} /> : <Navigate to="/" replace />} /> {/* Add the new chat route */}
            <Route path="/calendar" element={workspaceTo ? <CalendarPage workspace={workspaceTo} user={user!} /> : <Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
