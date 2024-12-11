import { Outlet } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';
//import Header from './components/Header';
///import Footer from './components/Footer';

// function to render entire React single page application
function App() {
  const location = useLocation();
  // establishes about me as home page
  const [currentPage, setPage] = useState("About Me")
  useEffect(() => {
    if (location.pathname === '/') {
      setPage("Home");
    } else if (location.pathname === '/login') {
      setPage("Login");
    } else if (location.pathname === '/dashboard') {
      setPage("Dashboard");
    } else if (location.pathname === '/weather') {
      setPage("Weather");
    } else if (location.pathname === '/traffic') {
      setPage("Traffic");
    }
    document.title = `${currentPage} | CosmoCommute`;
  });
  // returns the entire single page site, outlet based on what the user chooses
  return (
    <>
     {/* <Header /> */}
      <Outlet />
     {/* <Footer /> */}
    </>
  );
}

export default App;