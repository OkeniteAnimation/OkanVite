import { SpotLight, CameraControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import { useAppContext } from "../context/AppContext";
import Model from "../models/model";

function Scene() {
  const { stateCameraControls } = useAppContext();

  return (
    <Canvas shadows>
      <CameraControls enabled={stateCameraControls} />
      <Model />
    </Canvas>
  );
}
export default Scene;
