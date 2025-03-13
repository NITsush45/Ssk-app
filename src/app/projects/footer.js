import React from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "#1a202c",
        color: "white",
        padding: "10px",
        textAlign: "center",
        width: "100%",
        animation: "fadeIn 1s ease-in-out",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Social Media Links */}
        <div style={{ display: "flex", justifyContent: "center", gap: "40px", marginBottom: "1px" }}>
          {[
            { href: "https://github.com/NITsush45", icon: <FaGithub />, color: "#6e5494" },
            { href: "https://www.linkedin.com/in/sushant-kumar-6b547328b/", icon: <FaLinkedin />, color: "#0077b5" },
            { href: "mailto:sushiitantmi45@gmail.com", icon: <FaEnvelope />, color: "#34d399" },
          ].map(({ href, icon, color }, idx) => (
            <a
              key={idx}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "white",
                fontSize: "22px",
                transition: "transform 0.3s ease, color 0.3s",
                display: "inline-block",
              }}
              onMouseOver={(e) => {
                e.target.style.transform = "scale(1.25)";
                e.target.style.color = color;
              }}
              onMouseOut={(e) => {
                e.target.style.transform = "scale(1)";
                e.target.style.color = "white";
              }}
            >
              {icon}
            </a>
          ))}
        </div>

        {/* Additional Links */}
        <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginBottom: "1px" }}>
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
        </div>

        {/* Copyright */}
        <p style={{ fontSize: "12px", opacity: "0.8", marginBottom: "1px" }}>
          &copy; {new Date().getFullYear()} Sushant Keshri. All rights reserved.
        </p>
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
    </footer>
  );
};

export default Footer;
