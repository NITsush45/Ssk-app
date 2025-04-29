'use client';

import Navigation from '@/components/navigation';
import React, { useEffect, useState } from 'react';
import Footer from '../projects/footer';

export default function AboutComp() {
  const [animate, setAnimate] = useState(false);
  
  useEffect(() => {
    // Start animation after component mounts
    setAnimate(true);
  }, []);

  // Common styles
  const gradientText = {
    backgroundImage: 'linear-gradient(to right, #2563eb, #9333ea)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    color: 'transparent'
  };

  const transition = {
    transition: 'all 1s ease',
    transform: animate ? 'translateY(0)' : 'translateY(10px)',
    opacity: animate ? 1 : 0
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh',overflowY: 'auto', scrollbarWidth:'none' }}>
      <Navigation />
      <div style={{ 
        flexGrow: 1, 
        display: 'flex', 
        flexDirection: 'column',
        overflowY: 'auto',
        alignItems: 'center', 
        justifyContent: 'start',
        scrollbarWidth:'none', 
        background: 'linear-gradient(to bottom right, #e0e7ff, #f3e8ff)', 
        textAlign: 'center', 
        padding: '1.5rem',
        position: 'relative'
      }}>
        {/* Animated background elements */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
          {[...Array(10)].map((_, i) => {
            const size = Math.random() * 200 + 50;
            return (
              <div 
                key={i}
                style={{
                  position: 'absolute',
                  borderRadius: '50%',
                  backgroundColor: '#93c5fd',
                  opacity: 0.2,
                  width: `${size}px`,
                  height: `${size}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animation: `pulse ${Math.random() * 8 + 3}s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 2}s`,
                }}
              />
            );
          })}
        </div>
        
        {/* Logo Animation */}
        <div style={{ 
          transform: animate ? 'scale(1)' : 'scale(0.5)', 
          opacity: animate ? 1 : 0, 
          transition: 'all 1s ease', 
          marginTop: '2.5rem' 
        }}>
          <div style={{ 
            width: '8rem', 
            height: '8rem', 
            marginBottom: '1.5rem', 
            borderRadius: '50%', 
            backgroundColor: 'white', 
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center' 
          }}>
            <span style={{ 
              fontSize: '2.25rem', 
              fontWeight: 900, 
              ...gradientText 
            }}>IM</span>
          </div>
        </div>
        
        {/* Title with animation */}
        <h1 style={{ 
          fontSize: '3rem', 
          fontWeight: 'bold', 
          ...gradientText,
          ...transition 
        }}>
          About ITEMARTZ
        </h1>
        
        {/* Description with staggered animation */}
        <p style={{ 
          fontSize: '1.125rem', 
          color: '#374151', 
          marginTop: '1.5rem', 
          maxWidth: '42rem', 
          lineHeight: 1.625, 
          ...transition,
          transitionDelay: '300ms' 
        }}>
          ITEMARTZ is dedicated to providing high-quality products with an
          innovative shopping experience. We are committed to bringing the best
          selection to our customers with seamless service and efficiency.
        </p>
        
        {/* Call to action with hover animation */}
        <div style={{ 
          marginTop: '2.5rem', 
          ...transition,
          transitionDelay: '500ms' 
        }}>
          <p style={{ 
            fontSize: '1.25rem', 
            fontWeight: 600, 
            color: '#2563eb',
            animation: 'pulse 2s infinite ease-in-out',
          }}>
            Stay Tuned, we will update in the future!
          </p>
        </div>
        
        {/* Animated button */}
        <button style={{ 
          marginTop: '2rem', 
          padding: '0.75rem 1.5rem', 
          background: 'linear-gradient(to right, #3b82f6, #8b5cf6)', 
          color: 'white', 
          borderRadius: '9999px', 
          fontWeight: 500, 
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', 
          ...transition,
          transitionDelay: '600ms' 
        }}>
          Contact Us
        </button>
        
        {/* Social media icons with hover animations */}
        <div style={{ 
          display: 'flex', 
          gap: '1.5rem', 
          marginTop: '3rem', 
          marginBottom: '4rem', 
          ...transition,
          transitionDelay: '700ms' 
        }}>
          {['facebook', 'twitter', 'instagram'].map((social) => (
            <div 
              key={social}
              style={{ 
                width: '2.5rem', 
                height: '2.5rem', 
                borderRadius: '50%', 
                backgroundColor: 'white', 
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                cursor: 'pointer', 
                transition: 'transform 0.3s ease' 
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <span style={{ color: '#3b82f6' }}>{social[0].toUpperCase()}</span>
            </div>
          ))}
        </div>
        
        {/* Additional content to ensure scrollability */}
        <div style={{ width: '100%', maxWidth: '64rem', marginTop: '2rem', marginBottom: '4rem' }}>
          <h2 style={{ 
            fontSize: '1.875rem', 
            fontWeight: 'bold', 
            color: '#2563eb', 
            marginBottom: '1.5rem', 
            ...transition,
            transitionDelay: '800ms' 
          }}>
            Our Vision
          </h2>
          <p style={{ 
            fontSize: '1.125rem', 
            color: '#374151', 
            marginBottom: '2rem', 
            ...transition,
            transitionDelay: '900ms' 
          }}>
            At ITEMARTZ, we envision a world where shopping is not just a transaction but an experience. 
            We are dedicated to creating a platform that combines quality products with intuitive design, 
            making your shopping journey seamless and enjoyable.
          </p>
          
          <h2 style={{ 
            fontSize: '1.875rem', 
            fontWeight: 'bold', 
            color: '#2563eb', 
            marginBottom: '1.5rem', 
            ...transition,
            transitionDelay: '1000ms' 
          }}>
            Our Mission
          </h2>
          <p style={{ 
            fontSize: '1.125rem', 
            color: '#374151', 
            marginBottom: '2rem', 
            ...transition,
            transitionDelay: '1100ms' 
          }}>
            Our mission is to provide exceptional products while maintaining the highest standards of 
            customer service. We strive to innovate constantly, ensuring that we remain at the forefront 
            of the industry and exceed our customers`&apos` expectations.
          </p>
        </div>
      </div>
      <Footer/>
    </div>
  );
}