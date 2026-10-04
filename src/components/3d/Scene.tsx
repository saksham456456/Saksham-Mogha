"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import FloatingShapes from "./FloatingShapes";
import { Suspense, useState, useEffect } from "react";

export default function Scene() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="fixed top-0 left-0 w-full h-full -z-10 bg-black" />;
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 bg-black pointer-events-auto">
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }} gl={{ alpha: true, antialias: true }}>
        <Suspense fallback={null}>
          <Stars radius={100} depth={50} count={2500} factor={4} saturation={0} fade speed={1} />
          <FloatingShapes />
        </Suspense>
        {/* Enable smooth mouse rotation of the 3D space */}
        <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 1.8} minPolarAngle={Math.PI / 2.2} />
      </Canvas>
    </div>
  );
}
