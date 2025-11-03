import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import './App.css';

import Home from './components/Home';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import BasicExample from './components/BasicExample';
import Chatbot from './components/Chatbot';
import EnhancedChatbot from './components/EnhancedChatbot';
import ChatPage from './pages/ChatPage';
import Qr from './components/Qr';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminCreateEvent from './pages/AdminCreateEvent';
import EventCard from './components/EventCard';
import EventsList from './components/EventList';
import MlReport from './components/MlReport';
import ChakraEventCard from './components/chakra-comps/ChakraEventCard';
import Barchart from './components/d3/Barchart';
import ChartPage from './components/d3/ChartPage';
import Leaflet from './components/maps/Leaflet';
import GeoLoc from './components/maps/GeoLoc';
import NearbyEvents from './components/maps/NearbyEvents';
import UserProfile from './components/UserProfile';
import EventDetails from './components/EventDetails';
import Leaderboard from './components/Leaderboard';
import NotificationCenter from './components/NotificationCenter';
import ImpactDashboard from './components/ImpactDashboard';
import RewardsSystem from './components/RewardsSystem';
import EventGallery from './components/EventGallery';
import ResourceLibrary from './components/ResourceLibrary';
import TeamManagement from './components/TeamManagement';
import EventFeedback from './components/EventFeedback';
import WeatherPage from './pages/WeatherPage';
import SponsorShowcase from './components/SponsorShowcase';
import BottomNav from './components/BottomNav';
import './App.css';
function App() {
  return (
    <ChakraProvider>
      <Router>
        <BasicExample />
        <Routes>
          <Route path="/" element={<Home />} className="bg-red-400" />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/qr" element={<Qr />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin/create-event" element={<AdminCreateEvent />} />
          <Route path="/events" element={<NearbyEvents />} /> // added to show harcoded events good for hackathon day maybe
          {/* <Route path="/events" element={<ChakraEventCard />} /> // added to show harcoded events good for hackathon day maybe */}
          {/* <Route path="/events" element={<EventsList />} /> // true events */}
          <Route path="/charts" element={<ChartPage />} />
          <Route path="/ml-report" element={<MlReport />} />
          <Route path="/maps" element={<GeoLoc />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/event/:eventId" element={<EventDetails />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/notifications" element={<NotificationCenter />} />
          <Route path="/impact" element={<ImpactDashboard />} />
          <Route path="/rewards" element={<RewardsSystem />} />
          <Route path="/gallery" element={<EventGallery />} />
          <Route path="/resources" element={<ResourceLibrary />} />
          <Route path="/teams" element={<TeamManagement />} />
          <Route path="/feedback" element={<EventFeedback />} />
          <Route path="/weather" element={<WeatherPage />} />
          <Route path="/sponsors" element={<SponsorShowcase />} />
        </Routes>

        {/* Optional Chakra component */}
        <EventCard />
        
        {/* Enhanced Chatbot - Global floating widget */}
        <EnhancedChatbot />
        
        {/* Mobile Bottom Navigation */}
        <BottomNav />
      </Router>
    </ChakraProvider>
  );
}

export default App;
