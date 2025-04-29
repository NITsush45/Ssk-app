"use client";
import React, { useEffect, useState, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import Navigation from "@/components/navigation";
import Footer from "../projects/footer";

const Achievements = () => {
  const [activeCard, setActiveCard] = useState(null);
  const [imageErrors, setImageErrors] = useState({});
  const controls = useAnimation();
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: false, amount: 0.3 });

  useEffect(() => {
    if (isHeaderInView) {
      controls.start("visible");
    }
  }, [controls, isHeaderInView]);

  // More dynamic variants for animations
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -70 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 70,
        damping: 12,
        mass: 1
      }
    }
  };

  // More dynamic card animations
  const cardVariants = {
    hidden: (i) => ({
      opacity: 0,
      y: 50,
      x: i % 2 === 0 ? -20 : 20,
      scale: 0.8,
      rotateY: i % 2 === 0 ? -5 : 5
    }),
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      rotateY: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 80,
        duration: 0.8
      }
    },
    hover: {
      y: -15,
      scale: 1.03,
      rotateY: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  const underlineVariants = {
    hidden: { width: "0%", opacity: 0 },
    visible: {
      width: "150px",
      opacity: 1,
      transition: {
        delay: 0.5,
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  // Expanded color scheme with more variety
  const colorMap = {
    emerald: {
      border: "linear-gradient(135deg, #047857, #10b981)",
      glow: "rgba(5, 150, 105, 0.5)",
      text: "#ecfdf5",
      accent: "#34d399"
    },
    amber: {
      border: "linear-gradient(135deg, #b45309, #f59e0b)",
      glow: "rgba(217, 119, 6, 0.5)",
      text: "#fffbeb",
      accent: "#fbbf24"
    },
    sky: {
      border: "linear-gradient(135deg, #0369a1, #0ea5e9)",
      glow: "rgba(14, 165, 233, 0.5)",
      text: "#f0f9ff",
      accent: "#38bdf8"
    },
    purple: {
      border: "linear-gradient(135deg, #6b21a8, #a855f7)",
      glow: "rgba(168, 85, 247, 0.5)",
      text: "#faf5ff",
      accent: "#c084fc"
    },
    rose: {
      border: "linear-gradient(135deg, #9f1239, #e11d48)",
      glow: "rgba(225, 29, 72, 0.5)",
      text: "#fff1f2",
      accent: "#fb7185"
    },
    indigo: {
      border: "linear-gradient(135deg, #3730a3, #6366f1)",
      glow: "rgba(99, 102, 241, 0.5)",
      text: "#eef2ff",
      accent: "#818cf8"
    }
  };

  // Updated achievements with new color scheme
  const achievements = [
    {
      id: 1,
      text: "Received an <strong>SDE offer</strong> from the <strong>Sashakt Bharat Abhiyan Scheme</strong> under the Government of India.",
      color: "emerald",
      imgSrc: "/background/SDE-sashakt.png",
      fallbackImgSrc: "/api/placeholder/280/160"
    },
    {
      id: 2,
      text: "Certified in the <strong>National Anveshika Experimental Skill Test</strong> by Prof. H.C. Verma and <strong>IIT-Kanpur</strong>.",
      color: "sky",
      imgSrc: "/background/NAEST.png",
      fallbackImgSrc: "/api/placeholder/280/160"
    },
    {
      id: 3,
      text: "Secured <strong>AIR 724</strong> & state rank <strong>103</strong> in the <strong>2020 National Science Talent Search Examination</strong>.",
      color: "purple",
      imgSrc: "/background/NSTSE.png",
      fallbackImgSrc: "/api/placeholder/280/160"
    },
    {
      id: 4,
      text: "Got <strong>96.96%</strong> in Young Turks Placement Competition sponsored by <strong>Naukri Campus</strong>",
      color: "amber",
      imgSrc: "/background/turk.png",
      fallbackImgSrc: "/api/placeholder/280/160"
    },
    {
      id: 5,
      text: "Got certified by <strong>Harvard University</strong> for a Quiz Competition",
      color: "indigo",
      imgSrc: "/background/harvard.png",
      fallbackImgSrc: "/api/placeholder/280/160"
    },
    {
      id: 6,
      text: "Got admission in <strong>Cornell University</strong> & qualified TATA Scholarship",
      color: "rose",
      imgSrc: "/background/cornell.png",
      fallbackImgSrc: "/api/placeholder/280/160"
    }
  ];

  // Main container styles - modified to ensure scrolling works
  const mainContainerStyles = {
    width: "100%",
    height: "100vh",
    overflow: "auto",
    scrollbarWidth:"none",
    position: "relative"
  };

  // Enhanced animated background styles
  const pageWrapperStyles = {
    width: "100%",
    minHeight: "100%",
    background: `
      linear-gradient(217deg, rgba(15,23,42,0.9), rgba(30,41,59,0.9)),
      radial-gradient(at 60% 20%, rgba(16,185,129,0.15) 0px, transparent 50%),
      radial-gradient(at 20% 80%, rgba(245,158,11,0.15) 0px, transparent 50%),
      radial-gradient(at 90% 70%, rgba(225,29,72,0.15) 0px, transparent 50%)
    `,
    backgroundSize: "400% 400%",
    animation: "gradientShift 15s ease infinite"
  };

  // New staggered layout using masonry grid concept
  const contentContainerStyles = {
    padding: "3rem 1.5rem",
    maxWidth: "1400px",
    margin: "0 auto",
    position: "relative",
    zIndex: 10
  };

  // Enhanced header styles
  const headerStyles = {
    textAlign: "center",
    marginBottom: "4.5rem",
    position: "relative"
  };

  const titleStyles = {
    fontSize: "clamp(2.5rem, 6vw, 4rem)",
    fontWeight: "900",
    background: "linear-gradient(90deg, #10b981 0%, #38bdf8 30%, #a855f7 65%, #e11d48 100%)",
    backgroundSize: "300% auto",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    color: "transparent",
    letterSpacing: "-0.02em",
    marginBottom: "0.75rem",
    textShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
    animation: "shimmerTitle 5s linear infinite"
  };

  const underlineStyles = {
    height: "6px",
    background: "linear-gradient(90deg, #10b981 0%, #38bdf8 30%, #a855f7 65%, #e11d48 100%)",
    backgroundSize: "300% auto",
    borderRadius: "6px",
    margin: "0.5rem auto 0",
    boxShadow: "0 4px 12px rgba(16, 185, 129, 0.3)",
    animation: "shimmerTitle 5s linear infinite"
  };

  // Dynamic masonry-like grid layout
  const gridStyles = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(330px, 1fr))",
    gap: "2.5rem",
    position: "relative",
    marginTop: "1rem"
  };

  // 3D floating card styles
  const getBoxStyles = (color, isActive) => ({
    background: "rgba(17, 25, 40, 0.75)",
    backdropFilter: "blur(16px)",
    borderRadius: "1.25rem",
    boxShadow: isActive
      ? `0 15px 30px rgba(0, 0, 0, 0.4), 0 0 15px ${colorMap[color].glow}, inset 0 1px 1px rgba(255, 255, 255, 0.1)`
      : "0 8px 20px rgba(0, 0, 0, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.05)",
    padding: "1.75rem",
    transition: "all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
    transform: isActive ? "translateZ(30px)" : "translateZ(0px)",
    perspective: "1000px",
    backfaceVisibility: "hidden"
  });

  // Animated gradient border
  const getBoxGradientStyles = (color) => ({
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "6px",
    background: colorMap[color].border,
    borderTopLeftRadius: "1.25rem",
    borderTopRightRadius: "1.25rem",
    animation: "shimmerGradient 3s infinite"
  });

  // Floating numbered badge
  const getNumberBadgeStyles = (color) => ({
    height: "3.5rem",
    width: "3.5rem",
    borderRadius: "50%",
    background: colorMap[color].border,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "1.25rem",
    boxShadow: `0 8px 16px rgba(0, 0, 0, 0.3), 0 0 12px ${colorMap[color].glow}`,
    border: "2px solid rgba(255, 255, 255, 0.15)"
  });

  const getNumberStyles = (color) => ({
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: "1.5rem",
    textShadow: `0 2px 5px rgba(0, 0, 0, 0.3)`
  });

  const textStyles = {
    textAlign: "center",
    color: "rgba(255, 255, 255, 0.9)",
    fontSize: "1.075rem",
    marginBottom: "1.5rem",
    lineHeight: "1.7"
  };

  // Skewed image container
  const imageContainerStyles = {
    width: "100%",
    height: "180px",
    borderRadius: "1rem",
    overflow: "hidden",
    marginTop: "1rem",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    position: "relative",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
    transition: "all 0.5s ease",
    transform: "perspective(1000px) rotateX(3deg)"
  };

  const imageStyles = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center",
    display: "block",
    transition: "transform 0.6s ease, filter 0.6s ease",
    filter: "brightness(0.85) contrast(1.15) saturate(1.2)"
  };

  // Floating particles background
  const particlesBackgroundStyles = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: "hidden",
    pointerEvents: "none",
    zIndex: 0
  };

  const handleImageError = (id) => {
    setImageErrors(prev => ({
      ...prev,
      [id]: true
    }));
  };

  // Enhanced global CSS styles
  const globalStyles = `
    html, body {
      margin: 0;
      padding: 0;
      height: 100%;
      overflow: hidden;
    }
    
    @keyframes gradientShift {
      0% { background-position: 0% 0% }
      25% { background-position: 50% 50% }
      50% { background-position: 100% 100% }
      75% { background-position: 50% 50% }
      100% { background-position: 0% 0% }
    }
    
    @keyframes shimmerTitle {
      0% { background-position: 0% 50% }
      50% { background-position: 100% 50% }
      100% { background-position: 0% 50% }
    }
    
    @keyframes shimmerGradient {
      0% { opacity: 0.8; }
      50% { opacity: 1; }
      100% { opacity: 0.8; }
    }

    @keyframes float {
      0% { transform: translateY(0px) rotate(0deg) }
      33% { transform: translateY(-10px) rotate(1deg) }
      66% { transform: translateY(-5px) rotate(-1deg) }
      100% { transform: translateY(0px) rotate(0deg) }
    }

    @keyframes pulse {
      0% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.05); opacity: 0.8; }
      100% { transform: scale(1); opacity: 1; }
    }
    
    @keyframes floatParticle {
      0% { transform: translate(0, 0) rotate(0deg); opacity: 0.8; }
      25% { opacity: 0.6; }
      50% { transform: translate(var(--x), var(--y)) rotate(var(--r)); opacity: 1; }
      75% { opacity: 0.6; }
      100% { transform: translate(0, 0) rotate(0deg); opacity: 0.8; }
    }
  `;

  // Render floating particles for the background
  const renderParticles = () => {
    const particles = [];
    const colors = Object.keys(colorMap).map(key => colorMap[key].accent);
    
    for (let i = 0; i < 30; i++) {
      const size = Math.random() * 6 + 2;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const duration = Math.random() * 20 + 10;
      const delay = Math.random() * 5;
      
      const particleStyle = {
        position: "absolute",
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: "50%",
        backgroundColor: color,
        opacity: Math.random() * 0.3 + 0.1,
        top: `${y}%`,
        left: `${x}%`,
        filter: `blur(${Math.random() * 2}px)`,
        boxShadow: `0 0 ${size * 2}px ${color}`,
        animation: `floatParticle ${duration}s ease-in-out ${delay}s infinite`,
        "--x": `${(Math.random() * 80 - 40)}px`,
        "--y": `${(Math.random() * 80 - 40)}px`,
        "--r": `${(Math.random() * 360)}deg`
      };
      
      particles.push(<div key={i} style={particleStyle} />);
    }
    
    return particles;
  };

  return (
    <>
      <style>{globalStyles}</style>
      <Navigation/>
      <div style={mainContainerStyles}>
        <div style={pageWrapperStyles}>
          <div style={particlesBackgroundStyles}>
            {renderParticles()}
          </div>
          
          <div style={contentContainerStyles}>
            <motion.div
              ref={headerRef}
              variants={headerVariants}
              initial="hidden"
              animate={isHeaderInView ? "visible" : "hidden"}
              style={headerStyles}
            >
              <h2 style={titleStyles}>My Achievements</h2>
              <motion.div 
                variants={underlineVariants}
                initial="hidden"
                animate={isHeaderInView ? "visible" : "hidden"}
                style={underlineStyles}
              ></motion.div>
            </motion.div>

            <motion.div
              variants={container}
              initial="hidden"
              animate={controls}
              style={gridStyles}
            >
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  style={getBoxStyles(achievement.color, activeCard === achievement.id)}
                  onHoverStart={() => setActiveCard(achievement.id)}
                  onHoverEnd={() => setActiveCard(null)}
                  whileTap={{ scale: 0.95 }}
                >
                  <div style={getBoxGradientStyles(achievement.color)}></div>
                  <motion.div 
                    style={getNumberBadgeStyles(achievement.color)}
                    animate={{ 
                      y: [0, -10, 0],
                      scale: activeCard === achievement.id ? [1, 1.1, 1] : 1,
                      boxShadow: activeCard === achievement.id ? 
                        [
                          `0 8px 16px rgba(0, 0, 0, 0.3), 0 0 12px ${colorMap[achievement.color].glow}`,
                          `0 12px 24px rgba(0, 0, 0, 0.4), 0 0 20px ${colorMap[achievement.color].glow}`,
                          `0 8px 16px rgba(0, 0, 0, 0.3), 0 0 12px ${colorMap[achievement.color].glow}`
                        ] : 
                        `0 8px 16px rgba(0, 0, 0, 0.3), 0 0 12px ${colorMap[achievement.color].glow}`
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 3,
                      repeatType: "loop" 
                    }}
                  >
                    <span style={getNumberStyles(achievement.color)}>{achievement.id}</span>
                  </motion.div>
                  
                  <motion.div
                    style={textStyles}
                    dangerouslySetInnerHTML={{ __html: achievement.text }}
                    animate={{ 
                      color: activeCard === achievement.id ? "rgba(255, 255, 255, 1)" : "rgba(255, 255, 255, 0.9)"
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  <motion.div 
                    style={imageContainerStyles}
                    whileHover={{ 
                      boxShadow: `0 15px 30px rgba(0, 0, 0, 0.4), 0 0 15px ${colorMap[achievement.color].glow}`,
                      transform: "perspective(1000px) rotateX(0deg)"
                    }}
                  >
                    {!imageErrors[achievement.id] ? (
                      <motion.img 
                        src={achievement.imgSrc} 
                        alt={`Achievement ${achievement.id}`} 
                        style={imageStyles}
                        onError={() => handleImageError(achievement.id)}
                        whileHover={{ 
                          scale: 1.08,
                          filter: "brightness(1.1) contrast(1.2) saturate(1.3)" 
                        }}
                        transition={{ duration: 0.5 }}
                      />
                    ) : (
                      <motion.img 
                        src={achievement.fallbackImgSrc} 
                        alt={`Achievement ${achievement.id} (fallback)`} 
                        style={imageStyles}
                        whileHover={{ 
                          scale: 1.08,
                          filter: "brightness(1.1) contrast(1.2) saturate(1.3)" 
                        }}
                        transition={{ duration: 0.5 }}
                      />
                    )}
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
        <Footer/>
      </div>
    </>
  );
};

export default Achievements;