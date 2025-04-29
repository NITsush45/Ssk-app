"use client";
import React, { useEffect, useState } from "react";
import { BtnList } from "@/components/projects/data";

const Navigation = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
    setLoaded(true);
    };
  }, []);

  return (
    <nav
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 9999,
        padding: "1rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "20px",
        transition: "all 0.8s ease-in-out",
        transform: loaded ? "translateY(0)" : "translateY(-100px)", // Slide-in animation
        opacity: loaded ? 1 : 0, // Fade-in animation
        boxShadow: "0 5px 15px rgba(0, 255, 255, 0.3)", // Glowing effect
      }}
    >
      {BtnList.map((btn, index) => (
        <button
          key={index}
          onClick={() => {
            if (btn.link) {
              if (btn.newTab) {
                window.open(btn.link, "_blank", "noopener noreferrer");
              } else {
                window.location.href = btn.link;
              }
            }
          }}
          className="text-white font-lobster font-medium transition-all"
          style={{
            background: btn.gradient || "linear-gradient(45deg, #fcb045, #fd1d1d, #833ab4)",
            border: "none",
            color: btn.Color || "#FFFF00",
            textDecoration: "none",
            cursor: "pointer",
            padding: "0.7rem 1rem",
            width: "120px",
            height: "45px",
            fontSize: "1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "12px",
            transition: "all 0.4s ease-in-out",
            backgroundSize: "200% auto",
            boxShadow: "0 5px 15px rgba(255, 165, 0, 0.4)",
            transform: loaded ? "scale(1)" : "scale(0.5)",
            opacity: loaded ? 1 : 0,
            animation: `pulse 2s infinite ease-in-out ${index * 0.2}s`,
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundPosition = "right center";
            e.target.style.color = "#000000";
            e.target.style.transform = "scale(1.20) rotate(0.4deg)";
            e.target.style.boxShadow = "0px 0px 25px rgba(255,255,255,0.8)";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundPosition = "left center";
            e.target.style.color = btn.Color || "#FFFF00";
            e.target.style.transform = "scale(1) rotate(0deg)";
            e.target.style.boxShadow = "0 5px 15px rgba(255, 165, 0, 0.4)";
          }}
          onMouseDown={(e) => {
            e.target.style.transform = "scale(0.9)"; // Click shrink effect
          }}
          onMouseUp={(e) => {
            e.target.style.transform = "scale(1.1)"; // Slight bounce back
          }}
        >
          {btn.icon ? <span className={`icon-${btn.icon} mr-2`}></span> : null}
          {btn.label}
        </button>
      ))}
    </nav>
  );
};

export default Navigation;
