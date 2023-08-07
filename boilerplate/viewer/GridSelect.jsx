import React, { useState, useRef,useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { Stats, OrbitControls,Environment } from '@react-three/drei'
import data from '../public/data';
import logo from '../public/img/logo.png';
import close from './assets/icons/close.svg';
import gsap from 'gsap';
import './css/style.css';




const RenderScene = ({ selectedModel }) => {
  const model = selectedModel;
  function Model() {
    const gltf = useGLTF(`content/${model}/model.glb`);
    return <primitive object={gltf.scene} />;
  }
  
  return (
      <Canvas>
        <Environment files={`content/${model}/envMap.hdr`}  />
        <perspectiveCamera position={[0, 0, 5]} />
        <ambientLight />
        <OrbitControls />
        <pointLight />
        <Model />
      </Canvas>
  );
}

function GridSelect() {
  const [selectedModel, setSelectedModel] = useState(null);
  const [showMenu, setShowMenu] = useState(false);

  const headerRef = useRef(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    const height = Math.floor(headerRef.current.getBoundingClientRect().height);
    setHeaderHeight(height);
  }, []);

  
  console.log(headerHeight);


  const toggleMenu = () => {
    setShowMenu(!showMenu);
    gsap.to(".formContainer",{
      duration: 0.5,
      opacity: showMenu ? 0 : 1,
      display: showMenu ? "none" : "flex",
    })
    gsap.to(".form",{
      transform: showMenu ? "translateY(10%)" : "translateY(0%)",
    })
  };
  const handleSelect = (model) => {
    gsap.to(".grid",{
      duration: 0.5,
      opacity: 0,
      display: "none",
    })
   
    setSelectedModel(model);
    

  }

 
  return (
    <div>
      <div id='header' className="header" ref={headerRef}>
        <img src={logo} alt="" />
        <div className='navigation'>
          <span onClick={toggleMenu} className="HamburgerMenu">
            <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M266 844q-22.775 0-38.387-15.612Q212 812.775 212 790v-95h22v95q0 12 10 22t22 10h428q12 0 22-10t10-22v-95h22v95q0 22.775-15.612 38.388Q716.775 844 694 844H266Zm203-146V333l-95 94-16-15 122-122 122 122-16 15-95-94v365h-22Z"/></svg>
          </span>
        </div>
      </div> 
      <div className="formContainer">
        <div className="form">
          <span className='close' onClick={toggleMenu}><img src={close} alt="" /></span>
          <h1>Importer un Model</h1>
          <span>Transferer un modele 3D pour le retrouver sur le viewer</span>
          <input type="file" accept="image/x-png,image/jpeg"/>
          <div className="buttonZone">
            <button>Import</button>
            <button onClick={toggleMenu}>Retour</button>
          </div>
        </div>
      </div>

      <div className="grid">
        {data.map((value) => {
          return <img onClick={() => handleSelect(value)} key={value} src={`../public/content/${value}/thumb.jpg`} alt="" />;
        })}
      </div>
     
      {selectedModel && 
         <div className="canvas-container" style={{height: `calc(100vh - ${headerHeight}px `}}>
      <RenderScene selectedModel={selectedModel}/>
       </div> 
       } 
       
    </div>
  );
}

export default GridSelect;