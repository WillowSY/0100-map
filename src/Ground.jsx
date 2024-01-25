import React from 'react'
import { usePlane } from "@react-three/cannon";
import Road from './World/Road.jsx'

export function Ground(props) {

  const [meshRef] = usePlane(
    () => ({ args: [15, 15], mass: 1, type: 'Static', ...props}),
  )

  return (
    <mesh
    {...props}
    ref={meshRef} 
    receiveShadow
    >
    <planeGeometry args={[15, 15]} />
    <meshStandardMaterial color="white" opacity={0} transparent/>
    <Road/>
  </mesh>
  )
}