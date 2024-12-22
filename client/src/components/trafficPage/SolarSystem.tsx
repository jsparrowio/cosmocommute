import { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import SolarSystemContent from "./SolarSystemContent";
import { planets } from "../../data/planets";
import * as THREE from "three";

interface SolarSystemProps {
  startPlanet: string;
}

export default function SolarSystem({ startPlanet }: SolarSystemProps) {
  const controlsRef = useRef<any>();
  const [isOrbiting, setIsOrbiting] = useState(true);

  useEffect(() => {
    if (startPlanet && controlsRef.current) {
      const startPlanetData = planets.find(p => p.name === startPlanet);

      if (startPlanetData) {
        const startPosition = new THREE.Vector3(startPlanetData.distance, 0, 0);

        controlsRef.current.target.copy(startPosition);
        controlsRef.current.object.position.set(startPosition.x, startPosition.y + 10, startPosition.z + 20);
        controlsRef.current.update();
        setIsOrbiting(false);
      }
    }
  }, [startPlanet]);

  const handlePlanetClick = (position: THREE.Vector3) => {
    if (controlsRef.current) {
      controlsRef.current.target.copy(position);
      controlsRef.current.object.position.set(position.x, position.y + 10, position.z + 20);
      controlsRef.current.update();
      setIsOrbiting(false);
    }
  };

  const toggleOrbiting = () => {
    setIsOrbiting((prev) => !prev);
  };

  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={toggleOrbiting}
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          zIndex: 1,
          padding: "10px",
          background: "white",
          border: "1px solid black",
          borderRadius: "5px",
          color: "black",
        }}
      >
        {isOrbiting ? "Stop Orbiting" : "Start Orbiting"}
      </button>
      <Canvas camera={{ position: [0, 10, 30], fov: 45 }} shadows style={{ width: "70vw", height: "60vh", border: "6px solid #1C3B5A" }}>
        <Suspense fallback={null}>
          <SolarSystemContent handlePlanetClick={handlePlanetClick} isOrbiting={isOrbiting} />
          <OrbitControls ref={controlsRef} />
        </Suspense>
      </Canvas>
    </div>
  );
}