// src/App.tsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import { LoginPage } from './pages/LoginPage';
import { Home } from './pages/Home';
import { WorkspacePage } from './pages/WorkspacePage';
import { User } from './models/User';
import { RegisterPage } from './pages/RegisterPage';
import { Workspace } from './models/Workspace';
import { IUserLogin } from './types/user.types';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<IUserLogin | null>(null);
  const [workspaceTo, setWorkspaceTo] = useState<Workspace | null>(null);

  return (
    <Router>
      <div style={{ display: 'flex' }}>
        {isAuthenticated && <Sidebar user={user} setIsAuthenticated={setIsAuthenticated} />}
        <main style={{ flex: 1 }}>
          <Routes>
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <Home setWorkspaceTo={setWorkspaceTo} user={user!} />
                ) : (
                  <LoginPage
                    setUser={setUser}
                    setIsAuthenticated={setIsAuthenticated}
                  />
                )
              }
            />
            <Route
              path="/Home"
              element={<Home setWorkspaceTo={setWorkspaceTo} user={user!} />}
            />
            <Route path="/news-feed" element={<div>News Feed Page</div>} />
            <Route
              path="/kanbanboard"
              element={
                workspaceTo && user ? (
                  <WorkspacePage workspaceTo={workspaceTo} user={user!} />
                ) : (
                  <Navigate to="/" replace /> // เปลี่ยนเส้นทางไปยังหน้า Login
                )
              }
            />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
