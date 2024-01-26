import { useThree } from '@react-three/fiber'
import { useEffect, useMemo } from 'react'
import { Object3D } from 'three'

// useFollowCam 훅은 3D 씬에서 카메라를 원하는 방식으로 위치시키고 회전시키기 위한 기능을 제공
// pivot은 카메라의 움직임을 제어하는 중심점 역할을 하며, useEffect는 컴포넌트가 마운트될 때 이러한 카메라 설정을 초기화함.

const useFollowCam = () => {
  const { scene, camera } = useThree() // 현재 scene과 camera를 얻기 위해 useThree 훅을 사용합니다.
  const pivot = useMemo(() => new Object3D(), []) // Object3D 인스턴스를 memoize하여 pivot 포인트를 만듭니다.

  const makeCamera = ()=>{ // 카메라의 위치와 회전을 설정
    camera.position.set(1,2,3.5)
    camera.rotation.x = -0.5

    pivot.add(camera)
    scene.add(pivot)
  }

  useEffect(() => { // 컴포넌트가 마운트될 때(useEffect의 빈 의존성 배열([]) 때문에) makeCamera 함수를 호출함.
    makeCamera() // 이 함수는 카메라 설정이 컴포넌트의 라이프사이클과 연동되어 초기 설정 시에만 실행되도록 함.
  }, [])

  return { pivot } // 'pivot' 반환. 다른 컴포넌트에서 useFollowCam 을 사용할 때, 이 pivot을 이용하여 카메라의 위치와 방향을 조정할 수 있게 함.
}


export default useFollowCam;