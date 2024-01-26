import React, { useRef } from 'react'
import { Clone, useGLTF } from '@react-three/drei'
import { motion } from "framer-motion-3d";

useGLTF.preload(`/assets/models/world/road.glb`)
useGLTF.preload(`/assets/models/world/TrackKit.glb`)
export default function Road({position}) {
  const { nodes, materials } = useGLTF('/assets/models/world/road.glb')
  const trackkit = useGLTF('/assets/models/world/TrackKit.glb')
  const hambureger = useGLTF('/assets/models/hamburger.glb')
  const Roadblock = useGLTF('/assets/models/world/Roadblock.glb')
    
  return <>
    <mesh>
      <Clone castShadow object={Roadblock.scene} scale={4} position={[5, 0, 0]} rotation={[0, Math.PI/2, 0]}/>
      <Clone castShadow object={Roadblock.scene} scale={4} position={[-5, 0, 0]} rotation={[0, Math.PI/2, 0]}/>
      <Clone castShadow object={Roadblock.scene} scale={4} position={[0, 0, 5]} rotation={[0, Math.PI, 0]}/>
      <Clone castShadow object={Roadblock.scene} scale={4} position={[0, 0, -5]} rotation={[0, Math.PI, 0]}/>
      
    </mesh>
  </>
}
