import React from "react";
import "./App.css";
import { UserProfilePage } from "./pages/UserProfilePage";
import { AcyivityDeatail } from "./components/activity/ActivityDetail";


function App() {
  return (
    <div>
      <AcyivityDeatail
        title="Activity"
        description="Description"
        status="Status"
        assignee="@P.Num"
        startDate="Jan 1, 20:00"
        endDate="Jan 1, 21:00"
/>
    </div>
  );
}

export default App;
