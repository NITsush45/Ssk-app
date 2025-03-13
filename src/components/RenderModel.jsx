"use client";

import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import clsx from "clsx";
import React, { Suspense, useEffect, useRef } from "react";

const RenderModel = ({ children, className }) => {
  const groupRef = useRef();

  return (
    <div className="absolute top-0 left-0 w-full h-full">
      <Canvas
        className={clsx("w-full h-full", className)}
        camera={{ position: [0, 2, 15], fov: 45, near: 0.1, far: 100 }}
        gl={{ alpha: true }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <Suspense fallback={null}>
          <group ref={groupRef} position={[0, -2, 0]} scale={3}>
            {children}
          </group>
          <Environment preset="dawn" background={false} />
          <OrbitControls
            target={[0, 1, 0]}
            enableZoom={true}
            enableRotate={true}
            enablePan={true}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={0}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default RenderModel;
