import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import BasicExample from './components/BasicExample';
import Chatbot from './components/Chatbot';
import Qr from './components/Qr';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <Router>
      <BasicExample />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path='/chat' element={<Chatbot />} />
        <Route path='/qr' element={<Qr />}/>
        <Route path='/admin-login'element={<AdminLogin />} />
        <Route path='/admin-dashboard' element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
