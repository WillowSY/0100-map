import { useEffect, useState } from "react";

export const useVehicleControls = (vehicleApi, chassisApi) => {
    const [controls, setControls] = useState({}); // 이 훅은 현재 활성화된 제어들을 추적하는 controls 객체의 상태를 관리함. 초기 상태는 빈 객체임.

    useEffect(()=>{ // 이 훅은 키보드 이벤트 리스너를 설정하고, 키 입력에 따라 controls 상태를 업데이트함.
        const KeDownPressHandler = (e) => { // 키가 눌렸을 때 호출됨. 해당 키의 상태를 true로 설정
            setControls((controls) => ({ 
                ...controls, [e.key]: true 
            }));
            console.log('Down',e)
        }
        const KeUpPressHandler = (e) => { // 키가 놓아졌을 때 호출됨. 해당 키의 상태를 false로 설정
            setControls((controls) => ({ 
                ...controls, [e.key]: false,
            }));
            console.log('Up',e)
        }

        window.addEventListener('keydown', KeDownPressHandler);
        window.addEventListener('keyup', KeUpPressHandler);

        return () => {
            window.removeEventListener('keydown', KeDownPressHandler);
            window.removeEventListener('keyup', KeUpPressHandler);
        }
    },[])

    useEffect(() => { // 엔진 힘, 조향각도 설정
        if (controls.ArrowUp) {
            vehicleApi.applyEngineForce(200, 2); // 왼쪽 뒷바퀴
            vehicleApi.applyEngineForce(200, 3); // 오른쪽 뒷바퀴
        } else if (controls.ArrowDown) {
            vehicleApi.applyEngineForce(-120, 2);
            vehicleApi.applyEngineForce(-120, 3);
        } else {
            vehicleApi.applyEngineForce(0, 2);
            vehicleApi.applyEngineForce(0, 3);
        }

        if (controls.ArrowLeft) {
            vehicleApi.setSteeringValue(-0.1, 0);
            vehicleApi.setSteeringValue(-0.1, 1);
            vehicleApi.setSteeringValue(0.35, 2);
            vehicleApi.setSteeringValue(0.35, 3);
           
        } else if (controls.ArrowRight) {
            vehicleApi.setSteeringValue(0.1, 0);
            vehicleApi.setSteeringValue(0.1, 1);
            vehicleApi.setSteeringValue(-0.35, 2);
            vehicleApi.setSteeringValue(-0.35, 3);
        } else {
          for (let i = 0; i < 4; i++) {
            vehicleApi.setSteeringValue(0, i);
          }
        }

        if (controls[" "] /* 스페이스바 */) {
            // 브레이크 힘 적용 로직
            vehicleApi.setBrake(4, 2);
            vehicleApi.setBrake(4, 3);
        } else {
            // 브레이크 해제
            vehicleApi.setBrake(0, 2);
            vehicleApi.setBrake(0, 3);
        }

        if (controls['b'] || controls['B']) {
            // 부스터 활성화 시 엔진 힘 증가
            const boosterForce = 10000000000 * 19999; // 부스터 힘 설정
            vehicleApi.applyEngineForce(boosterForce, 2);
            vehicleApi.applyEngineForce(boosterForce, 3);
        }

        if (controls['j'] || controls['J']) {
            // 점프 활성화 시 수직 방향 힘 적용
            const jumpForce = 250; // 점프 힘 설정
            chassisApi.applyLocalImpulse([0, jumpForce, 0], [0, 0, 0]);
        }

    }, [controls, vehicleApi, chassisApi]);

    return controls;
}