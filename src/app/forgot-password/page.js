"use client";
import React, { useState, useEffect, useRef } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase-config";
import { useRouter } from "next/navigation";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [animationPhase, setAnimationPhase] = useState(0);
  const [buttonHover, setButtonHover] = useState(false);
  const canvasRef = useRef(null);
  
  // Control the animated background phase
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationPhase(prev => (prev + 1) % 6);
    }, 4000);
    return () => clearInterval(interval);
  }, []);
  
  // Interactive particle background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = 100;
    const colors = ['#8b5cf6', '#6366f1', '#3b82f6', '#06b6d4', '#10b981', '#f472b6'];
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 5 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedX: Math.random() * 2 - 1,
        speedY: Math.random() * 2 - 1,
        opacity: Math.random() * 0.5 + 0.2
      });
    }
    
    // Mouse interaction
    let mouse = {
      x: null,
      y: null,
      radius: 150
    };
    
    window.addEventListener('mousemove', (e) => {
      mouse.x = e.x;
      mouse.y = e.y;
    });
    
    // Animation function
    function animate() {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particles.length; i++) {
        let p = particles[i];
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.floor(p.opacity * 255).toString(16).padStart(2, '0');
        ctx.fill();
        
        // Connect particles within range
        for (let j = i; j < particles.length; j++) {
          let p2 = particles[j];
          let distance = Math.sqrt(Math.pow(p.x - p2.x, 2) + Math.pow(p.y - p2.y, 2));
          
          if (distance < 120) {
            ctx.beginPath();
            ctx.strokeStyle = p.color + Math.floor((1 - distance/120) * 40).toString(16).padStart(2, '0');
            ctx.lineWidth = 0.5;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
        
        // Mouse interaction
        if (mouse.x && mouse.y) {
          let dx = p.x - mouse.x;
          let dy = p.y - mouse.y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < mouse.radius) {
            const angle = Math.atan2(dy, dx);
            const force = (mouse.radius - distance) / mouse.radius;
            
            p.x += Math.cos(angle) * force * 2;
            p.y += Math.sin(angle) * force * 2;
          }
        }
        
        // Update position
        p.x += p.speedX;
        p.y += p.speedY;
        
        // Bounce off edges
        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
      }
    }
    
    animate();
    
    // Handle window resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('mousemove', () => {});
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset e-mail sent. Check your inbox.");
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  // Animated background gradient styles based on phase
  const gradientStyles = {
    backgroundImage: 
      animationPhase === 0 ? "linear-gradient(135deg, #6366f1, #3b82f6, #06b6d4, #10b981)" :
      animationPhase === 1 ? "linear-gradient(135deg, #8b5cf6, #6366f1, #3b82f6, #06b6d4)" :
      animationPhase === 2 ? "linear-gradient(135deg, #ec4899, #8b5cf6, #6366f1, #3b82f6)" :
      animationPhase === 3 ? "linear-gradient(135deg, #f43f5e, #ec4899, #8b5cf6, #6366f1)" :
      animationPhase === 4 ? "linear-gradient(135deg, #f97316, #f43f5e, #ec4899, #8b5cf6)" :
      "linear-gradient(135deg, #eab308, #f97316, #f43f5e, #ec4899)",
    backgroundSize: "300% 300%",
    animation: "gradientAnimation 15s ease infinite",
    transition: "background-image 2s cubic-bezier(0.4, 0, 0.2, 1)",
  };
  
  return (
    <div style={{
      ...gradientStyles,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      width: "100%",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Canvas for interactive particle background */}
      <canvas 
        ref={canvasRef} 
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 1
        }}
      />

      {/* Animated orbs with glow */}
      {[...Array(10)].map((_, i) => (
        <div key={i} style={{
          position: "absolute",
          width: `${Math.random() * 200 + 100}px`,
          height: `${Math.random() * 200 + 100}px`,
          borderRadius: "50%",
          background: `radial-gradient(circle, 
            ${['#8b5cf6', '#6366f1', '#3b82f6', '#06b6d4', '#ec4899'][Math.floor(Math.random() * 5)]}88 0%, 
            rgba(255, 255, 255, 0) 70%)`,
          filter: "blur(20px)",
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          opacity: 0.7,
          zIndex: 2,
          animation: `floatOrb ${Math.random() * 20 + 30}s ease-in-out infinite, 
                      pulseGlow ${Math.random() * 5 + 5}s ease-in-out infinite alternate`,
          animationDelay: `${Math.random() * 10}s`,
        }}></div>
      ))}

      {/* Card container with enhanced animation */}
      <div style={{
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        backdropFilter: "blur(20px)",
        padding: "2.5rem",
        borderRadius: "1.5rem",
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.3), 0 0 30px rgba(79, 70, 229, 0.2)",
        width: "100%",
        maxWidth: "450px",
        zIndex: 10,
        transform: "translateY(0)",
        opacity: 1,
        transition: "transform 0.5s ease, box-shadow 0.5s ease",
        animation: "cardEntryAnimation 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Animated card border glow */}
        <div style={{
          position: "absolute",
          inset: "0px",
          borderRadius: "1.5rem",
          padding: "2px",
          background: `linear-gradient(45deg, 
            transparent 0%, 
            rgba(79, 70, 229, 0.6) 50%, 
            transparent 100%)`,
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          animation: "borderGlow 4s linear infinite",
        }}></div>

        <h2 style={{
          fontSize: "2rem",
          fontWeight: "700",
          marginBottom: "1.75rem",
          textAlign: "center",
          background: "linear-gradient(to right, #3b82f6, #8b5cf6, #d946ef)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          animation: "titleGlow 3s ease-in-out infinite",
          textShadow: "0 0 20px rgba(79, 70, 229, 0.3)",
          position: "relative",
        }}>
          Forgot Password
          <div style={{
            width: "60px",
            height: "4px",
            background: "linear-gradient(to right, #3b82f6, #8b5cf6)",
            margin: "0.5rem auto 0",
            borderRadius: "2px",
            animation: "widthPulse 2s ease-in-out infinite",
          }}></div>
        </h2>
        
        <form onSubmit={handleSubmit} style={{
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
        }}>
          <div style={{
            position: "relative",
            animation: "fadeInUp 0.8s ease-out forwards",
            animationDelay: "0.4s",
            opacity: 0,
            transform: "translateY(20px)",
          }}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "1rem 1.25rem",
                borderRadius: "0.75rem",
                border: "2px solid #e2e8f0",
                fontSize: "1rem",
                transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                outline: "none",
                boxShadow: "0 4px 10px -1px rgba(0, 0, 0, 0.05)",
                transform: "translateY(0)",
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                color: "#000000"
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#4f46e5";
                e.target.style.boxShadow = "0 0 0 4px rgba(79, 70, 229, 0.25), 0 4px 10px rgba(0, 0, 0, 0.1)";
                e.target.style.transform = "translateY(-3px)";
                e.target.style.backgroundColor = "rgba(255, 255, 255, 0.95)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#e2e8f0";
                e.target.style.boxShadow = "0 4px 10px -1px rgba(0, 0, 0, 0.05)";
                e.target.style.transform = "translateY(0)";
                e.target.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
              }}
            />
            
            {/* Input label animation */}
            <div style={{
              position: "absolute",
              bottom: "-8px",
              left: "14px",
              fontSize: "0.75rem",
              padding: "0 5px",
              backgroundColor: "white",
              color: "#6366f1",
              opacity: email ? 1 : 0,
              transition: "opacity 0.3s ease",
            }}>Email Address</div>
          </div>
          
          <button
            type="submit"
            disabled={loading}
            style={{
              position: "relative",
              padding: "1rem 1.5rem",
              borderRadius: "0.75rem",
              background: `linear-gradient(45deg, #4f46e5, #6366f1 50%, #4f46e5)`,
              backgroundSize: "200% 200%",
              color: "white",
              fontWeight: "600",
              border: "none",
              cursor: loading ? "wait" : "pointer",
              transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
              boxShadow: buttonHover 
                ? "0 10px 25px -3px rgba(79, 70, 229, 0.5), 0 4px 12px -2px rgba(0, 0, 0, 0.2)" 
                : "0 4px 12px -1px rgba(79, 70, 229, 0.3)",
              transform: buttonHover ? "translateY(-4px)" : "translateY(0)",
              opacity: loading ? 0.8 : 1,
              animation: "fadeInUp 0.8s ease-out forwards, gradientShift 8s linear infinite",
              animationDelay: "0.6s",
              overflow: "hidden",
              letterSpacing: "0.5px",
              fontSize: "1.05rem",
            }}
            onMouseEnter={() => setButtonHover(true)}
            onMouseLeave={() => setButtonHover(false)}
          >
            {/* Button background pulse effect */}
            <div style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0) 100%)",
              transform: "translateX(-100%)",
              animation: buttonHover ? "shimmer 1.5s infinite" : "none",
              borderRadius: "0.75rem",
            }}></div>
            
            {loading ? (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
                <svg style={{ 
                  animation: "spin 1s linear infinite",
                  height: "1.5rem", 
                  width: "1.5rem" 
                }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
              </div>
            ) : (
              <div style={{display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem"}}>
                <span style={{position: "relative", zIndex: 1}}>Reset Password</span>
                <svg style={{
                  width: "18px", 
                  height: "18px",
                  transition: "transform 0.3s ease",
                  transform: buttonHover ? "translateX(4px)" : "translateX(0)"
                }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                </svg>
              </div>
            )}
          </button>
        </form>
        
        {/* Success message with enhanced animation */}
        {message && (
          <div style={{
            padding: "1rem",
            borderRadius: "0.75rem",
            backgroundColor: "rgba(16, 185, 129, 0.1)",
            color: "#10b981",
            marginTop: "1.25rem",
            textAlign: "center",
            animation: "messageSlideIn 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
            border: "1px solid rgba(16, 185, 129, 0.2)",
            boxShadow: "0 0 20px rgba(16, 185, 129, 0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
          }}>
            <svg style={{width: "20px", height: "20px"}} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            {message}
          </div>
        )}
        
        {/* Error message with enhanced animation */}
        {error && (
          <div style={{
            padding: "1rem",
            borderRadius: "0.75rem",
            backgroundColor: "rgba(239, 68, 68, 0.1)",
            color: "#ef4444",
            marginTop: "1.25rem",
            textAlign: "center",
            animation: "messageSlideIn 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
            border: "1px solid rgba(239, 68, 68, 0.2)",
            boxShadow: "0 0 20px rgba(239, 68, 68, 0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
          }}>
            <svg style={{width: "20px", height: "20px"}} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            {error}
          </div>
        )}
        
        {/* Back to login button with enhanced hover animation */}
        <button
          onClick={() => router.push("/login")}
          style={{
            marginTop: "1.5rem",
            width: "100%",
            textAlign: "center",
            color: "#4f46e5",
            background: "none",
            border: "none",
            cursor: "pointer",
            fontWeight: "500",
            padding: "0.75rem",
            borderRadius: "0.75rem",
            transition: "all 0.3s ease",
            animation: "fadeInUp 0.8s ease-out forwards",
            animationDelay: "0.8s",
            opacity: 0,
            transform: "translateY(20px)",
            position: "relative",
            overflow: "hidden",
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "rgba(79, 70, 229, 0.1)";
            e.target.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "transparent";
            e.target.style.transform = "translateY(0)";
          }}
        >
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
          }}>
            <svg style={{
              width: "18px", 
              height: "18px",
              transition: "transform 0.3s ease",
            }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 17l-5-5m0 0l5-5m-5 5h12"></path>
            </svg>
            Back to Login
          </div>
        </button>
      </div>

      {/* Enhanced keyframes for animations */}
      <style jsx global>{`
        @keyframes gradientAnimation {
          0% { background-position: 0% 50% }
          50% { background-position: 100% 50% }
          100% { background-position: 0% 50% }
        }
        
        @keyframes gradientShift {
          0% { background-position: 0% 50% }
          50% { background-position: 100% 50% }
          100% { background-position: 0% 50% }
        }
        
        @keyframes floatOrb {
          0% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(50px, -50px) rotate(120deg); }
          66% { transform: translate(-30px, 30px) rotate(240deg); }
          100% { transform: translate(0, 0) rotate(360deg); }
        }
        
        @keyframes pulseGlow {
          0% { opacity: 0.4; transform: scale(0.8); }
          100% { opacity: 0.7; transform: scale(1.1); }
        }
        
        @keyframes fadeInUp {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes cardEntryAnimation {
          0% { transform: translateY(50px); opacity: 0; }
          30% { transform: translateY(-10px); opacity: 0.8; }
          60% { transform: translateY(5px); opacity: 0.9; }
          100% { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
        
        @keyframes titleGlow {
          0% { opacity: 0.9; text-shadow: 0 0 10px rgba(99, 102, 241, 0.3); }
          50% { opacity: 1; text-shadow: 0 0 20px rgba(99, 102, 241, 0.5), 0 0 30px rgba(79, 70, 229, 0.3); }
          100% { opacity: 0.9; text-shadow: 0 0 10px rgba(99, 102, 241, 0.3); }
        }
        
        @keyframes widthPulse {
          0% { width: 40px; opacity: 0.6; }
          50% { width: 80px; opacity: 1; }
          100% { width: 40px; opacity: 0.6; }
        }
        
        @keyframes borderGlow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes messageSlideIn {
          0% { transform: translateY(-20px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes floatBubble {
          0% { transform: translate(0, 0) rotate(0deg); opacity: 0; }
          10% { opacity: 0.8; }
          90% { opacity: 0.8; }
          100% { transform: translate(100px, -100vh) rotate(360deg); opacity: 0; }
        }
        
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default ForgotPassword;