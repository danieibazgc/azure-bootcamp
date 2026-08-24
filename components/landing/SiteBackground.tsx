"use client";

/* Full-viewport animated backdrop, mounted once in the root layout.
   Dynamically imported with ssr:false since it depends on WebGL/DOM. */

import dynamic from "next/dynamic";

const ColorBends = dynamic(() => import("./ColorBends"), { ssr: false });

export function SiteBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-navy"
      aria-hidden="true"
    >
      <ColorBends
        rotation={125}
        speed={0.16}
        colors={["#050b30", "#2f7dff", "#7856ee", "#00d1ff", "#a6249d"]}
        transparent={false}
        scale={1.35}
        frequency={0.85}
        warpStrength={0.9}
        mouseInfluence={0.45}
        parallax={0.3}
        noise={0.05}
        iterations={2}
        intensity={1.05}
        bandWidth={5}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-navy/70 via-transparent to-navy/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy/30 via-transparent to-navy/30" />
    </div>
  );
}
