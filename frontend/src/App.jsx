import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import BasicExample from './components/BasicExample';
import Chatbot from './components/Chatbot';
import Qr from './components/Qr';

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
      </Routes>
    </Router>
  );
}

export default App;
