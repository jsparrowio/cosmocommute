// import React from 'react';

// const TrafficPage: React.FC =() => {
//     return (
//         <div>
//             <p>traffic</p>
//         </div>
//     )
// };

// export default TrafficPage;

import { useState } from "react";
import Dropdown from "../components/trafficPage/Dropdown";
import SolarSystem from "../components/trafficPage/SolarSystem";
import { planets } from "../data/planets";
import { travelTimes } from "../data/travelTimes";

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
  const [startPlanet, setStartPlanet] = useState<string>("");
  const [endPlanet, setEndPlanet] = useState<string>("");

  const planetNames = planets.map((planet) => planet.name);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>CosmoCommute 🌌</h1>
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
  );
}

export default TrafficPage;