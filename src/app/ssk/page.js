"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import Navigation from "@/components/navigation";
import Footer from "../projects/footer";

const WebchatPreview = () => {
  const controls = useAnimation();
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: false, amount: 0.3 });
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [currentBackgroundUrl, setCurrentBackgroundUrl] = useState(0);
  
  // Array of background URLs for the dynamic background
  const backgroundUrls = [
    "/background/projbg.jpg",
    "/background/codebg.jpg",
    "/background/cdbg.jpg",
    "/background/projbg.jpg"
  ];

  // Effect for handling cursor movement to create interactive elements
  useEffect(() => {
    if (typeof window !== 'undefined') {
    const handleMouseMove = (e) => {
      setCursorPosition({
        x: e.clientX,
        y: e.clientY
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  };
  }, []);

  // Effect for cycling through background images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBackgroundUrl((prev) => (prev + 1) % backgroundUrls.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isHeaderInView) {
      controls.start("visible");
    }
  }, [controls, isHeaderInView]);

  // Enhanced animation variants
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

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 80,
        duration: 0.8,
        delay: 0.3
      }
    },
    hover: {
      y: -15,
      scale: 1.05,
      boxShadow: "0 25px 50px rgba(0, 0, 0, 0.5), 0 0 25px rgba(16, 185, 129, 0.4)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  const iframeVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.9,
      y: 30,
      rotateY: 15
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      rotateY: 0,
      transition: {
        type: "spring",
        stiffness: 60,
        damping: 15,
        delay: 0.5,
        duration: 1
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

  // Single bot data
  const bot = {
    name: "SSK-Bot",
    description: "A comprehensive & interactive service Bot that handles common inquiries and troubleshooting with natural language understanding.",
    color: "emerald",
    previewUrl: "https://cdn.botpress.cloud/webchat/v2/shareable.html?botId=c35e3576-f277-4270-ae82-0f813a22c3c9"
  };

  // Enhanced color scheme
  const botColor = {
    border: "linear-gradient(135deg, #047857, #10b981)",
    glow: "rgba(5, 150, 105, 0.5)",
    text: "#ecfdf5",
    accent: "#34d399"
  };

  // Main container styles for scrolling
  const mainContainerStyles = {
    width: "100%",
    height: "100vh",
    overflow: "auto",
    scrollbarWidth: "none",
    position: "relative"
  };

  // Enhanced background styles with image URL
  const pageWrapperStyles = {
    width: "100%",
    minHeight: "100%",
    background: `
      linear-gradient(217deg, rgba(0,0,0,0.85), rgba(0,0,0,0.7)),
      url(${backgroundUrls[currentBackgroundUrl]})
    `,
    backgroundSize: "cover",
    backgroundPosition: "center",
    transition: "background-image 1.5s ease-in-out",
    position: "relative",
    overflow: "hidden"
  };

  // Content container styles
  const contentContainerStyles = {
    padding: "3rem 1.5rem",
    maxWidth: "1400px",
    margin: "0 auto",
    position: "relative",
    zIndex: 10
  };

  // Header styles
  const headerStyles = {
    textAlign: "center",
    marginBottom: "4rem",
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

  const subtitleStyles = {
    fontSize: "1.25rem",
    color: "rgba(255, 255, 255, 0.9)",
    maxWidth: "700px",
    margin: "1rem auto 2rem",
    lineHeight: "1.6",
    textShadow: "0 2px 10px rgba(0, 0, 0, 0.5)"
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

  // Layout styles
  const layoutContainerStyles = {
    display: "grid",
    gridTemplateColumns: "1fr 1.5fr",
    gap: "2rem",
    position: "relative"
  };

  // Enhanced bot card styles with glass morphism
  const botCardStyles = {
    background: "rgba(17, 25, 40, 0.8)",
    backdropFilter: "blur(16px)",
    borderRadius: "1.5rem",
    boxShadow: `0 15px 30px rgba(0, 0, 0, 0.4), 0 0 15px ${botColor.glow}, inset 0 1px 1px rgba(255, 255, 255, 0.1)`,
    padding: "2rem",
    transition: "all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)",
    border: `1px solid ${botColor.accent}`,
    cursor: "pointer",
    height: "fit-content",
    position: "relative",
    overflow: "hidden"
  };

  // Bot name styles
  const botNameStyles = {
    fontSize: "1.75rem",
    fontWeight: "700",
    marginBottom: "1rem",
    background: botColor.border,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text"
  };

  // Bot description styles
  const botDescriptionStyles = {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: "1.1rem",
    lineHeight: "1.7"
  };

  // Enhanced preview container styles
  const previewContainerStyles = {
    background: "rgba(17, 25, 40, 0.8)",
    backdropFilter: "blur(16px)",
    borderRadius: "1.25rem",
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4), 0 0 20px rgba(16, 185, 129, 0.2)",
    overflow: "hidden",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    display: "flex",
    flexDirection: "column",
    height: "600px",
    perspective: "1000px",
    position: "relative"
  };

  // Preview header styles
  const previewHeaderStyles = {
    padding: "1rem 1.5rem",
    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: botColor.border
  };

  // Preview title styles
  const previewTitleStyles = {
    color: "white",
    fontSize: "1.25rem",
    fontWeight: "600"
  };

  // Preview iframe container styles
  const iframeContainerStyles = {
    flex: 1,
    padding: "0",
    position: "relative",
    backgroundColor: "#f5f5f5",
    borderBottomLeftRadius: "1.25rem",
    borderBottomRightRadius: "1.25rem",
    overflow: "hidden"
  };

  // Iframe styles
  const iframeStyles = {
    width: "100%",
    height: "100%",
    border: "none"
  };

  // Particles background styles
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

  // Global styles with enhanced animations
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
    
    @keyframes floatParticle {
      0% { transform: translate(0, 0) rotate(0deg); opacity: 0.8; }
      25% { opacity: 0.6; }
      50% { transform: translate(var(--x), var(--y)) rotate(var(--r)); opacity: 1; }
      75% { opacity: 0.6; }
      100% { transform: translate(0, 0) rotate(0deg); opacity: 0.8; }
    }

    @keyframes pulse {
      0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
      70% { box-shadow: 0 0 0 15px rgba(16, 185, 129, 0); }
      100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
    }
    
    @keyframes fadeInOut {
      0% { opacity: 0.2; }
      50% { opacity: 0.8; }
      100% { opacity: 0.2; }
    }
    
    @keyframes rotateGradient {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    @keyframes morphBackground {
      0% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
      50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
      100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
    }
  `;

  // Enhanced particle renderer with cursor interactivity
  const renderParticles = () => {
    const particles = [];
    
    for (let i = 0; i < 40; i++) {
      const size = Math.random() * 6 + 2;
      const color = i % 3 === 0 ? "#38bdf8" : i % 3 === 1 ? "#a855f7" : botColor.accent;
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

  // Background gradient orbs for enhanced visual effects
  const renderGradientOrbs = () => {
    const orbs = [];
    
    for (let i = 0; i < 3; i++) {
      const size = 300 + Math.random() * 200;
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      const hue1 = i === 0 ? "10, 185, 129" : i === 1 ? "56, 189, 248" : "225, 29, 72";
      const hue2 = i === 0 ? "5, 150, 105" : i === 1 ? "37, 99, 235" : "168, 85, 247";
      const duration = 15 + Math.random() * 10;
      const delay = i * 3;
      
      const orbStyle = {
        position: "absolute",
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: "50%",
        background: `radial-gradient(circle at center, rgba(${hue1}, 0.15) 0%, rgba(${hue2}, 0.05) 50%, transparent 70%)`,
        top: `${posY}%`,
        left: `${posX}%`,
        transform: "translate(-50%, -50%)",
        filter: "blur(50px)",
        opacity: 0.7,
        animation: `morphBackground ${duration}s ease-in-out ${delay}s infinite alternate, fadeInOut ${duration/2}s ease-in-out ${delay/2}s infinite alternate`
      };
      
      orbs.push(<div key={`orb-${i}`} style={orbStyle} />);
    }
    
    return orbs;
  };

  // Interactive cursor effect
  const renderCursorEffect = () => {
    return (
      <div 
        style={{
          position: "absolute",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "radial-gradient(circle at center, rgba(16, 185, 129, 0.15) 0%, transparent 70%)",
          pointerEvents: "none",
          transform: `translate(${cursorPosition.x - 150}px, ${cursorPosition.y - 150}px)`,
          filter: "blur(20px)",
          zIndex: 1,
          transition: "transform 0.15s ease-out"
        }}
      />
    );
  };

  // Enhanced button with animation
  const AnimatedButton = ({ text, style }) => {
    return (
      <motion.div 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          background: botColor.border,
          border: "none",
          color: "white",
          padding: "0.75rem 1.25rem",
          borderRadius: "0.75rem",
          cursor: "pointer",
          fontSize: "1rem",
          marginTop: "2rem",
          textAlign: "center",
          boxShadow: "0 10px 20px rgba(5, 150, 105, 0.3)",
          fontWeight: "500",
          animation: "pulse 2s infinite",
          position: "relative",
          overflow: "hidden",
          ...style
        }}
      >
        <div 
          style={{
            position: "absolute",
            top: "-50%",
            left: "-50%",
            width: "200%",
            height: "200%",
            background: "radial-gradient(circle at center, rgba(255,255,255,0.2) 0%, transparent 60%)",
            transform: `translate(${(cursorPosition.x / window.innerWidth) * 100 - 50}%, ${(cursorPosition.y / window.innerHeight) * 100 - 50}%)`,
            pointerEvents: "none"
          }}
        />
        {text}
      </motion.div>
    );
  };

  return (
    <>
      <style>{globalStyles}</style>
      <Navigation/>
      <div style={mainContainerStyles}>
        <div style={pageWrapperStyles}>
          <div style={particlesBackgroundStyles}>
            {renderGradientOrbs()}
            {renderParticles()}
            {renderCursorEffect()}
          </div>
          
          <div style={contentContainerStyles}>
            <motion.div
              ref={headerRef}
              variants={headerVariants}
              initial="hidden"
              animate={isHeaderInView ? "visible" : "hidden"}
              style={headerStyles}
            >
              <h2 style={titleStyles}>SSK-Drake</h2>
              <motion.div 
                variants={underlineVariants}
                initial="hidden"
                animate={isHeaderInView ? "visible" : "hidden"}
                style={underlineStyles}
              ></motion.div>
              <p style={subtitleStyles}>
                Experience my own substitute chatbot in action.
                See how it interacts with you effectively and makes your all doubt clear.
              </p>
            </motion.div>

            <div style={layoutContainerStyles}>
              {/* Enhanced Bot Card */}
              <motion.div
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                style={botCardStyles}
                whileTap={{ scale: 0.98 }}
              >
                {/* Card Highlight Effect */}
                <div 
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "5px",
                    background: botColor.border,
                    borderTopLeftRadius: "1.5rem",
                    borderTopRightRadius: "1.5rem"
                  }}
                ></div>
                
                <h3 style={botNameStyles}>{bot.name}</h3>
                <p style={botDescriptionStyles}>{bot.description}</p>
                
                <AnimatedButton text="See on the right side for Ssk-drake" />
              </motion.div>

              {/* Enhanced Preview Area with Animations */}
              <motion.div 
                style={previewContainerStyles}
                variants={iframeVariants}
                initial="hidden"
                animate="visible"
              >
                <div style={previewHeaderStyles}>
                  <div style={previewTitleStyles}>
                    {bot.name} Preview
                  </div>
                  <AnimatedButton 
                    text="Refresh" 
                    style={{
                      padding: "0.5rem 0.75rem",
                      marginTop: 0,
                      fontSize: "0.85rem",
                      background: "rgba(255,255,255,0.2)",
                      animation: "none"
                    }}
                  />
                </div>
                <motion.div 
                  style={iframeContainerStyles}
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: 1,
                    transition: { delay: 1.2, duration: 0.8 }
                  }}
                >
                  <iframe 
                    src={bot.previewUrl}
                    style={iframeStyles}
                    title={`${bot.name} Preview`}
                    allow="microphone"
                  />
                </motion.div>
              </motion.div>
            </div>
          </div>
          
          {/* Background image attribution - small text at bottom */}
          <div style={{
            position: "absolute",
            bottom: "10px",
            right: "10px",
            fontSize: "0.7rem",
            color: "rgba(255,255,255,0.5)",
            zIndex: 10
          }}>
            @ssk-drake
          </div>
        </div>
        <Footer/>
      </div>
    </>
  );
};

export default WebchatPreview;