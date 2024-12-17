
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import WeatherPage from './pages/WeatherPage';
import TrafficPage from './pages/TrafficPage';


// function to render entire React single page application
const App = () => {

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/Dashboard" element={<DashboardPage />} />
        <Route path="/Weather" element={<WeatherPage />} />
        <Route path="/Traffic" element={<TrafficPage />} />
      </Routes>
      <Footer />
    </Router>
  )
};


export default App;