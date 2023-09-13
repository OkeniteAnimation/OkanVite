import { useEffect, useRef, useState } from "react";
import Scene from "./components/scene.jsx";
import "./scss/style.scss";
import { useFrame } from "@react-three/fiber";

function App() {
  return (
    <>
      <Scene />
    </>
  );
}

export default App;
