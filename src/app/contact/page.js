"use client";
import Navigation from "@/components/navigation";
import React, { useState, useEffect } from "react";
import Footer from "../projects/footer";
import { motion, AnimatePresence } from "framer-motion";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "",
    message: "",
  });
  const [isMapHovered, setIsMapHovered] = useState(false);
  const [isHeadHovered, setHeadHovered] = useState(false);
  const [activeField, setActiveField] = useState(null);

  const [submitStatus, setSubmitStatus] = useState({
    submitted: false,
    success: false,
    message: "",
  });

  // For floating particles in the background
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Create random floating particles
    const particlesArray = Array.from({ length: 30 }, (_, index) => ({
      id: index,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 5 + 1,
      speed: Math.random() * 0.5 + 0.1,
      opacity: Math.random() * 0.5 + 0.2,
      angle: Math.random() * 360,
    }));
    
    setParticles(particlesArray);
    
    // Auto-clear success message after 5 seconds
    if (submitStatus.submitted && submitStatus.success) {
      const timer = setTimeout(() => {
        setSubmitStatus({
          submitted: false,
          success: false,
          message: "",
        });
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [submitStatus.submitted, submitStatus.success]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || 'Submission failed');
      }
  
      setSubmitStatus({
        submitted: true,
        success: true,
        message: "Thank you! Your message has been sent successfully to Sushant ;).",
      });
  
      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        category: "",
        message: "",
      });
  
    } catch (error) {
      setSubmitStatus({
        submitted: true,
        success: false,
        message: error.message || "There was an error submitting your message. Please try again.",
      });
      console.error("Form submission error:", error);
    }
  };

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  const buttonVariants = {
    idle: { scale: 1, backgroundColor: "#8B4513" },
    hover: { 
      scale: 1.05, 
      backgroundColor: "#a05214",
      boxShadow: "0 0 15px rgba(139, 69, 19, 0.8)"
    },
    tap: { scale: 0.95 }
  };

  const inputVariants = {
    idle: { 
      borderColor: "rgba(255, 255, 255, 0.15)",
      boxShadow: "0 0 0 rgba(255, 255, 255, 0)"
    },
    active: { 
      borderColor: "#8B4513", 
      boxShadow: "0 0 8px rgba(139, 69, 19, 0.6)"
    }
  };

  const mapContainerVariants = {
    idle: { 
      boxShadow: "0 4px 16px rgba(0, 255, 0, 0.4)",
      backgroundColor: "rgba(255, 255, 255, 0.5)"
    },
    hover: { 
      boxShadow: "0 8px 32px rgba(0, 255, 0, 0.7)",
      backgroundColor: "rgba(0, 0, 0, 0.5)"
    }
  };

  // Success message animation
  const notificationVariants = {
    hidden: { opacity: 0, y: -50, scale: 0.8 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 20 
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8, 
      transition: { 
        duration: 0.3 
      }
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        maxHeight: "100vh",
        backgroundColor: "#121212",
        overflowY: "auto",
        padding: "20px 0",
        paddingTop: "80px",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: "100vw",
          height: "100vh",
          backgroundImage: `linear-gradient(135deg, rgba(20, 184, 166, 0.9) 0%, rgba(6, 182, 212, 0.7) 100%), url("/background/cont.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          filter: "blur(4px)",
          zIndex: 0,
        }}
      >
        {/* Animated particles */}
        {particles.map(particle => (
          <motion.div
            key={particle.id}
            initial={{ 
              x: `${particle.x}%`, 
              y: `${particle.y}%`, 
              opacity: particle.opacity 
            }}
            animate={{ 
              x: [`${particle.x}%`, `${(particle.x + particle.speed * 10) % 100}%`],
              y: [`${particle.y}%`, `${(particle.y + particle.speed * 5) % 100}%`],
              rotate: [particle.angle, particle.angle + 360]
            }}
            transition={{ 
              duration: 20 / particle.speed, 
              repeat: Infinity, 
              ease: "linear"
            }}
            style={{
              position: "absolute",
              width: particle.size,
              height: particle.size,
              borderRadius: "50%",
              backgroundColor: "#fff",
              boxShadow: `0 0 ${particle.size * 2}px rgba(255, 255, 255, 0.8)`,
              zIndex: 1
            }}
          />
        ))}
      </div>

      <Navigation />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          maxWidth: "1000px",
          margin: "20px auto",
          position: "relative",
          zIndex: 2,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 100, 
            damping: 15,
            delay: 0.2
          }}
          style={{
            background: "rgba(0, 0, 0, 0.6)",
            padding: "35px",
            borderRadius: "12px",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.5)",
            maxWidth: "600px",
            width: "90%",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            backdropFilter: "blur(10px)",
            marginBottom: "30px",
          }}
        >
          <motion.h2
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 20 
            }}
            style={{
              color: "#fff",
              fontSize: "28px",
              marginBottom: "25px",
              textAlign: "center",
              fontWeight: "600",
            }}
          >
            <motion.span
              animate={{ 
                color: ["#fff", "#ffcc80", "#fff"],
                textShadow: [
                  "0 0 5px rgba(255, 255, 255, 0.5)",
                  "0 0 15px rgba(255, 204, 128, 0.8)",
                  "0 0 5px rgba(255, 255, 255, 0.5)"
                ]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                repeatType: "reverse" 
              }}
            >
              Connect with me
            </motion.span>
          </motion.h2>

          <AnimatePresence>
            {submitStatus.submitted && (
              <motion.div
                variants={notificationVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                style={
                  submitStatus.success
                    ? {
                        backgroundColor: "rgba(76, 175, 80, 0.25)",
                        color: "#4CAF50",
                        padding: "15px",
                        borderRadius: "8px",
                        marginBottom: "20px",
                        textAlign: "center",
                        fontWeight: "500",
                        border: "1px solid rgba(76, 175, 80, 0.5)",
                      }
                    : {
                        backgroundColor: "rgba(244, 67, 54, 0.25)",
                        color: "#F44336",
                        padding: "15px",
                        borderRadius: "8px",
                        marginBottom: "20px",
                        textAlign: "center",
                        fontWeight: "500",
                        border: "1px solid rgba(244, 67, 54, 0.5)",
                      }
                }
              >
                <motion.div 
                  animate={{
                    scale: [1, 1.03, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  {submitStatus.message}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            {/* Name field */}
            <motion.div
              custom={0}
              variants={formVariants}
              initial="hidden"
              animate="visible"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <motion.label
                animate={{ 
                  color: activeField === "name" ? "#ffcc80" : "#ddd"
                }}
                transition={{ duration: 0.3 }}
                htmlFor="name"
                style={{
                  fontSize: "15px",
                }}
              >
                Name
              </motion.label>
              <motion.input
                variants={inputVariants}
                animate={activeField === "name" ? "active" : "idle"}
                whileFocus="active"
                transition={{ duration: 0.3 }}
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onFocus={() => setActiveField("name")}
                onBlur={() => setActiveField(null)}
                required
                style={{
                  padding: "14px 18px",
                  borderRadius: "8px",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  backgroundColor: "rgba(0, 0, 0, 0.4)",
                  color: "#fff",
                  fontSize: "15px",
                  outline: "none",
                }}
                placeholder="Your Name"
              />
            </motion.div>

            {/* Email field */}
            <motion.div
              custom={1}
              variants={formVariants}
              initial="hidden"
              animate="visible"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <motion.label
                animate={{ 
                  color: activeField === "email" ? "#ffcc80" : "#ddd"
                }}
                transition={{ duration: 0.3 }}
                htmlFor="email"
                style={{
                  fontSize: "15px",
                }}
              >
                Email
              </motion.label>
              <motion.input
                variants={inputVariants}
                animate={activeField === "email" ? "active" : "idle"}
                transition={{ duration: 0.3 }}
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => setActiveField("email")}
                onBlur={() => setActiveField(null)}
                required
                style={{
                  padding: "14px 18px",
                  borderRadius: "8px",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  backgroundColor: "rgba(0, 0, 0, 0.4)",
                  color: "#fff",
                  fontSize: "15px",
                  outline: "none",
                }}
                placeholder="Your Email"
              />
            </motion.div>

            {/* Subject field */}
            <motion.div
              custom={2}
              variants={formVariants}
              initial="hidden"
              animate="visible"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <motion.label
                animate={{ 
                  color: activeField === "subject" ? "#ffcc80" : "#ddd"
                }}
                transition={{ duration: 0.3 }}
                htmlFor="subject"
                style={{
                  fontSize: "15px",
                }}
              >
                Subject
              </motion.label>
              <motion.input
                variants={inputVariants}
                animate={activeField === "subject" ? "active" : "idle"}
                transition={{ duration: 0.3 }}
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                onFocus={() => setActiveField("subject")}
                onBlur={() => setActiveField(null)}
                required
                style={{
                  padding: "14px 18px",
                  borderRadius: "8px",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  backgroundColor: "rgba(0, 0, 0, 0.4)",
                  color: "#fff",
                  fontSize: "15px",
                  outline: "none",
                }}
                placeholder="Subject"
              />
            </motion.div>

            {/* Category field */}
            <motion.div
              custom={3}
              variants={formVariants}
              initial="hidden"
              animate="visible"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <motion.label
                animate={{ 
                  color: activeField === "category" ? "#ffcc80" : "#ddd"
                }}
                transition={{ duration: 0.3 }}
                htmlFor="category"
                style={{
                  fontSize: "15px",
                }}
              >
                Category
              </motion.label>
              <motion.select
                variants={inputVariants}
                animate={activeField === "category" ? "active" : "idle"}
                transition={{ duration: 0.3 }}
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                onFocus={() => setActiveField("category")}
                onBlur={() => setActiveField(null)}
                required
                style={{
                  padding: "14px 18px",
                  borderRadius: "8px",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  backgroundColor: "rgba(0, 0, 0, 0.4)",
                  color: "#fff",
                  fontSize: "15px",
                  appearance: "none",
                  cursor: "pointer",
                  outline: "none",
                }}
              >
                <option value="" disabled>
                  Select a category
                </option>
                <option value="general">General Inquiry</option>
                <option value="business">Opportunity Related</option>
                <option value="support">Technical Support</option>
                <option value="feedback">Feedback</option>
                <option value="business">Business Opportunity</option>
                <option value="other">Other</option>
              </motion.select>
            </motion.div>

            {/* Message field */}
            <motion.div
              custom={4}
              variants={formVariants}
              initial="hidden"
              animate="visible"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <motion.label
                animate={{ 
                  color: activeField === "message" ? "#ffcc80" : "#ddd"
                }}
                transition={{ duration: 0.3 }}
                htmlFor="message"
                style={{
                  fontSize: "15px",
                }}
              >
                Message
              </motion.label>
              <motion.textarea
                variants={inputVariants}
                animate={activeField === "message" ? "active" : "idle"}
                transition={{ duration: 0.3 }}
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                onFocus={() => setActiveField("message")}
                onBlur={() => setActiveField(null)}
                required
                style={{
                  padding: "14px 18px",
                  borderRadius: "8px",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  backgroundColor: "rgba(0, 0, 0, 0.4)",
                  color: "#fff",
                  fontSize: "15px",
                  resize: "vertical",
                  outline: "none",
                }}
                placeholder="Your Message"
                rows="6"
              />
            </motion.div>

            {/* Submit button */}
            <motion.button
              type="submit"
              variants={buttonVariants}
              initial="idle"
              whileHover="hover"
              whileTap="tap"
              style={{
                padding: "14px 20px",
                backgroundColor: "#8B4513",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                fontSize: "16px",
                fontWeight: "bold",
                cursor: "pointer",
                marginTop: "10px",
              }}
            >
              <motion.span
                animate={{ 
                  scale: [1, 1.05, 1],
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                style={{ display: "inline-block" }}
              >
                Send Message
              </motion.span>
            </motion.button>
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            type: "spring",
            stiffness: 100,
            damping: 15,
            delay: 0.5
          }}
          variants={mapContainerVariants}
          whileHover="hover"
          style={{
            width: "90%",
            maxWidth: "600px",
            borderRadius: "12px",
            overflow: "hidden",
            marginBottom: "30px",
            position: "relative",
            zIndex: 2,
          }}
          onMouseEnter={() => setIsMapHovered(true)}
          onMouseLeave={() => setIsMapHovered(false)}
        >
          <motion.h2
            animate={{ 
              color: isHeadHovered ? "#fff" : "rgba(0, 0, 0, 0.8)",
              textShadow: isHeadHovered 
                ? "0 0 10px rgba(255, 255, 255, 0.8)" 
                : "none"
            }}
            transition={{ duration: 0.3 }}
            style={{
              fontSize: "28px",
              margin: "20px 0",
              textAlign: "center",
              fontWeight: "600",
            }}
            onMouseEnter={() => setHeadHovered(true)}
            onMouseLeave={() => setHeadHovered(false)}
          >
            <motion.span
              animate={{ 
                y: [0, -5, 0],
              }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              style={{ display: "inline-block" }}
            >
              Hello!!
            </motion.span>{" "}
            <motion.span
              animate={{ 
                y: [0, 5, 0],
              }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse",
                delay: 0.2
              }}
              style={{ display: "inline-block" }}
            >
              I am
            </motion.span>{" "}
            <motion.span
              animate={{ 
                y: [0, -5, 0],
              }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse",
                delay: 0.4
              }}
              style={{ display: "inline-block" }}
            >
              here
            </motion.span>
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0.7 }}
            whileHover={{ 
              opacity: 1,
              scale: 1.02,
              transition: { duration: 0.5 }
            }}
            style={{ borderRadius: "12px", overflow: "hidden" }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3477.1597763250227!2d76.8190!3d29.9460!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390e47687ba7d3b9%3A0x5f3cf1911091cf07!2sNational%20Institute%20of%20Technology%2C%20Kurukshetra!5e0!3m2!1sen!2sin!4v1709821490000!5m2!1sen!2sin"
              width="100%"
              height="300"
              style={{ border: 0, borderRadius: "12px" }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        style={{
          width: "100%",
          backgroundColor: "#121212",
          position: "relative",
          zIndex: 2,
          marginTop: "auto",
        }}
      >
        <Footer />
      </motion.div>
    </div>
  );
};

export default ContactUs;