import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Canvas } from "@react-three/fiber";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Canvas
      style={{
        width: "100vw",
        height: "100vh",
      }}
      camera={{
        position: [0, -0.1, 6],
        rotation: [-0.48, 0, 0],
      }}
    >
      <ambientLight intensity={2} />
      <spotLight intensity={500} position={[[0, 1, 5]]} />
      <App />
    </Canvas>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
