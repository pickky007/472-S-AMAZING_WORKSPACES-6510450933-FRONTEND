import "./App.css";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import {ActivityDetail} from "./components/activity/ActivityDetail" 


function App() {
  return (

    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />}/>
        <Route path="/register" element={<RegisterPage />}/>
        <Route path="/activityDetail" element={<ActivityDetail title="Se" description="เป็นการทำงานร่วมกัน" status="ยังไม่เสร็จ" assignee ="peet" startDate="10" endDate="11"/>}/>
      </Routes>
    </Router>

  );
}

export default App;
