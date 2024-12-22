import { useLoader } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";
import * as THREE from "three";

export default function Sun() {
  const sunTexture = useLoader(THREE.TextureLoader, "/textures/sun.jpg");

  return (
    <mesh position={[0, 0, 0]}>
      <Sphere args={[5, 32, 32]}>
        <meshStandardMaterial map={sunTexture} metalness={0.1} roughness={0.8} />
      </Sphere>
    </mesh>
  );
}