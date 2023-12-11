import React, { useEffect, useMemo } from "react";
import * as THREE from "three";
import { useLoader, useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default function Desk(props) {
  const model = useLoader(GLTFLoader, "/Desk.glb");

  return (
    <primitive
      position={[0, -1.1  , 4.6]}
      object={model.scene}
      scale={[1, 1, 1]}
    />
  );
}
