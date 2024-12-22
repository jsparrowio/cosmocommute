import { useRef } from "react";
import { useLoader, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface PlanetProps {
  name: string;
  size: number;
  distance: number;
  initialAngle: number;
  speed: number;
  onClick: (position: THREE.Vector3) => void;
  isOrbiting: boolean;
  children?: React.ReactNode;
}

export default function Planet({ name, size, distance, initialAngle, speed, onClick, isOrbiting, children }: PlanetProps) {
  const texture = useLoader(THREE.TextureLoader, `/textures/${name.toLowerCase()}.jpg`);
  const ringTexture = name === "Saturn" ? useLoader(THREE.TextureLoader, "/textures/saturn_ring.png") : null;

  const groupRef = useRef<THREE.Group>(null);
  const angleRef = useRef(initialAngle);

  useFrame(() => {
    if (groupRef.current) {
      if (isOrbiting) {
        angleRef.current += speed;
        groupRef.current.position.x = distance * Math.cos(angleRef.current);
        groupRef.current.position.z = distance * Math.sin(angleRef.current);
      }
    }
  });

  const handleClick = () => {
    if (groupRef.current) {
      onClick(groupRef.current.position);
    }
  };

  return (
    <group ref={groupRef} onClick={handleClick} rotation={[THREE.MathUtils.degToRad(27), 0, 0]}>
      <mesh>
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial map={texture} />
      </mesh>
      {name === "Saturn" && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[size * 1.2, size * 2, 64]} />
          <meshBasicMaterial map={ringTexture} side={THREE.DoubleSide} transparent />
        </mesh>
      )}
      {children}
    </group>
  );
}