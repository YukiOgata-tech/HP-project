"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Particles({ count = 1000 }) {
  const points = useRef<THREE.Points>(null!);
  
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const colorGold = new THREE.Color("#D4AF37");
    const colorPink = new THREE.Color("#FF007F");
    const colorBlue = new THREE.Color("#00E5FF");
    const palette = [colorGold, colorPink, colorBlue];
    
    for (let i = 0; i < count; i++) {
      // position
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
      
      // color
      const baseColor = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3] = baseColor.r;
      col[i * 3 + 1] = baseColor.g;
      col[i * 3 + 2] = baseColor.b;
    }
    return [pos, col];
  }, [count]);

  useFrame((state, delta) => {
    if (points.current) {
      points.current.rotation.y += delta * 0.05;
      points.current.rotation.x += delta * 0.02;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export function ParticleBackground() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none bg-black">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <Particles count={2000} />
      </Canvas>
    </div>
  );
}
