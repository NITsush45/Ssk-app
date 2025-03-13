"use client";
import React, { useEffect, useState } from "react";

const createRaindrop = () => ({
  id: Math.random(),
  left: `${Math.random() * 100}%`,
  animationDuration: `${Math.random() * 2 + 1}s`,
  animationDelay: `${Math.random() * 2}s`,
});

const Animatedbg = () => {
  const [raindrops, setRaindrops] = useState([]);

  useEffect(() => {
    const initialRaindrops = Array.from({ length: 50 }, createRaindrop);
    setRaindrops(initialRaindrops);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none">
      {raindrops.map((raindrop) => (
        <div
          key={raindrop.id}
          className="raindrop"
          style={{
            left: raindrop.left,
            animationDuration: raindrop.animationDuration,
            animationDelay: raindrop.animationDelay,
          }}
        ></div>
      ))}
    </div>
  );
};

export default Animatedbg;
