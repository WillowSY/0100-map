import { Canvas } from "@react-three/fiber";
import { Ground } from "./Ground";
import Road from './world/Road.jsx'
import { Physics, Debug } from "@react-three/cannon";
import Car from "./Car";
import DummyBall from "./dummy/DummyBall";
import DummyBox from "./dummy/DummyBox";
import DummyWall from "./dummy/DummyWall";
import { OrbitControls } from '@react-three/drei'

function Scene() {
  const roads = [
    { position: [0, 0, 0] },
    { position: [0, 0, -4] },
    // Add more road positions as needed
  ];
  return (
    <>
      
      <Canvas camera={{ fov:45, position:[1.5, 2, 4]}}>
        <OrbitControls makeDefault />
        <ambientLight/>
        <directionalLight position={[0, 5, 5]} />
        <Physics gravity={[0, -2.6, 0]}>
          <Debug>
            <Car/>
            <Ground rotation={[-Math.PI/2,0,0]}/>
            {/* {roads.map((roadProps, index) => (
              <Road key={index} {...roadProps} />
            ))} */}
            <Road postion={[0, 0, 0]}/>
          </Debug>
        </Physics>
      </Canvas>
    </>
  );
}

export default Scene;
