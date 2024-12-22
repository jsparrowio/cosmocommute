import { Stars } from "@react-three/drei";
import Planet from "./Planet";
import Sun from "./Sun";
import Lighting from "./Lighting";
import Background from "./Background";
import Moon from "./Moon"; // Import the Moon component
import { planets } from "../../data/planets";
import * as THREE from "three";

interface SolarSystemContentProps {
  handlePlanetClick: (position: THREE.Vector3) => void;
  isOrbiting: boolean;
}

export default function SolarSystemContent({ handlePlanetClick, isOrbiting }: SolarSystemContentProps) {
  return (
    <>
      <Background />
      <Lighting />
      <Sun />
      {planets.map((planet, index) => (
        <Planet
          key={planet.name}
          name={planet.name}
          size={planet.size}
          distance={planet.distance}
          initialAngle={(index / planets.length) * 2 * Math.PI + Math.random() * Math.PI}
          speed={planet.speed}
          onClick={handlePlanetClick}
          isOrbiting={isOrbiting}
        >
          {planet.name === "Earth" && <Moon />} {/* Add the Moon component as a child of Earth */}
        </Planet>
      ))}
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
    </>
  );
}