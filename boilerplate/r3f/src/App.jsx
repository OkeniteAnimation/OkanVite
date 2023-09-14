import { useEffect, useRef, useState } from "react";
import Scene from "./components/scene.jsx";
import "./scss/style.scss";
import { useFrame } from "@react-three/fiber";
import Overlay from "./components/Overlay.jsx";
import { AppContextProvider } from "./context/AppContext.jsx";

function App() {
  return (
    <>
      <AppContextProvider>
        <Overlay />
        <Scene />
      </AppContextProvider>
    </>
  );
}

export default App;
