import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes,Link } from 'react-router-dom';
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import Navbar from './components/Navbar';
import { AuthProvider } from './context/AuthContext';


function App() {
  return (
    
    <BrowserRouter>
      {/* Liens temporaires pour tester les routes */}
      
     <Navbar/>
      {/* Routes de l'application */}
      <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
export default App;
