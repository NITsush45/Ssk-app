"use client";
import React, { useRef, useState } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";

export default function Model(props) {
  const group = useRef();
  const modelRef = useRef();
  const iconsRef = useRef([]);
  const [rotation, setRotation] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const { nodes, materials, animations } = useGLTF(
    "/models/Boy-avt/boy_warrior/scene-transformed.glb"
  );
  const { actions } = useAnimations(animations, group);

  const radius = 2;
  const angleIncrement = 360 / 5;

  useFrame((state) => {
    const elapsedTime = state.clock.elapsedTime;

    if (modelRef.current) {
      modelRef.current.position.y = Math.sin(elapsedTime) * 0.1;
      modelRef.current.rotation.y = Math.sin(elapsedTime * 0.5) * (Math.PI / 3);
    }

    if (!isPaused && iconsRef.current) {
      iconsRef.current.forEach((icon, index) => {
        const angle =
          ((index * angleIncrement + rotation) % 360) * (Math.PI / 180);
        if (icon) {
          icon.position.x = radius * Math.cos(angle);
          icon.position.z = radius * Math.sin(angle);
          icon.position.y = 0;
        }
      });
      setRotation((prevRotation) => (prevRotation + 0.1) % 360);
    }
  });

  const icons = [
    {
      label: "My LinkedIn",
      url: "https://www.linkedin.com/in/sushant-kumar-6b547328b/",
      icon: "https://cliply.co/wp-content/uploads/2021/02/372102050_LINKEDIN_ICON_TRANSPARENT_1080.gif",
    },
    {
      label: "My Resume",
      url: "/resume/SSK_Resume1.pdf",
      icon: "https://images.examples.com/wp-content/uploads/2018/03/animation_cv.gif",
    },
    {
      label: "My Quora",
      url: "https://quora.com/profile/Sushant-Kumar-3122",
      icon: "https://media.lordicon.com/icons/wired/lineal/2718-logo-quora.gif",
    },
    {
      label: "My GitHub",
      url: "https://github.com/NITsush45",
      icon: "https://blog.rapidapi.com/wp-content/uploads/2017/01/octocat.gif",
    },
    {
      label: "E-Mail",
      url: "mailto:sushiitantmi45@gmail.com?subject=Hello%20Sushant&body=I%20wanted%20to%20reach%20out%20to%20you!",
      icon: "https://th.bing.com/th/id/R.cebd1a7284705c818ee3ce49ecb84b3c?rik=P2QAHRGb55%2bNrg&riu=http%3a%2f%2fwww.motherhitechboards.com%2fassets%2fimg%2fem.gif&ehk=2aq6uleMguG0YwVTv6K1hh2Z5MdVZ78D9HKZAtnyo5s%3d&risl=&pid=ImgRaw&r=0",
    },
  ];

  return (
    <>
      <group
        {...props}
        dispose={null}
        ref={modelRef}
        scale={[2, 2, 2]}
        position={[0, -8, 0]}
      >
        <group name="Sketchfab_Scene">
          <mesh
            name="Object_4"
            castShadow
            receiveShadow
            geometry={nodes.Object_4.geometry}
            material={materials.Sword}
            position={[0.176, 0.206, -0.078]}
            rotation={[3.066, 0.633, 0.397]}
            scale={0.653}
          />
          <primitive object={nodes.GLTF_created_0_rootJoint} />
          <skinnedMesh
            name="Object_9"
            geometry={nodes.Object_9.geometry}
            material={materials.Material}
            skeleton={nodes.Object_9.skeleton}
          />
          <skinnedMesh
            name="Object_10"
            geometry={nodes.Object_10.geometry}
            material={materials.material_0}
            skeleton={nodes.Object_10.skeleton}
          />
        </group>
      </group>

      {icons.map((icon, index) => (
        <group
          key={index}
          ref={(el) => (iconsRef.current[index] = el)}
          position={[0, 0, 0]}
        >
          <Html distanceFactor={5}>
            <a
              href={icon.url}
              target="_blank"
              rel="noopener noreferrer"
              className={isPaused ? "pause" : ""}
              style={{
                fontSize: "48px",
                color: "#fff",
                background: "rgba(0, 0, 0, 0.5)",
                padding: "15px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textDecoration: "none",
                transition: "transform 0.3s ease-in-out",
              }}
              onMouseEnter={(e) => {
                setIsPaused(true);
                e.currentTarget.style.transform = "scale(1.4)";
                e.currentTarget.querySelector("span").style.visibility = "visible";
              }}
              onMouseLeave={(e) => {
                setIsPaused(false);
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.querySelector("span").style.visibility = "hidden";
              }}
            >
              <img
                src={icon.icon}
                alt={icon.label}
                style={{
                  width: "80px",
                  height: "80px",
                }}
              />
              <span
                style={{
                  position: "absolute",
                  bottom: "-30px",
                  fontSize: "20px",
                  color: "#fff",
                  visibility: "hidden",
                  transition: "visibility 0.3s",
                }}
              >
                {icon.label}
              </span>
            </a>
          </Html>
        </group>
      ))}
    </>
  );
}

useGLTF.preload("/models/Boy-avt/boy_warrior/scene-transformed.glb");
