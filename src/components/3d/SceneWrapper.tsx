"use client";

import dynamic from "next/dynamic";

const Scene = dynamic(() => import("./Scene"), {
  ssr: false,
  loading: () => <div className="fixed inset-0 -z-10 bg-black" />,
});

export function SceneWrapper() {
  return <Scene />;
}
