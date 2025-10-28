import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, Line, Text } from '@react-three/drei';
import { Vector3 } from 'three';

interface BlochSphereProps {
  theta?: number;
  phi?: number;
}

const BlochSphere = ({ theta = 0, phi = 0 }: BlochSphereProps) => {
  // Convert spherical coordinates to Cartesian for state vector
  const x = Math.sin(theta) * Math.cos(phi);
  const y = Math.sin(theta) * Math.sin(phi);
  const z = Math.cos(theta);

  const stateVector = new Vector3(x, y, z);

  return (
    <div className="w-full h-[400px] bg-background/50 rounded-lg border border-primary/20">
      <Canvas camera={{ position: [3, 3, 3], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        
        {/* Main sphere */}
        <Sphere args={[1, 32, 32]}>
          <meshStandardMaterial 
            color="#9b87f5" 
            transparent 
            opacity={0.2} 
            wireframe
          />
        </Sphere>

        {/* X, Y, Z axes */}
        <Line
          points={[[-1.5, 0, 0], [1.5, 0, 0]]}
          color="#ef4444"
          lineWidth={2}
        />
        <Line
          points={[[0, -1.5, 0], [0, 1.5, 0]]}
          color="#22c55e"
          lineWidth={2}
        />
        <Line
          points={[[0, 0, -1.5], [0, 0, 1.5]]}
          color="#3b82f6"
          lineWidth={2}
        />

        {/* State vector */}
        <Line
          points={[[0, 0, 0], [x, y, z]]}
          color="#fbbf24"
          lineWidth={3}
        />
        <Sphere args={[0.08]} position={[x, y, z]}>
          <meshStandardMaterial color="#fbbf24" />
        </Sphere>

        {/* Labels */}
        <Text position={[1.7, 0, 0]} fontSize={0.2} color="#ef4444">
          X
        </Text>
        <Text position={[0, 1.7, 0]} fontSize={0.2} color="#22c55e">
          Y
        </Text>
        <Text position={[0, 0, 1.5]} fontSize={0.2} color="#3b82f6">
          |0⟩
        </Text>
        <Text position={[0, 0, -1.5]} fontSize={0.2} color="#3b82f6">
          |1⟩
        </Text>

        <OrbitControls enableZoom={true} enablePan={false} />
      </Canvas>
    </div>
  );
};

export default BlochSphere;
