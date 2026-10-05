"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, Stars } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState, type ReactNode } from "react";
import * as THREE from "three";
import FloatingShapes from "./FloatingShapes";

/**
 * Site-wide 3D background (v1 look).
 * - Studio reflections are generated locally with Lightformers (v1 used a CDN
 *   HDR preset, which the strict CSP blocks).
 * - Gentle cursor parallax + scroll drift, eased so it always feels smooth.
 * - prefers-reduced-motion: renders a single still frame.
 * - No WebGL: falls back to a static gradient.
 */

type Input = { x: number; y: number; scroll: number };

function Rig({ input, reduced, children }: { input: React.RefObject<Input>; reduced: boolean; children: ReactNode }) {
  const group = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (reduced) return;
    const { x, y, scroll } = input.current;
    const cam = state.camera;
    const d = Math.min(delta, 0.1);
    cam.position.x = THREE.MathUtils.damp(cam.position.x, x * 1.1, 2.2, d);
    cam.position.y = THREE.MathUtils.damp(cam.position.y, -y * 0.7, 2.2, d);
    cam.lookAt(0, 0, -4);
    const g = group.current;
    if (g) {
      g.rotation.y = THREE.MathUtils.damp(g.rotation.y, scroll * 0.9, 2, d);
      g.position.y = THREE.MathUtils.damp(g.position.y, scroll * 2.5, 2, d);
    }
  });

  return <group ref={group}>{children}</group>;
}

function Fallback() {
  return (
    <div
      aria-hidden
      className="fixed inset-0 -z-10 bg-black bg-[radial-gradient(ellipse_at_20%_20%,rgba(79,70,229,0.25),transparent_55%),radial-gradient(ellipse_at_80%_70%,rgba(236,72,153,0.15),transparent_50%)]"
    />
  );
}

export default function Scene() {
  const input = useRef<Input>({ x: 0, y: 0, scroll: 0 });
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);

    const onMove = (e: PointerEvent) => {
      input.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      input.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      input.current.scroll = max > 0 ? window.scrollY / max : 0;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      mq.removeEventListener("change", sync);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div aria-hidden className="fixed inset-0 -z-10 bg-black pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        frameloop={reduced ? "demand" : "always"}
        fallback={<Fallback />}
      >
        <Suspense fallback={null}>
          <Environment resolution={256} frames={1}>
            <Lightformer intensity={2} position={[0, 5, -9]} scale={[10, 10, 1]} />
            <Lightformer intensity={1.5} position={[-6, 1, -2]} rotation-y={Math.PI / 2} scale={[20, 2, 1]} />
            <Lightformer intensity={1.5} position={[6, -1, 2]} rotation-y={-Math.PI / 2} scale={[20, 2, 1]} />
            <Lightformer intensity={1} color="#6366f1" position={[0, -5, 3]} rotation-x={Math.PI / 2} scale={[10, 10, 1]} />
          </Environment>
          <Rig input={input} reduced={reduced}>
            <FloatingShapes reduced={reduced} />
          </Rig>
          <Stars radius={80} depth={40} count={1200} factor={3} saturation={0} fade speed={reduced ? 0 : 0.6} />
        </Suspense>
      </Canvas>
      {/* Soft vignette keeps text readable over the shapes */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.65)_100%)]" />
    </div>
  );
}
