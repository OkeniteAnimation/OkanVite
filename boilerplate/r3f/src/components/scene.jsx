import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { OrbitControls, Box, SpotLight, Plane } from "@react-three/drei";
function Cube() {
  const cubeRef = useRef();
  useFrame(() => {
    cubeRef.current.rotation.x += 0.01;
    cubeRef.current.rotation.y += 0.01;
  });
  return <Box ref={cubeRef} args={[2, 2, 2]} material-color="hotpink" />;
}

function Scene() {
  return (
    <Canvas shadows>
      <SpotLight
        castShadow
        penumbra={1}
        distance={6}
        angle={0.35}
        attenuation={5}
        anglePower={4}
        intensity={2}
        color="#fff"
        position={[3, 3, 2]}
      />
      <Cube />
      {/* <OrbitControls /> */}
    </Canvas>
  );
}
export default Scene;
