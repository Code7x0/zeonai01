"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sphere, MeshDistortMaterial, Stars } from "@react-three/drei";
import { useMemo, useRef } from "react";
import type { Group, Points } from "three";
import { usePrefersReducedMotion } from "@/lib/motion/reduced-motion";

function Particles({ count = 280 }: { count?: number }) {
  const ref = useRef<Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 7;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 7;
    }
    return arr;
  }, [count]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.elapsedTime * 0.04;
    ref.current.rotation.x = Math.sin(clock.elapsedTime * 0.12) * 0.06;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.028}
        color="#b8c4ff"
        transparent
        opacity={0.8}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}

function Core() {
  const group = useRef<Group>(null);
  useFrame(({ clock, pointer }) => {
    if (!group.current) return;
    group.current.rotation.y = clock.elapsedTime * 0.18 + pointer.x * 0.35;
    group.current.rotation.x = pointer.y * 0.22 + Math.sin(clock.elapsedTime * 0.2) * 0.08;
  });

  return (
    <group ref={group} position={[0.15, 0.1, 0]}>
      <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.55}>
        <Sphere args={[1.25, 72, 72]}>
          <MeshDistortMaterial
            color="#5b75ff"
            attach="material"
            distort={0.38}
            speed={1.8}
            roughness={0.18}
            metalness={0.62}
            emissive="#1a2a6e"
            emissiveIntensity={0.35}
          />
        </Sphere>
      </Float>
      <mesh>
        <torusGeometry args={[1.95, 0.018, 16, 140]} />
        <meshBasicMaterial color="#9db0ff" transparent opacity={0.6} />
      </mesh>
      <mesh rotation={[Math.PI / 2.35, 0.45, 0.1]}>
        <torusGeometry args={[2.35, 0.012, 16, 140]} />
        <meshBasicMaterial color="#4d6bff" transparent opacity={0.4} />
      </mesh>
      <mesh rotation={[Math.PI / 3.2, -0.3, 0.5]}>
        <torusGeometry args={[2.7, 0.008, 12, 120]} />
        <meshBasicMaterial color="#8fa2ff" transparent opacity={0.22} />
      </mesh>
    </group>
  );
}

export function HeroScene() {
  const reduced = usePrefersReducedMotion();
  if (reduced) return null;

  return (
    <div className="zn-hero-gl" aria-hidden>
      <Canvas
        camera={{ position: [0, 0, 5.4], fov: 40 }}
        dpr={[1, 1.6]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.35} />
        <directionalLight position={[5, 4, 3]} intensity={1.35} />
        <pointLight position={[-4, -1, -2]} intensity={1.1} color="#8fa2ff" />
        <pointLight position={[2, 3, 2]} intensity={0.55} color="#ffffff" />
        <Stars
          radius={40}
          depth={28}
          count={900}
          factor={2.4}
          saturation={0}
          fade
          speed={0.4}
        />
        <Core />
        <Particles />
      </Canvas>
    </div>
  );
}
