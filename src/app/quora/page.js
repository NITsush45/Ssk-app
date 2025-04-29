"use client";
import Navigation from "@/components/navigation";
import React, { useState, useEffect } from "react";
import Footer from "../projects/footer";

const QuoraProfileViewer = () => {
  const [animate, setAnimate] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const profileUrl = "https://www.quora.com/profile/Sushant-Kumar-3122";

  // Animation trigger effects
  useEffect(() => {
    if (typeof window !== 'undefined') {
    // Initial animation
    setAnimate(true);

    // Mouse move effect for parallax
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    }
  };
  }, []);

  // Styling with enhanced animations
  const styles = {
    main: {
      width: "100%",
      height: "100vh",
      overflow: "auto",
      scrollbarWidth: "none",
      background: `url('/background/quo.jpg') no-repeat center center, 
                  linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)`,
      backgroundSize: "cover",
      backgroundBlendMode: "soft-light",
      padding: "15px",
      marginTop: "25px",
      paddingBottom: "15px",
      transition: "all 1.2s cubic-bezier(0.22, 1, 0.36, 1)",
      position: "relative",
      display: "flex",
      flexDirection: "column",
      animation: "backgroundPulse 15s infinite alternate",
    },
    contentWrapper: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      padding: "20px 0",
      perspective: "1000px",
    },
    overlay: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: `
        radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(255, 0, 128, 0.3), transparent 40%), 
        radial-gradient(circle at ${100 - mousePosition.x * 100}% ${100 - mousePosition.y * 100}%, rgba(255, 215, 0, 0.3), transparent 40%),
        radial-gradient(circle at 50% 50%, rgba(0, 128, 255, 0.2), transparent 70%)
      `,
      animation: "glowPulse 8s infinite alternate",
      zIndex: 1,
      pointerEvents: "none",
      transition: "background 0.5s ease",
    },
    content: {
      position: "relative",
      zIndex: 2,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "30px",
      fontFamily: '"Segoe UI", Roboto, sans-serif',
      maxWidth: "900px",
      margin: "20px auto",
      backgroundColor: "rgba(255, 255, 255, 0.85)",
      backdropFilter: "blur(15px)",
      borderRadius: "24px",
      boxShadow:
        "0 15px 35px rgba(0, 0, 0, 0.2), 0 0 25px rgba(255, 255, 255, 0.5), inset 0 0 15px rgba(255, 255, 255, 0.5)",
      border: "1px solid rgba(255, 255, 255, 0.3)",
      transform: animate
        ? `translateY(0) rotateX(0) translateX(${(mousePosition.x - 0.5) * -20}px) translateY(${(mousePosition.y - 0.5) * -10}px)`
        : "translateY(80px) rotateX(15deg)",
      opacity: animate ? 1 : 0,
      transition:
        "all 1.5s cubic-bezier(0.175, 0.885, 0.32, 1.275), transform 0.3s ease",
      animation: animate ? "floatAnimation 6s ease-in-out infinite" : "none",
    },
    header: {
      width: "100%",
      textAlign: "center",
      marginBottom: "25px",
      animation: animate ? "fadeInScale 1.2s forwards" : "none",
    },
    title: {
      fontSize: "42px",
      fontWeight: "700",
      margin: "10px 0",
      background: "linear-gradient(45deg, #ff3366, #ff9933, #33ccff, #9933ff)",
      backgroundSize: "300% 300%",
      backgroundClip: "text",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      textShadow: "0 0 15px rgba(255, 255, 255, 0.5)",
      letterSpacing: "1px",
      animation:
        "gradientFlow 10s ease infinite, textPulse 3s infinite alternate",
    },
    redirectContainer: {
      padding: "40px 20px",
      textAlign: "center",
      borderRadius: "16px",
      background:
        "linear-gradient(135deg, rgba(255,255,255,0.7), rgba(255,255,255,0.4))",
      backdropFilter: "blur(8px)",
      boxShadow:
        "0 10px 30px rgba(0, 0, 0, 0.1), inset 0 0 15px rgba(255, 255, 255, 0.3)",
      transform: animate ? "translateY(0)" : "translateY(40px)",
      opacity: animate ? 1 : 0,
      transition: "all 1.2s cubic-bezier(0.19, 1, 0.22, 1) 0.2s",
      animation: animate ? "borderGlow 4s infinite alternate" : "none",
    },
    actionButton: {
      padding: "16px 35px",
      background: "linear-gradient(45deg, #ff3366, #ff9933)",
      backgroundSize: "200% 200%",
      color: "white",
      border: "none",
      borderRadius: "30px",
      cursor: "pointer",
      fontSize: "18px",
      fontWeight: "600",
      boxShadow:
        "0 8px 20px rgba(255, 51, 102, 0.4), 0 0 15px rgba(255, 51, 102, 0.2)",
      transition: "all 0.5s cubic-bezier(0.19, 1, 0.22, 1)",
      position: "relative",
      overflow: "hidden",
      animation: animate ? "pulseButton 2s infinite" : "none",
    },
    contentFooter: {
      marginTop: "40px",
      fontSize: "16px",
      color: "#666",
      textAlign: "center",
      width: "100%",
      padding: "20px",
      borderTop: "1px solid rgba(255, 255, 255, 0.5)",
      background:
        "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)",
      backgroundSize: "200% 100%",
      transform: animate ? "translateY(0)" : "translateY(30px)",
      opacity: animate ? 1 : 0,
      transition: "all 1s ease 0.5s",
      animation: animate ? "shine 3s infinite" : "none",
    },
  };

  // Enhanced keyframes with super animations
  const keyframes = `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes fadeInScale {
      from { opacity: 0; transform: scale(0.8); }
      to { opacity: 1; transform: scale(1); }
    }
    
    @keyframes floatIn {
      0% { opacity: 0; transform: translateY(-20px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes gradientFlow {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    
    @keyframes textPulse {
      0% { letter-spacing: 1px; }
      100% { letter-spacing: 2px; }
    }
    
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    @keyframes shine {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
    
    @keyframes pulseButton {
      0% { transform: scale(1); box-shadow: 0 8px 20px rgba(255, 51, 102, 0.4), 0 0 15px rgba(255, 51, 102, 0.2); }
      50% { transform: scale(1.05); box-shadow: 0 12px 25px rgba(255, 51, 102, 0.5), 0 0 20px rgba(255, 51, 102, 0.3); }
      100% { transform: scale(1); box-shadow: 0 8px 20px rgba(255, 51, 102, 0.4), 0 0 15px rgba(255, 51, 102, 0.2); }
    }
    
    @keyframes floatAnimation {
      0% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
      100% { transform: translateY(0); }
    }
    
    @keyframes glowPulse {
      0% { opacity: 0.6; }
      50% { opacity: 0.9; }
      100% { opacity: 0.6; }
    }
    
    @keyframes backgroundPulse {
      0% { background-color: rgba(106, 17, 203, 0.4); }
      100% { background-color: rgba(37, 117, 252, 0.4); }
    }
    
    @keyframes borderGlow {
      0% { box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1), inset 0 0 15px rgba(255, 255, 255, 0.3); }
      100% { box-shadow: 0 15px 40px rgba(106, 17, 203, 0.2), inset 0 0 25px rgba(255, 153, 51, 0.4); }
    }
    
    @keyframes particleDrift {
      0% { transform: translateY(0) rotate(0deg); }
      100% { transform: translateY(-20px) rotate(360deg); }
    }
  `;

  // Particle system component
  const ParticleSystem = () => {
    const particles = [];
    const particleCount = 20;

    for (let i = 0; i < particleCount; i++) {
      const size = Math.random() * 6 + 2;
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      const delay = Math.random() * 5;
      const duration = Math.random() * 10 + 10;
      const opacity = Math.random() * 0.5 + 0.1;

      particles.push(
        <div
          key={i}
          style={{
            position: "absolute",
            width: `${size}px`,
            height: `${size}px`,
            borderRadius: "50%",
            background: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${opacity})`,
            left: `${left}%`,
            top: `${top}%`,
            boxShadow: `0 0 ${size * 2}px rgba(255, 255, 255, 0.8)`,
            animation: `particleDrift ${duration}s infinite alternate ease-in-out`,
            animationDelay: `${delay}s`,
            zIndex: 0,
            pointerEvents: "none",
          }}
        />
      );
    }

    return <>{particles}</>;
  };

  const openQuoraProfile = () => window.open(profileUrl, "_blank");

  return (
    <>
      <style>{keyframes}</style>
      <Navigation />
      <div style={styles.main}>
        <div style={styles.overlay}></div>
        <ParticleSystem />

        <div style={styles.contentWrapper}>
          <div style={styles.content}>
            <div style={styles.header}>
              <h1 style={styles.title}>Quora Profile</h1>
              <p
                style={{
                  color: "#444",
                  fontSize: "18px",
                  opacity: animate ? 1 : 0,
                  transition: "opacity 1.2s ease, transform 1.2s ease",
                  transform: animate ? "translateY(0)" : "translateY(20px)",
                  background: "rgba(255, 255, 255, 0.5)",
                  padding: "8px 16px",
                  borderRadius: "20px",
                  display: "inline-block",
                  boxShadow: "0 5px 15px rgba(0, 0, 0, 0.05)",
                  textShadow: "0 1px 2px rgba(255, 255, 255, 0.8)",
                  animation: animate
                    ? "fadeInUp 1s forwards 0.5s, floatAnimation 6s 1.5s ease-in-out infinite"
                    : "none",
                }}
              >
                Viewing profile: Sushant Kumar
              </p>
            </div>

            <div style={styles.redirectContainer}>
              <h2
                style={{
                  marginBottom: "25px",
                  color: "#333",
                  fontSize: "28px",
                  background: "linear-gradient(45deg, #ff3366, #ff9933)",
                  backgroundSize: "200% 200%",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  animation: animate ? "gradientFlow 8s ease infinite" : "none",
                  transform: animate ? "translateY(0)" : "translateY(20px)",
                  opacity: animate ? 1 : 0,
                  transition: "all 1s ease 0.2s",
                }}
              >
                Visit Quora Profile
              </h2>
              <p
                style={{
                  marginBottom: "30px",
                  fontSize: "18px",
                  lineHeight: "1.6",
                  color: "#444",
                }}
              >
                Please click the button below to view the complete profile.
              </p>
              <button
                style={styles.actionButton}
                onClick={openQuoraProfile}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 12px 25px rgba(255, 51, 102, 0.5), 0 0 20px rgba(255, 51, 102, 0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 8px 20px rgba(255, 51, 102, 0.4), 0 0 15px rgba(255, 51, 102, 0.2)";
                }}
              >
                Open Ssk&apos;s Quora Profile
              </button>
            </div>
          </div>
        </div>
        <div
          style={{
            bottom: 0,
            left: 0,
            right: 0,
            width: "100%",
            zIndex: 1000,
          }}
        >
          <Footer />
        </div>
      </div>
    </>
  );
};

export default QuoraProfileViewer;
