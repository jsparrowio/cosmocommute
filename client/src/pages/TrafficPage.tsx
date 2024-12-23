import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Dropdown from "../components/trafficPage/Dropdown";
import SolarSystem from "../components/trafficPage/SolarSystem";
import { planets } from "../data/planets";
import { travelTimes } from "../data/travelTimes";
import { Card } from 'antd';
import Auth from '../utils/auth';

// Define styles using a TypeScript interface
interface Styles {
  container: React.CSSProperties;
  title: React.CSSProperties;
  resultText: React.CSSProperties;
}

// Styles object
const styles: Styles = {
  container: { padding: "2rem", fontFamily: "Arial, sans-serif" },
  title: { textAlign: "center" },
  resultText: { marginTop: "1.5rem", fontWeight: "bold" },
};

// Utility to calculate the travel route message
const calculateRoute = (startPlanet: string, endPlanet: string): string => {
  if (!startPlanet || !endPlanet) {
    return "Please select your starting point and destination to calculate a route.";
  }
  if (startPlanet === endPlanet) {
    return `You're already on ${startPlanet}. No travel needed! 🚀`;
  }

  const startIdx = planets.findIndex((planet) => planet.name === startPlanet);
  const endIdx = planets.findIndex((planet) => planet.name === endPlanet);

  // Handle edge case where indices aren't found
  if (startIdx === -1 || endIdx === -1) {
    return "An error occurred while calculating the route. 🌌";
  }

  const time = travelTimes[startIdx][endIdx];
  return `The route from ${startPlanet} to ${endPlanet} will take approximately ${time} days. 🚀 Enjoy your trip! 🌌`;
};

function TrafficPage(): JSX.Element {
  const [loginCheck, setLoginCheck] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = Auth.loggedIn();
    if (loggedIn === true) {
      setLoginCheck(true);
    } else {
      Auth.logout();
      navigate('/Login');
    }
  }, []);

  const [startPlanet, setStartPlanet] = useState<string>("");
  const [endPlanet, setEndPlanet] = useState<string>("");

  const planetNames = planets.map((planet) => planet.name);

  return (
    <div style={{ 'display': 'flex', 'justifyContent': 'center', 'alignItems': 'center', 'margin': '3rem' }}>
      {loginCheck === true &&
        <Card bordered={true} style={{ width: 'fit-content', 'backgroundColor': '#D9EAF7' }}>
          <div style={styles.container}>
            <h1 style={styles.title}>Traffic🌌</h1>
            <Dropdown
              label="Starting Planet"
              options={planetNames}
              value={startPlanet}
              onChange={setStartPlanet}
            />
            <Dropdown
              label="Destination Planet"
              options={planetNames}
              value={endPlanet}
              onChange={setEndPlanet}
            />
            <div style={styles.resultText}>
              {calculateRoute(startPlanet, endPlanet)}
            </div>
            <SolarSystem startPlanet={startPlanet} />
          </div>
        </Card>
      }
      {loginCheck === false &&
        <Card bordered={true} style={{ width: 300 }}>
          <p>
            You must be logged in to view this page!
            <br />
            Redirecting...
          </p>
        </Card>
      }
    </div>
  );
}

export default TrafficPage;