import { useRef } from "react";
import { Box } from "@react-three/drei";

function Model() {
  const cubeRef = useRef();

  return <Box ref={cubeRef} args={[2, 2, 2]} material-color="hotpink" />;
}

export default Model;
