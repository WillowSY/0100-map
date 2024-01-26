import { useBox, useCompoundBody, useRaycastVehicle } from "@react-three/cannon";
import { useMemo, useRef } from "react";
import DummyCarBody from "./dummy/DummyCarBody";
import DummyWheel from "./dummy/DummyWheel";
import { useControls } from "leva";
import { useWheels } from "./utils/useWheels";
import { useVehicleControls} from "./utils/useVehicleControls";
import { useFrame } from "@react-three/fiber";
import useFollowCam from "./utils/useFollowCam";
import { Vector3 } from "three";

// 사용자 인터페이스를 통해 차체의 속성을 조정할 수 있으며, 차량의 물리적 동작과 카메라 움직임을 제어

const Car = () => {
    const { pivot } = useFollowCam(); // 카메라가 자동차를 따라가는데 사용
    const worldPosition = useMemo(() => new Vector3(), []) // new Vector3()를 사용하여 3차원 공간에서 위치를 나타내는 벡터를 생성 
                                                          // 차체의 현재 세계 위치를 추적하는 데 사용

    const chassisBodyValue = useControls('chassisBody', { // 차체의 너비, 높이, 앞쪽 길이등을 사용자 인터페이스를 통해 조정 가능하게 하는 Leva 라이브러리 컨트롤
      width: { value: 0.16, min: 0, max: 1,},
      height:  { value: 0.12, min: 0, max: 1,},
      front: { value: 0.17, min: 0, max: 1,},
    })
    const position = [0, 0.5, 0]; // 차체 초기 위치

    let width, height, front, mass, wheelRadius; // 차체와 바퀴의 크기, 차체의 질량을 정의하는 변수들

    width = 0.16;
    height = 0.12;
    front = 0.17;
    wheelRadius = 0.05;
    mass = 150;
    
    const chassisBodyArgs = [width, height, front * 2]; // 'useCompoundBody' 훅을 사용하여 차체를 생성할 때 사용되는 차원
  
    const [chassisBody, chassisApi] = useCompoundBody( // 차체의 물리적 속성과 차체를 제어하기 위한 API (useCompoundBody에서 반환)
      () => ({
        position,
        mass: mass,
        rotation: [0,Math.PI,0],
        shapes: [
          {
            args: chassisBodyArgs,
            position: [0,0,0],
            type: "Box"
          },
          {
            args: [width, height, front],
            position: [0,height,0],
            type: "Box",
          },
      ],
      }),
      useRef(null)
    );

    const [wheels, wheelInfos] = useWheels(width, height, front, wheelRadius); // 차량의 바퀴와 관련된 정보와 바퀴 객체 (useWheels에서 반환)

    const [vehicle, vehicleApi] = useRaycastVehicle( // 차량 전체와 관련된 물리적 속성과 API (useRaycastVehicle에서 반환)
      () => ({
        chassisBody,
        wheelInfos,
        wheels,
      }),
      useRef(null),
    );

    useVehicleControls(vehicleApi, chassisApi) // 차량 제어 시스템. vehicleApi와 chassisApi를 사용하여 차량의 움직임을 제어

    const makeFollowCam = ()=> { // 차체의 위치를 계산하고, 이를 사용하여 카메라가 차량을 따라가도록 조정
      chassisBody?.current.getWorldPosition(worldPosition)
      pivot.position.lerp(worldPosition, 0.9)
    }

    useFrame(()=>{ // 매 프레임마다 makeFollowCam 함수를 호출하여 카메라가 차량을 지속적으로 따라가도록 함
      makeFollowCam()
    })

    return( // 차량의 시각적 표현을 정의. DummyCarBody와 DummyWheel 컴포넌트를 사용하여 차체와 바퀴를 시각화
        <group ref={vehicle}> 
            <group ref={chassisBody}> 
                <DummyCarBody width={chassisBodyValue.width} height={chassisBodyValue.height} front={chassisBodyValue.front * 2}/>
            </group>
            <DummyWheel wheelRef={wheels[0]} radius={wheelRadius}/>
            <DummyWheel wheelRef={wheels[1]} radius={wheelRadius}/>
            <DummyWheel wheelRef={wheels[2]} radius={wheelRadius}/>
            <DummyWheel wheelRef={wheels[3]} radius={wheelRadius}/>
        </group>
    )
}

export default Car