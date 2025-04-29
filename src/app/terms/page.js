'use client';

import React, { useState, useEffect } from 'react';

export default function TermsAndConditions() {
  const [animate, setAnimate] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
    setAnimate(true);
    
    // Add scroll animations
    const handleScroll = () => {
      const sections = document.querySelectorAll('.term-section');
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) {
          section.style.opacity = "1";
          section.style.transform = "translateY(0)";
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
};
  }, []);

  // Staggered animation delay calculator
  const getDelay = (index) => `${0.2 + (index * 0.1)}s`;
  
  // Interactive section toggle
  const toggleSection = (index) => {
    setActiveSection(activeSection === index ? null : index);
  };
  
  const terms = [
    {
      title: "1. Acceptance of Terms",
      content: "By accessing or using our platform, you agree to be bound by these terms. If you do not agree with any part of the terms, you must not use our services."
    },
    {
      title: "2. Use of Services",
      content: "You must be at least 18 years old to use our services. You agree not to misuse our website or services."
    },
    {
      title: "3. Privacy Policy",
      content: "Your privacy is important to us. Please review our Privacy Policy to understand how we collect and use your information."
    },
    {
      title: "4. Changes to Terms",
      content: "We reserve the right to update these terms at any time. Your continued use of the website signifies your acceptance of the revised terms."
    },
    {
      title: "5. Contact Us",
      content: "If you have any questions about these terms, please contact us at sushiitantmi45@gmail.com."
    }
  ];

  // Background animation elements
  const bubbles = [...Array(15)].map((_, i) => ({
    size: Math.random() * 100 + 50,
    left: Math.random() * 100,
    animationDuration: Math.random() * 20 + 10,
    animationDelay: Math.random() * 5,
    opacity: Math.random() * 0.1 + 0.03
  }));
  
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #e4edf5 100%)',
      textAlign: 'center',
      padding: '1.5rem',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated background bubbles */}
      {bubbles.map((bubble, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            borderRadius: '50%',
            backgroundColor: '#3b82f6',
            opacity: bubble.opacity,
            left: `${bubble.left}%`,
            bottom: '-20%',
            animation: `float ${bubble.animationDuration}s ease-in-out infinite`,
            animationDelay: `${bubble.animationDelay}s`,
            zIndex: 0,
            filter: 'blur(5px)'
          }}
        />
      ))}
      
      {/* Title with animation */}
      <h1 style={{
        fontSize: '2.5rem',
        fontWeight: 'bold',
        color: '#1e40af',
        marginBottom: '1rem',
        position: 'relative',
        transform: animate ? 'translateY(0)' : 'translateY(-50px)',
        opacity: animate ? 1 : 0,
        transition: 'all 0.8s ease',
        textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
      }}>
        Terms and Conditions
        <div style={{
          width: animate ? '100%' : '0%',
          height: '4px',
          background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
          position: 'absolute',
          bottom: '-10px',
          left: 0,
          transition: 'width 1.2s ease',
          borderRadius: '2px'
        }} />
      </h1>
      
      {/* Introduction with animation */}
      <p style={{
        fontSize: '1.125rem',
        color: '#4b5563',
        marginTop: '1.5rem',
        maxWidth: '48rem',
        transform: animate ? 'translateY(0)' : 'translateY(30px)',
        opacity: animate ? 1 : 0,
        transition: 'all 0.8s ease',
        transitionDelay: '0.2s',
        lineHeight: 1.6,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        padding: '1rem',
        borderRadius: '0.5rem',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
        position: 'relative',
        zIndex: 1
      }}>
        Welcome to SSK-Platform! Please read these terms and conditions carefully
        before using our website.
      </p>
      
      {/* Interactive Terms Sections */}
      <div style={{
        textAlign: 'left',
        marginTop: '2rem',
        maxWidth: '48rem',
        width: '100%',
        position: 'relative',
        zIndex: 1
      }}>
        {terms.map((term, index) => (
          <div 
            key={index}
            className="term-section"
            style={{
              marginBottom: '1.5rem',
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              borderRadius: '0.75rem',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
              overflow: 'hidden',
              opacity: 0,
              transform: 'translateY(30px)',
              transition: 'all 0.6s ease',
              transitionDelay: getDelay(index),
              cursor: 'pointer',
              border: activeSection === index ? '2px solid #3b82f6' : '2px solid transparent'
            }}
            onClick={() => toggleSection(index)}
          >
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: 600,
              color: '#1e3a8a',
              padding: '1rem 1.5rem',
              margin: 0,
              position: 'relative',
              background: activeSection === index ? 'linear-gradient(90deg, #dbeafe, #ffffff)' : '#f8fafc',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              {term.title}
              <span style={{
                fontSize: '1.5rem',
                transition: 'transform 0.3s ease',
                transform: activeSection === index ? 'rotate(45deg)' : 'rotate(0)'
              }}>+</span>
            </h2>
            <div style={{
              maxHeight: activeSection === index ? '200px' : '0',
              overflow: 'hidden',
              transition: 'max-height 0.6s ease',
              padding: activeSection === index ? '1rem 1.5rem' : '0 1.5rem',
              color: '#4b5563',
              lineHeight: 1.6
            }}>
              <p>{term.content}</p>
              {term.title.includes("Contact") && (
                <span style={{
                  color: '#3b82f6',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'color 0.3s ease',
                  marginTop: '0.5rem',
                  display: 'inline-block'
                }}
                onMouseOver={(e) => { e.target.style.color = '#1e40af' }}
                onMouseOut={(e) => { e.target.style.color = '#3b82f6' }}
                >
                  sushiitantmi45@gmail.com
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {/* Last updated with animation */}
      <p style={{
        fontSize: '0.875rem',
        color: '#6b7280',
        marginTop: '2rem',
        marginBottom: '1rem',
        opacity: animate ? 0.8 : 0,
        transition: 'opacity 0.8s ease',
        transitionDelay: '1s',
        padding: '0.5rem 1rem',
        borderRadius: '9999px',
        background: 'rgba(255, 255, 255, 0.7)'
      }}>
        Last updated: {new Date().toLocaleDateString()}
      </p>
      
      {/* Additional floating elements for visual interest */}
      <div style={{
        position: 'absolute',
        top: '15%',
        right: '10%',
        width: '60px',
        height: '60px',
        borderRadius: '12px',
        background: 'linear-gradient(45deg, #3b82f6, #8b5cf6)',
        transform: 'rotate(15deg)',
        opacity: animate ? 0.2 : 0,
        transition: 'opacity 1s ease',
        animation: 'float 8s ease-in-out infinite'
      }} />
      
      <div style={{
        position: 'absolute',
        bottom: '20%',
        left: '8%',
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        background: 'linear-gradient(45deg, #ec4899, #8b5cf6)',
        opacity: animate ? 0.15 : 0,
        transition: 'opacity 1s ease',
        animation: 'pulse 6s ease-in-out infinite'
      }} />
      
      {/* Add global styles for animations */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.15; }
          50% { transform: scale(1.2); opacity: 0.25; }
        }
      `}</style>
    </div>
  );
}