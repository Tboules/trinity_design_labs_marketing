import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

const colorPalette = [
  "#00A9A5",
  "#FF6F61",
  "#F6CD61",
  "#4A90E2",
  "#50B99E",
  "#FF8C42",
  "#8E44AD",
  "#3498DB",
  "#E74C3C",
  "#2ECC71",
];

interface SphereProps {
  radius: number;
  speed: number;
  angleOffset: number;
  direction: THREE.Vector3;
  trailColor: string;
}

const Sphere: React.FC<SphereProps> = ({
  radius,
  speed,
  angleOffset,
  direction,
  trailColor,
}) => {
  const mesh = useRef<THREE.Mesh>(null!);
  const trailRef = useRef<THREE.Line>(null!);
  const [positions, setPositions] = useState<THREE.Vector3[]>([]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime() * speed + angleOffset;
    const x = radius * Math.sin(time) * direction.x + 0.1 * Math.sin(time * 2);
    const y = radius * Math.cos(time) * direction.y + 0.1 * Math.cos(time * 2);
    const z =
      radius * Math.sin(time * 0.5) * direction.z + 0.1 * Math.sin(time * 2.5);

    mesh.current.position.set(x, y, z);

    setPositions((prev) => {
      const newPositions = [...prev, new THREE.Vector3(x, y, z)];
      if (newPositions.length > 100) newPositions.shift();
      return newPositions;
    });
  });

  useEffect(() => {
    if (trailRef.current) {
      const geometry = new THREE.BufferGeometry().setFromPoints(positions);
      trailRef.current.geometry.dispose();
      trailRef.current.geometry = geometry;
    }
  }, [positions]);

  return (
    <>
      <mesh ref={mesh}>
        <sphereGeometry args={[0.009, 32, 32]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>
      <line ref={trailRef}>
        <bufferGeometry />
        <lineBasicMaterial color={trailColor} linewidth={2} />
      </line>
    </>
  );
};

const Scene: React.FC = () => {
  return (
    <Canvas style={{}} camera={{ position: [0, 0, 3] }}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      {[...Array(25)].map((_, i) => {
        const direction = new THREE.Vector3(
          Math.random() * 2 - 1,
          Math.random() * 2 - 1,
          Math.random() * 2 - 1,
        ).normalize();
        return (
          <Sphere
            key={i}
            radius={1 + Math.random() * 2}
            speed={0.5 + Math.random() * 0.5}
            angleOffset={Math.random() * Math.PI * 2}
            direction={direction}
            trailColor={colorPalette[i % colorPalette.length]}
          />
        );
      })}
      {/* <OrbitControls /> */}
    </Canvas>
  );
};

export default function HeroThreeD() {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Scene />
    </div>
  );
}
