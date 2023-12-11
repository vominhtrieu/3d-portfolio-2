import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import Laptop from "./Laptop";
import Desk from "./Desk";

function App() {
  return (
    <>
      <Laptop />
      {/* <Desk /> */}
    </>
  );
}

export default App;
