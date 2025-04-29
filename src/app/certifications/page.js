"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Footer from "../projects/footer";
import Navigation from "@/components/navigation";

const Certifications = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [imageErrors, setImageErrors] = useState({});
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
    setIsVisible(true);
    
    // Add parallax scroll effect listener
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const parallaxElements = document.querySelectorAll(".parallax-bg");
      
      parallaxElements.forEach((elem) => {
        const speed = elem.getAttribute("data-speed");
        elem.style.transform = `translateY(${scrollTop * speed}px)`;
      });
    };
    
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    }
  };
  }, []);

  // Animation variants
  const animations = {
    container: {
      hidden: { opacity: 0 },
      show: {
        opacity: 1,
        transition: {
          staggerChildren: 0.15,
          delayChildren: 0.3
        }
      }
    },
    
    item: {
      hidden: { opacity: 0, y: 50, scale: 0.9 },
      show: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          type: "spring",
          stiffness: 100,
          damping: 12,
          duration: 0.8
        }
      }
    },
    
    title: {
      hidden: { opacity: 0, y: -50 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          type: "spring",
          stiffness: 100,
          damping: 15,
          duration: 1
        }
      }
    }
  };

  // Color palette
  const colors = {
    teal: {
      border: "linear-gradient(90deg, #14b8a6 0%, #2dd4bf 100%)",
      background: "linear-gradient(135deg, #f0fdfa 0%, #ccfbf1 100%)",
      text: "#0f766e",
      glow: "0 0 15px rgba(20, 184, 166, 0.5)"
    },
    amber: {
      border: "linear-gradient(90deg, #f59e0b 0%, #fbbf24 100%)",
      background: "linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)",
      text: "#b45309",
      glow: "0 0 15px rgba(245, 158, 11, 0.5)"
    },
    rose: {
      border: "linear-gradient(90deg, #e11d48 0%, #fb7185 100%)",
      background: "linear-gradient(135deg, #fff1f2 0%, #ffe4e6 100%)",
      text: "#be123c",
      glow: "0 0 15px rgba(225, 29, 72, 0.5)"
    },
    emerald: {
      border: "linear-gradient(90deg, #10b981 0%, #34d399 100%)",
      background: "linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)",
      text: "#065f46",
      glow: "0 0 15px rgba(16, 185, 129, 0.5)"
    },
    orange: {
      border: "linear-gradient(90deg, #f97316 0%, #fb923c 100%)",
      background: "linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)",
      text: "#c2410c",
      glow: "0 0 15px rgba(249, 115, 22, 0.5)"
    }
  };

  // Certification data
  const certifications = [
    {
      id: 1,
      text: "Geeksters-SQL Certificate",
      color: "teal",
      imgSrc: "/background/sql.png",
      fallbackImgSrc: "/api/placeholder/280/160"
    },
    {
      id: 2,
      text: "Geeksters-JavaScript Certificate",
      color: "amber",
      imgSrc: "/background/js.png",
      fallbackImgSrc: "/api/placeholder/280/160"
    },
    {
      id: 3,
      text: "Great Learning- AI/ML Certificate",
      color: "rose",
      imgSrc: "/background/ML.png",
      fallbackImgSrc: "/api/placeholder/280/160"
    },
    {
      id: 4,
      text: "Geeksters- HTML/CSS Certificate",
      color: "emerald",
      imgSrc: "/background/html.png",
      fallbackImgSrc: "/api/placeholder/280/160"
    },
    {
      id: 5,
      text: "Postman Certificate & License",
      color: "orange",
      imgSrc: "/background/Postman.png",
      fallbackImgSrc: "/api/placeholder/280/160"
    },
  ];

  // Styles
  const styles = {
    pageWrapper: {
      width: "100%",
      height: "100vh",
      overflow: "auto",
      scrollbarWidth: "none",
      background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
      position: "relative"
    },
    
    contentContainer: {
      padding: "2rem",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
      minHeight: "100%",
      paddingTop: "5vh",
      paddingBottom: "5vh",
      position: "relative",
      zIndex: 1
    },
    
    header: {
      width: "100%",
      textAlign: "center",
      marginBottom: "3rem",
      position: "relative"
    },
    
    title: {
      fontSize: "3rem",
      fontWeight: "800",
      background: "linear-gradient(90deg, #10b981 0%, #f97316 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      color: "transparent",
      marginTop: "50px",
      textShadow: "0 5px 15px rgba(16, 185, 129, 0.2)"
    },
    
    underline: {
      height: "6px",
      width: "120px",
      background: "linear-gradient(90deg, #10b981 0%, #f97316 100%)",
      margin: "0.5rem auto 0",
      borderRadius: "3px",
      boxShadow: "0 4px 8px rgba(16, 185, 129, 0.3)"
    },
    
    grid: {
      width: "100%",
      maxWidth: "1200px",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
      gap: "2rem",
      marginTop: "2rem"
    },
    
    overlay: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "linear-gradient(135deg, rgba(240, 253, 250, 0.05) 0%, rgba(249, 250, 251, 0.1) 100%)",
      zIndex: 0
    },
    
    bubble: {
      position: "absolute",
      borderRadius: "50%",
      filter: "blur(15px)",
      opacity: 0.15,
      background: "linear-gradient(90deg, #10b981 0%, #f97316 100%)"
    },
    
    text: {
      textAlign: "center",
      color: "#334155",
      fontSize: "1.1rem",
      fontWeight: "600",
      marginBottom: "1.25rem",
      position: "relative",
      zIndex: 1
    }
  };

  // Dynamic style getters
  const getBoxStyle = (color, isHovered) => ({
    background: "rgba(255, 255, 255, 0.9)",
    borderRadius: "1rem",
    boxShadow: isHovered 
      ? `0 20px 30px rgba(0, 0, 0, 0.15), ${colors[color].glow}` 
      : "0 8px 15px rgba(0, 0, 0, 0.08)",
    padding: "1.5rem",
    transition: "all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
    borderTop: "none",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.18)"
  });

  const getCardDecoratorStyle = (color) => ({
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "6px",
    background: colors[color].border,
    borderTopLeftRadius: "1rem",
    borderTopRightRadius: "1rem"
  });

  const getNumberBadgeStyle = (color, isHovered) => ({
    height: "3rem",
    width: "3rem",
    borderRadius: "50%",
    background: colors[color].background,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "1rem",
    boxShadow: isHovered 
      ? `0 0 15px ${colors[color].text}40` 
      : "0 4px 8px rgba(0, 0, 0, 0.05)",
    transition: "all 0.5s ease",
    transform: isHovered ? "scale(1.1)" : "scale(1)"
  });

  const getNumberStyle = (color) => ({
    color: colors[color].text,
    fontWeight: "800",
    fontSize: "1.25rem"
  });

  const getImageContainerStyle = (isHovered) => ({
    width: "100%",
    height: "180px",
    borderRadius: "0.75rem",
    overflow: "hidden",
    marginTop: "0.75rem",
    border: "1px solid rgba(229, 231, 235, 0.5)",
    position: "relative",
    transition: "all 0.5s ease",
    transform: isHovered ? "scale(1.05)" : "scale(1)",
    boxShadow: isHovered 
      ? "0 15px 25px rgba(0, 0, 0, 0.2)" 
      : "0 5px 10px rgba(0, 0, 0, 0.05)"
  });

  const getBubbleStyle = (position, size, colorGradient, speed) => ({
    ...styles.bubble,
    ...position,
    width: size.width,
    height: size.height,
    background: colorGradient,
    className: "parallax-bg",
    "data-speed": speed
  });

  const imageStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center",
    display: "block",
    transition: "all 0.5s ease"
  };

  const handleImageError = (id) => {
    setImageErrors(prev => ({
      ...prev,
      [id]: true
    }));
  };

  return (
    <div style={styles.pageWrapper}>
      <Navigation />
      
      {/* Animated background elements */}
      <div style={getBubbleStyle(
        { top: "10%", left: "5%" },
        { width: "250px", height: "250px" },
        "linear-gradient(90deg, #14b8a6 0%, #10b981 100%)",
        "0.05"
      )} className="parallax-bg" data-speed="0.05"></div>
      
      <div style={getBubbleStyle(
        { top: "60%", right: "10%" },
        { width: "300px", height: "300px" },
        "linear-gradient(90deg, #f59e0b 0%, #f97316 100%)",
        "-0.08"
      )} className="parallax-bg" data-speed="-0.08"></div>
      
      <div style={getBubbleStyle(
        { bottom: "10%", left: "25%" },
        { width: "200px", height: "200px" },
        "linear-gradient(90deg, #e11d48 0%, #fb7185 100%)",
        "0.03"
      )} className="parallax-bg" data-speed="0.03"></div>
      
      <div style={styles.overlay}></div>
      
      <div style={styles.contentContainer}>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={animations.title}
          style={styles.header}
        >
          <motion.h2 
            style={styles.title}
            whileHover={{ 
              scale: 1.05,
              textShadow: "0 8px 25px rgba(16, 185, 129, 0.4)" 
            }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
          >
            My Certificates & Licenses
          </motion.h2>
          <motion.div 
            style={styles.underline}
            initial={{ width: 0 }}
            animate={{ width: "120px" }}
            transition={{ 
              delay: 0.5, 
              duration: 0.8, 
              type: "spring",
              stiffness: 100, 
              damping: 15 
            }}
          ></motion.div>
        </motion.div>

        <motion.div
          variants={animations.container}
          initial="hidden"
          animate={isVisible ? "show" : "hidden"}
          style={styles.grid}
        >
          {certifications.map((certification) => (
            <motion.div
              key={certification.id}
              variants={animations.item}
              style={getBoxStyle(certification.color, hoveredCard === certification.id)}
              whileHover={{
                y: -10
              }}
              onHoverStart={() => setHoveredCard(certification.id)}
              onHoverEnd={() => setHoveredCard(null)}
            >
              <div style={getCardDecoratorStyle(certification.color)}></div>
              
              <motion.div 
                style={getNumberBadgeStyle(certification.color, hoveredCard === certification.id)}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <span style={getNumberStyle(certification.color)}>{certification.id}</span>
              </motion.div>
              
              <motion.div
                style={styles.text}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
              >
                {certification.text}
              </motion.div>
              
              <motion.div style={getImageContainerStyle(hoveredCard === certification.id)}>
                {!imageErrors[certification.id] ? (
                  <motion.img 
                    src={certification.imgSrc} 
                    alt={`Certificate ${certification.id}`} 
                    style={imageStyle}
                    onError={() => handleImageError(certification.id)}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  />
                ) : (
                  <motion.img 
                    src={certification.fallbackImgSrc} 
                    alt={`Certificate ${certification.id} (fallback)`} 
                    style={imageStyle}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  />
                )}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default Certifications;