import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './components/Home';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import BasicExample from './components/BasicExample';
import Chatbot from './components/Chatbot';
import Qr from './components/Qr';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminCreateEvent from './pages/AdminCreateEvent';
import EventCard from './components/EventCard';
import EventsList from './components/EventList';
import MlReport from './components/MlReport';
import ChakraEventCard from './components/chakra-comps/ChakraEventCard';

function App() {
  return (
    <ChakraProvider>
      <Router>
        <BasicExample />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/chat" element={<Chatbot />} />
          <Route path="/qr" element={<Qr />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin/create-event" element={<AdminCreateEvent />} />
          <Route path="/events" element={<ChakraEventCard />} /> // added to show harcoded events good for hackathon day maybe
          {/* <Route path="/events" element={<EventsList />} /> // true events */}
          <Route path="/ml-report" element={<MlReport />} />
        </Routes>

        {/* Optional Chakra component */}
        <EventCard />
      </Router>
    </ChakraProvider>
  );
}

export default App;
