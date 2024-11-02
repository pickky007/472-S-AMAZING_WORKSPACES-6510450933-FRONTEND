import React from "react";
import "./App.css";
import { UserProfilePage } from "./pages/UserProfilePage";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>User Management System</h1>
      </header>
      <main className="App-content">
        <UserProfilePage />
      </main>
    </div>
  );
}
export default App;
