import { useLoader, useThree } from "@react-three/fiber";
import { useEffect } from "react";
import * as THREE from "three";

export default function Background() {
  const { scene } = useThree();
  const texture = useLoader(THREE.TextureLoader, "/textures/stars.jpg");
  useEffect(() => {
    scene.background = texture;
  }, [texture, scene]);
  return null;
}