"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function seededRandom(seed: number) {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return value - Math.floor(value);
}

function GlitterField({ count = 950 }) {
  const points = useRef<THREE.Points>(null!);
  
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const colorGold = new THREE.Color("#D4AF37");
    const colorPink = new THREE.Color("#FF007F");
    const colorBlue = new THREE.Color("#00E5FF");
    const palette = [colorGold, colorPink, colorBlue];
    
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (seededRandom(i + 1) - 0.5) * 18;
      pos[i * 3 + 1] = (seededRandom(i + 101) - 0.5) * 13;
      pos[i * 3 + 2] = (seededRandom(i + 201) - 0.5) * 9;
      
      const baseColor = palette[Math.floor(seededRandom(i + 301) * palette.length)];
      col[i * 3] = baseColor.r;
      col[i * 3 + 1] = baseColor.g;
      col[i * 3 + 2] = baseColor.b;
    }
    return [pos, col];
  }, [count]);

  useFrame((state, delta) => {
    if (points.current) {
      points.current.rotation.y += delta * 0.05;
      points.current.rotation.x += delta * 0.015;
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

function MirrorBall() {
  const group = useRef<THREE.Group>(null!);
  const elapsed = useRef(0);
  const tiles = useMemo(() => {
    return Array.from({ length: 80 }, (_, i) => {
      const phi = Math.acos(1 - 2 * ((i + 0.5) / 80));
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const radius = 1.32;
      const position = new THREE.Vector3(
        Math.cos(theta) * Math.sin(phi) * radius,
        Math.cos(phi) * radius,
        Math.sin(theta) * Math.sin(phi) * radius
      );
      const color = i % 5 === 0 ? "#f9e596" : i % 3 === 0 ? "#00e5ff" : "#d4af37";
      return { position, color, scale: 0.11 + seededRandom(i + 11) * 0.06 };
    });
  }, []);

  useFrame((_, delta) => {
    if (!group.current) return;
    elapsed.current += delta;
    group.current.rotation.y += delta * 0.32;
    group.current.rotation.x = Math.sin(elapsed.current * 0.28) * 0.12;
  });

  return (
    <group ref={group} position={[2.85, 0.3, -0.7]} rotation={[0.15, 0, -0.08]}>
      <mesh>
        <sphereGeometry args={[1.2, 48, 48]} />
        <meshStandardMaterial
          color="#171016"
          roughness={0.22}
          metalness={0.82}
          emissive="#2b1c05"
          emissiveIntensity={0.28}
        />
      </mesh>
      {tiles.map((tile, index) => (
        <mesh
          key={index}
          position={tile.position}
          lookAt={[0, 0, 0]}
          scale={[tile.scale, tile.scale, 0.012]}
        >
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            color={tile.color}
            roughness={0.15}
            metalness={1}
            emissive={tile.color}
            emissiveIntensity={0.22}
          />
        </mesh>
      ))}
    </group>
  );
}

function LaserRig() {
  const group = useRef<THREE.Group>(null!);
  const elapsed = useRef(0);

  useFrame((_, delta) => {
    if (!group.current) return;
    elapsed.current += delta;
    group.current.rotation.z = Math.sin(elapsed.current * 0.42) * 0.08;
  });

  return (
    <group ref={group} position={[0.8, -0.4, -1.2]}>
      {[
        { y: 1.2, color: "#ff2e93", rot: -0.28 },
        { y: 0.2, color: "#00e5ff", rot: 0.22 },
        { y: -0.75, color: "#d4af37", rot: -0.12 },
      ].map((beam, index) => (
        <mesh key={index} position={[0, beam.y, -0.2]} rotation={[0, 0, beam.rot]}>
          <boxGeometry args={[8.2, 0.025, 0.025]} />
          <meshBasicMaterial color={beam.color} transparent opacity={0.34} blending={THREE.AdditiveBlending} />
        </mesh>
      ))}
    </group>
  );
}

function NeonRings() {
  const ring = useRef<THREE.Group>(null!);
  const elapsed = useRef(0);

  useFrame((_, delta) => {
    if (!ring.current) return;
    elapsed.current += delta;
    ring.current.rotation.z = elapsed.current * 0.09;
    ring.current.rotation.y = Math.sin(elapsed.current * 0.3) * 0.16;
  });

  return (
    <group ref={ring} position={[-2.2, -0.15, -1.8]} rotation={[0.8, 0.2, 0]}>
      {[1.25, 1.75, 2.25].map((radius, index) => (
        <mesh key={radius}>
          <torusGeometry args={[radius, 0.008, 8, 120]} />
          <meshBasicMaterial
            color={index === 0 ? "#d4af37" : index === 1 ? "#ff2e93" : "#00e5ff"}
            transparent
            opacity={0.36 - index * 0.07}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
}

export function ParticleBackground() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none bg-[#050306]">
      <Canvas camera={{ position: [0, 0, 5.8], fov: 50 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.25} />
        <pointLight position={[2.8, 1.8, 2.2]} intensity={4.2} color="#f9e596" />
        <pointLight position={[-3, -1.5, 2.5]} intensity={2.6} color="#ff2e93" />
        <GlitterField />
        <LaserRig />
        <NeonRings />
        <MirrorBall />
      </Canvas>
    </div>
  );
}
