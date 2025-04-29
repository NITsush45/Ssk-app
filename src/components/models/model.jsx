"use client";
import React, { useRef, useState, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";

export default function Model(props) {
  const group = useRef();
  const modelRef = useRef();
  const iconsRef = useRef([]);
  const [rotation, setRotation] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [iconSize, setIconSize] = useState(80);
  const { viewport } = useThree();

  const { nodes, materials, animations } = useGLTF(
    "/models/Boy-avt/boy_warrior/scene-transformed.glb"
  );
  const { actions } = useAnimations(animations, group);

  // Adjust radius based on viewport width to keep icons in view
  const radius = Math.min(1, viewport.width / 8);
  const angleIncrement = 360 / 5;

  // Handle resize to make icons responsive
  useEffect(() => {
    if (typeof window !== 'undefined') {
    const handleResize = () => {
      // Adjust icon size based on viewport width
      const newSize = Math.min(80, viewport.width * 15);
      setIconSize(newSize);
    };

    handleResize(); // Initial calculation
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  };
  }, [viewport.width]);

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
          // Position icons within the specified radius - Y position is now negative to place below
          icon.position.x = radius * Math.cos(angle);
          icon.position.z = radius * Math.sin(angle);
          // Position icons below the model
          icon.position.y = -0.5;
          
          // Make sure icons always face the camera
          icon.rotation.y = -angle + Math.PI;
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
      url: "/resume/ssk_resume.pdf",
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
          position={[0, -1.5, 0]}
        >
          <Html
            distanceFactor={5}
            position={[0, 0, 0]}
            transform
            occlude={modelRef}
            zIndexRange={[100, 0]}
          >
            <div
              style={{
                width: `${iconSize}px`,
                height: `${iconSize}px`,
                position: "relative",
                transform: "translate(-50%, -50%)",
              }}
            >
              <a
                href={icon.url}
                target="_blank"
                rel="noopener noreferrer"
                className={isPaused ? "pause" : ""}
                style={{
                  width: "40%",
                  height: "40%",
                  color: "#fff",
                  background: "rgba(0, 0, 0, 0.5)",
                  padding: "5px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textDecoration: "none",
                  transition: "transform 0.3s ease-in-out",
                  boxSizing: "border-box",
                }}
                onMouseEnter={(e) => {
                  setIsPaused(true);
                  e.currentTarget.style.transform = "scale(1.2)";
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
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
                <span
                  style={{
                    position: "absolute",
                    bottom: "-25px",
                    fontSize: "8px",
                    fontWeight: "bold",
                    color: "#fff",
                    textShadow: "0 0 3px black, 0 0 3px black",
                    visibility: "hidden",
                    transition: "visibility 0.3s",
                    whiteSpace: "nowrap",
                    textAlign: "center",
                    width: "100%",
                  }}
                >
                  {icon.label}
                </span>
              </a>
            </div>
          </Html>
        </group>
      ))}
    </>
  );
}

useGLTF.preload("/models/Boy-avt/boy_warrior/scene-transformed.glb");