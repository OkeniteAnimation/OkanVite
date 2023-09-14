import { useState, React } from "react";
import { useAppContext } from "../context/AppContext";

function Overlay() {
  const { triggerCameraControls, isControlsTrigger } = useAppContext();

  return (
    <div className="overlay">
      <div className="header">
        <nav>
          <ul>
            <li onClick={triggerCameraControls}>
              <img src={`images/pictos/${isControlsTrigger}.svg`} alt="" />
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Overlay;
