import React from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";

const footerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.8,
      when: "beforeChildren",
      staggerChildren: 0.2
    }
  }
};

const footerChildVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

// New icon animation variants
const iconVariants = {
  hover: (custom) => ({
    scale: 1.25,
    rotate: custom % 2 === 0 ? [0, -10, 10, -5, 0] : [0, 10, -10, 5, 0],
    color: custom === 0 ? "#6e5494" : custom === 1 ? "#0077b5" : "#34d399",
    transition: {
      scale: { type: "spring", stiffness: 300, damping: 10 },
      rotate: { duration: 0.5 },
      color: { duration: 0.2 }
    }
  }),
  tap: {
    scale: 0.9,
    transition: { duration: 0.1 }
  },
  initial: {
    scale: 1,
    color: "white",
    rotate: 0
  }
}

// Icon floating animation
const floatingAnimation = {
  y: [0, -5, 0, -3, 0],
  transition: {
    duration: 3,
    repeat: Infinity,
    repeatType: "mirror"
  }
};

const Footer = () => {
  return (
    <motion.footer
      className="w-full relative z-10"
      variants={footerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      style={{
        backgroundColor: "#1a202c",
        color: "white",
        padding: "10px",
        textAlign: "center",
        position: "relative",
        marginTop: "2rem",
        overflow: "hidden"
      }}
    >
      <motion.div
        style={{
          position: "absolute",
          top: -100,
          left: 0,
          width: "100%",
          height: "100px",
          background: "linear-gradient(to bottom, transparent, rgba(17, 24, 39, 0.9))"
        }}
      />
      
      {/* Animated divider before footer */}
      <motion.div
        style={{
          height: "1px",
          width: "100%",
          background: "linear-gradient(90deg, transparent, #F7AB0A, transparent)",
          marginBottom: "2rem"
        }}
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1.5 }}
      />
      
      {/* Animated stars/particles in footer */}
      <motion.div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 3 + 1,
              height: Math.random() * 3 + 1,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.7,
            }}
            animate={{
              opacity: [0, 0.8, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: Math.random() * 2 + 2,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
          />
        ))}
      </motion.div>
      
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Social Media Links - Enhanced with advanced animations */}
        <motion.div 
          variants={footerChildVariants}
          style={{ display: "flex", justifyContent: "center", gap: "40px", marginBottom: "1px" }}
        >
          {[
            { href: "https://github.com/NITsush45", icon: <FaGithub />, color: "#6e5494", index: 0 },
            { href: "https://www.linkedin.com/in/sushant-kumar-6b547328b/", icon: <FaLinkedin />, color: "#0077b5", index: 1 },
            { href: "mailto:sushiitantmi45@gmail.com", icon: <FaEnvelope />, color: "#34d399", index: 2 },
          ].map(({ href, icon, color, index }, idx) => (
            <motion.a
              key={idx}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "white",
                fontSize: "22px",
                display: "inline-block",
                position: "relative"
              }}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              variants={iconVariants}
              custom={index}
              animate={floatingAnimation}
            >
              {/* Icon glow effect on hover */}
              <motion.div
                className="absolute inset-0 rounded-full"
                initial={{ opacity: 0, scale: 1 }}
                whileHover={{ 
                  opacity: 0.6, 
                  scale: 1.8,
                  backgroundColor: color,
                  filter: "blur(8px)"
                }}
                transition={{ duration: 0.3 }}
              />
              {/* Icon symbol */}
              <motion.div className="relative z-10">
                {icon}
              </motion.div>
            </motion.a>
          ))}
        </motion.div>

        {/* Additional Links */}
        <motion.div 
          variants={footerChildVariants}
          style={{ display: "flex", justifyContent: "center", gap: "20px", marginBottom: "1px" }}
        >
          {[
            { href: "/terms", text: "Terms & Conditions" },
            { href: "/privacy", text: "Privacy Policy" },
            { href: "/aboutcomp", text: "About ItemArtz" },
          ].map(({ href, text }, idx) => (
            <a
              key={idx}
              href={href}
              style={{
                fontSize: "14px",
                color: "#a0aec0",
                textDecoration: "none",
                transition: "color 0.3s, border-bottom 0.3s",
              }}
              onMouseOver={(e) => {
                e.target.style.color = "white";
                e.target.style.borderBottom = "2px solid white";
              }}
              onMouseOut={(e) => {
                e.target.style.color = "#a0aec0";
                e.target.style.borderBottom = "none";
              }}
            >
              {text}
            </a>
          ))}
        </motion.div>

        {/* Copyright */}
        <motion.div 
          style={{
            padding: "1rem 0",
            textAlign: "center",
            width: "100%"
          }}
          variants={footerChildVariants}
        >
          <motion.p
            style={{ color: "#9ca3af", fontSize: "0.875rem" }}
            whileHover={{ color: "#F7AB0A" }}
          >
            © {new Date().getFullYear()} Sushant Kesarwani - All Rights Reserved made with
            <motion.span
              style={{ 
                display: "inline-block",
                margin: "0 0.25rem",
                color: "#F7AB0A"
              }}
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity,
                repeatDelay: 3
              }}
            >
              ❤️
            </motion.span>
            and passion by SSK
          </motion.p>
        </motion.div>
      </div>

      {/* Keyframes for fade-in animation */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </motion.footer>
  );
};

export default Footer;