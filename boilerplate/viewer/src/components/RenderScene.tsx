import {Canvas, useThree, useFrame, ambientLight} from '@react-three/fiber';
import React, { useEffect, useState, useRef } from "react";
import * as THREE from "three";

import "../style.scss";
import {
  useProgress,
  Environment,
  PerspectiveCamera,
  CameraControls,
  OrbitControls,
  Text,
  QuadraticBezierLine,
  Plane,
} from "@react-three/drei";
import Model from "./model.jsx";
import gsap from "gsap";
import details from "/public/details.json";

function LoadingScreen() {
  const { progress } = useProgress();

  console.log(progress);

  if (progress === 100) {
    gsap.to(".loadingScreen", {
      opacity: "0",
      display: "none",
      delay: 2,
    });
  } else {
    gsap.to(".loadingScreen", {
      opacity: "1",
      display: "flex",
      delay: 2,
    });
  }
  return (
    <>
      <div className="loadingScreen">
        <h1>Loading... { Math.round(progress)} %</h1>
      </div>
    </>
  );
}

// Supposons que ces dimensions correspondent à la taille du texte
const TextComposant = ({color, text, position, textColor}) => {

  const { camera } = useThree();
  const [textSize, setTextSize] = useState(null);
  const textRef = useRef();
  const groupRef = useRef();
  const colorBackground = color
  const textContent = text

  const textPosition = position
  useFrame(() => {
    if (groupRef.current && camera) {
      // Calculez le vecteur directionnel du groupe à la caméra
      const dir = new THREE.Vector3();
      dir.subVectors(camera.position, groupRef.current.position);
  
      // Projetez ce vecteur sur le plan XZ (ignorant l'axe Y)
      dir.y = 0;
      dir.normalize();
  
      // Créez un quaternion qui représente cette rotation
      const quaternion = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), dir);
  
      // Appliquez ce quaternion au groupe
      groupRef.current.setRotationFromQuaternion(quaternion);
    }
  });



  useEffect(() => {
    console.log(textRef.current.material.color);

    setTimeout(() => {
        if (textRef.current) {
            const textMesh = textRef.current;
            const box = new THREE.Box3().setFromObject(textMesh);
            const size = box.getSize(new THREE.Vector3());
            setTextSize([size.x + 3, size.y + 2]);
        }
    }, 500); // 500 ms delay, adjust if needed
}, [textRef.current]);
  // Position du texte

  return (
    <>
        <group ref={groupRef}  position={textPosition}>


        {textSize && (
        <Plane
          position={[0, -0.2, -0.1]}
          args={textSize}
          material={new THREE.MeshBasicMaterial({ color: colorBackground })}
        />
      )}

      
      <Text
        ref={textRef}
        fontSize={3}
        color={textColor}
        font="font/PlayfairDisplay-VariableFont_wght.ttf"
        >
        {textContent}
      </Text>
      <QuadraticBezierLine
  start={[0, -4, 0]}               // Starting point, can be an array or a vec3
  end={[0, -35, 0]}               // Ending point, can be an array or a vec3
  // mid={[5, 0, 5]}                 // Optional control point, can be an array or a vec3
  color="#757575"       
              // Default
  lineWidth={1}                   // In pixels (default)
  dashed={false}                  // Default
/>
      </group>

    
  
    </>
  );
};


function RenderScene() {



  return (
    <>
      <LoadingScreen />
      <Canvas camera={{ fov: 75, far: 20000, position: [30, 50, 125] }}>
        <Environment files={"model/env.hdr"} />
        <CameraControls maxPolarAngle={Math.PI / 2.5} minDistance={30} maxDistance={800} />

        <Model />

 
        <TextComposant color={"#3E5F27"} text={"THE WINEYARD"} textColor={"#fff"}position={[35,35,-30]}/>
        <TextComposant color={"#778550"} text={"THE WINNERY"} textColor={"#fff"} position={[40,35,80]}/>
        <TextComposant color={"#AFB987"} text={"THE ORCHARD"} textColor={"#4f4f4f"} position={[-70,35,-60]}/>

      </Canvas>
    </>
  );
}
export default RenderScene;


//AFB987
// 3E5F27
// FBF8F0
