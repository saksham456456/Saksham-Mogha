"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import FloatingShapes from "./FloatingShapes";
import { Suspense } from "react";

export default function Scene() {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 bg-black">
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <Suspense fallback={null}>
          <Environment preset="city" />
          <FloatingShapes />
        </Suspense>
        {/* Enable mouse interaction with the 3D scene but prevent zooming to keep layout fixed */}
        <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 2} />
      </Canvas>
    </div>
  );
}
