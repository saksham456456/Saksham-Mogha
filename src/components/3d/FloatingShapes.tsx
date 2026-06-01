"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

export default function FloatingShapes() {
  const sphereRef = useRef<THREE.Mesh>(null);
  const torusRef = useRef<THREE.Mesh>(null);
  const icosahedronRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (sphereRef.current) sphereRef.current.rotation.x = t * 0.2;
    if (torusRef.current) torusRef.current.rotation.y = t * 0.3;
    if (icosahedronRef.current) icosahedronRef.current.rotation.z = t * 0.1;
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <directionalLight position={[-10, -10, -5]} color="#4f46e5" intensity={2} />
      
      <Float speed={1.5} rotationIntensity={1} floatIntensity={2} position={[-4, 2, -5]}>
        <mesh ref={sphereRef}>
          <sphereGeometry args={[1.5, 64, 64]} />
          <MeshDistortMaterial color="#4f46e5" distort={0.4} speed={2} roughness={0.2} metalness={0.8} />
        </mesh>
      </Float>

      <Float speed={2} rotationIntensity={1.5} floatIntensity={1.5} position={[4, -1, -3]}>
        <mesh ref={torusRef}>
          <torusGeometry args={[1.2, 0.4, 32, 100]} />
          <meshStandardMaterial color="#ec4899" roughness={0.1} metalness={0.9} />
        </mesh>
      </Float>

      <Float speed={1} rotationIntensity={2} floatIntensity={2} position={[0, -3, -6]}>
        <mesh ref={icosahedronRef}>
          <icosahedronGeometry args={[1.5, 0]} />
          <meshStandardMaterial color="#06b6d4" roughness={0.3} metalness={0.7} wireframe />
        </mesh>
      </Float>
    </>
  );
}
