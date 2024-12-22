import { useLoader, useFrame } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

export default function Moon() {
  const moonTexture = useLoader(THREE.TextureLoader, "/textures/moon.jpg");
  const meshRef = useRef<THREE.Mesh>(null);
  const angleRef = useRef(0);

  useFrame(() => {
    if (meshRef.current) {
      angleRef.current += 0.01; // Adjust the speed of the moon's orbit
      const x = 3 * Math.cos(angleRef.current); // Adjust the distance from Earth
      const z = 5 * Math.sin(angleRef.current);
      meshRef.current.position.set(x, 0, z);
    }
  });

  return (
    <mesh ref={meshRef} castShadow receiveShadow>
      <Sphere args={[0.27, 32, 32]}>
        <meshStandardMaterial map={moonTexture} metalness={0.1} roughness={0.8} />
      </Sphere>
    </mesh>
  );
}