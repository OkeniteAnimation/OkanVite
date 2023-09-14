// appContext.jsx

import React, { createContext, useContext, useRef, useState } from "react";

const AppContext = createContext();

export function useAppContext() {
  return useContext(AppContext);
}

export function AppContextProvider({ children }) {
  const spotRef = useRef();
  const [stateCameraControls, setStateCameraControls] = useState(false);
  const [isControlsTrigger, setIsControlsTrigger] = useState("camera.lock");

  const triggerCameraControls = () => {
    setStateCameraControls(!stateCameraControls);
    setIsControlsTrigger(
      isControlsTrigger === "camera" ? "camera.lock" : "camera"
    );
  };

  const fonction2 = () => {};

  const valeurContexte = {
    triggerCameraControls,
    fonction2,
    stateCameraControls,
    isControlsTrigger,
  };

  return (
    <AppContext.Provider value={valeurContexte}>{children}</AppContext.Provider>
  );
}
