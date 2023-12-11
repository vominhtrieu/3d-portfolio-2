import React, { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useLoader, useFrame, useThree } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Html } from "@react-three/drei";

function lerp(start, end, t = 0.025) {
  // Ensure t is within the range [0, 1]
  t = Math.max(0, Math.min(1, t));

  // Perform linear interpolation
  return start + t * (end - start);
}

export default function Laptop(props) {
  const model = useLoader(GLTFLoader, "/Laptop.glb");
  const [showScreen, setShowScreen] = React.useState(false);
  let mixer = useMemo(() => new THREE.AnimationMixer(model.scene), []);
  const three = useThree();

  useEffect(() => {
    model.animations.forEach((clip) => {
      const action = mixer.clipAction(clip);
      action.loop = THREE.LoopOnce;
      action.clampWhenFinished = true;
      action.play();
    });
  }, [model.animations, mixer]);

  useFrame((state, delta) => {
    if (three.camera.position.z <= 4.8) return;
    mixer?.update(delta);
    if (three.camera.position.z > 4.8) {
      three.camera.position.z = lerp(three.camera.position.z, 4.4);
      if (three.camera.position.z <= 4.8) {
        setTimeout(() => {
          setShowScreen(true);
        }, 1000);
      }
    }
  });

  useThree(({ camera, scene }) => {
    camera.position.z = 6;
    camera.rotation.x = -0.4;
  });
  // *************************

  model.scene.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
      child.material.side = THREE.FrontSide;
    }
  });

  window.model = model;
  return (
    <>
      <primitive
        position={[0, -0.3, 4.6]}
        object={model.scene}
        rotation={[-0.4, 0, 0]}
      >
        {showScreen && (
          <Html
            transform
            position={[0.0025, 0.124, -0.25]}
            scale={[0.0265, 0.028, 0.0265]}
            rotation={[-0.405, 0, 0]}
          >
            <iframe
              frameBorder={0}
              width="960px"
              height="540px"
              src="https://trieuvo.netlify.com/"
            />
          </Html>
        )}
      </primitive>
    </>
  );
}
