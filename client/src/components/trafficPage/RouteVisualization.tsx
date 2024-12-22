import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import { planets } from "../../data/planets";

interface RouteVisualizationProps {
  startPlanet: string;
  endPlanet: string;
  isVisible: boolean;
}

export default function RouteVisualization({ startPlanet, endPlanet, isVisible }: RouteVisualizationProps) {
  const lineRef = useRef<THREE.Line>(null);
  const { scene } = useThree();

  useEffect(() => {
    if (startPlanet && endPlanet && lineRef.current) {
      const startPlanetData = planets.find(p => p.name === startPlanet);
      const endPlanetData = planets.find(p => p.name === endPlanet);

      if (startPlanetData && endPlanetData) {
        const startPosition = new THREE.Vector3(startPlanetData.distance, 0, 0);
        const endPosition = new THREE.Vector3(endPlanetData.distance, 0, 0);

        const points = [startPosition, endPosition];
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        lineRef.current.geometry = geometry;
        lineRef.current.computeLineDistances(); // Required for dashed lines to work
      }
    }
  }, [startPlanet, endPlanet]);

  useEffect(() => {
    if (lineRef.current) {
      scene.add(lineRef.current);
      return () => {
        if (lineRef.current) {
          scene.remove(lineRef.current);
        }
      };
    }
  }, [scene]);

  return lineRef.current ? (
    <primitive object={lineRef.current} visible={isVisible} />
  ) : null;
}