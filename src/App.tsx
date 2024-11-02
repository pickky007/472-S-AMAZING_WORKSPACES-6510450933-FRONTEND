import "./App.css";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';



function App() {
  return (

    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />}/>
        <Route path="/register" element={<RegisterPage />}/>
      </Routes>
    </Router>

  );
}

export default App;
