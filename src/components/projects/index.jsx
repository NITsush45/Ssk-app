"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import ProjectLay from "./ProjectLay";
import { projectsData } from "../projects/data";
import Footer from "@/app/projects/footer";

const ProjectList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  
  // Transform values for parallax effects
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacityParticles = useTransform(scrollYProgress, [0, 0.5, 1], [0.2, 0.5, 0.3]);
  
  // Handle scroll position for scroll-based animations
  useEffect(() => {
    if (typeof window !== 'undefined') {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  };
  }, []);

  useEffect(() => {
    setFilteredProjects(projectsData);
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setFilteredProjects(
      projectsData.filter(
        (project) =>
          project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm]);

  // Enhanced animations for project cards
  const projectCardVariants = {
    hidden: { opacity: 0, y: 50, rotateX: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.8,
        type: "spring",
        stiffness: 80,
        damping: 12
      }
    }),
    hover: { 
      scale: 1.05, 
      rotate: 2,
      boxShadow: "0px 15px 30px rgba(247, 171, 10, 0.3)",
      borderColor: "#F7AB0A",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15
      }
    }
  };

  // Animation for floating elements
  const floatingAnimation = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        y: {
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }
    }
  };

  // Animation for the page background
  const backgroundVariants = {
    initial: { backgroundPosition: "0% 0%" },
    animate: {
      backgroundPosition: "100% 100%",
      transition: { duration: 25, repeat: Infinity, repeatType: "reverse" }
    }
  };

  // Footer animation variants
  const footerVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        duration: 0.8,
        type: "spring",
        stiffness: 70,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const footerChildVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        duration: 0.5,
        type: "spring",
        stiffness: 100
      }
    }
  };

  // Animated particles for background
  const ParticleBackground = () => (
    <motion.div 
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ opacity: opacityParticles }}
    >
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-amber-300"
          style={{
            width: Math.random() * 10 + 2,
            height: Math.random() * 10 + 2,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.5,
          }}
          animate={{
            y: [0, Math.random() * 100 - 50],
            x: [0, Math.random() * 100 - 50],
            opacity: [0.1, 0.6, 0.1],
            scale: [1, Math.random() + 1, 1]
          }}
          transition={{
            duration: Math.random() * 10 + 20,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
      ))}
    </motion.div>
  );

  return (
    <motion.div 
      className="min-h-screen w-full bg-gradient-to-b from-gray-900 via-gray-800 to-black"
      initial="initial"
      animate="animate"
      variants={backgroundVariants}
      ref={containerRef}
      style={{ 
        backgroundSize: "300% 300%",
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* Enhanced background elements */}
      <motion.div
        style={{ 
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: "radial-gradient(circle at 30% 30%, rgba(37, 99, 235, 0.15) 0%, transparent 70%), radial-gradient(circle at 70% 70%, rgba(247, 171, 10, 0.1) 0%, transparent 70%)",
          zIndex: 1
        }}
      />

      <ParticleBackground />

      <motion.div
        style={{ 
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "radial-gradient(circle, transparent 20%, #111827 80%)",
          backgroundSize: "20px 20px",
          opacity: 0.4,
          zIndex: 1
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.4, 0.3]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />

      <div className="py-12 px-6 sm:px-8 lg:px-12 relative z-10">
        <motion.div
          style={{ position: "fixed", top: 0, left: 0, width: "100%", zIndex: 50 }}
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
        </motion.div>

        <div style={{ maxWidth: "80rem", margin: "0 auto", paddingTop: "6rem" }}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ textAlign: "center", marginBottom: "3rem" }}
          >
            <motion.h1
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                backgroundPosition: ["0% center", "200% center", "0% center"],
              }}
              transition={{ 
                duration: 0.7,
                backgroundPosition: {
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear"
                }
              }}
              whileHover={{
                scale: 1.1,
                transition: { duration: 0.3 }
              }}
              style={{
                fontSize: "3rem",
                fontWeight: "bold",
                backgroundImage: "linear-gradient(to right, #F7AB0A, #FFD700, #F7AB0A)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                color: "transparent",
                marginTop: "0.2rem",
              }}
            >
              My Projects
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                ...floatingAnimation.animate
              }}
              transition={{ duration: 0.6 }}
              style={{
                display: "inline-block",
                background: "#1f2937",
                color: "#F7AB0A",
                padding: "0.5rem 1rem",
                borderRadius: "9999px",
                fontSize: "0.875rem",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              }}
              whileHover={{
                scale: 1.05,
                color: "#FFD700",
                boxShadow: "0px 6px 12px rgba(247, 171, 10, 0.2)"
              }}
            >
              Let me introduce you to all my {filteredProjects.length} Projects
            </motion.div>

            <motion.p 
              style={{ color: "#38BDF8", fontSize: "1rem" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              whileHover={{ color: "#7DD3FC", scale: 1.02 }}
            >
              Explore my technical journey along with my Tech-skills through the tech-stack I have used for these projects.
            </motion.p>
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileFocus={{ scale: 1.05 }}
              style={{ maxWidth: "28rem", margin: "1.5rem auto 0" }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <motion.input
                type="text"
                placeholder="🔍 Search Sushant's projects...."
                style={{
                  width: "100%",
                  padding: "0.75rem 1.25rem",
                  borderRadius: "1.5rem",
                  background: "rgba(17, 24, 39, 0.8)",
                  color: "#d1d5db",
                  border: "1px solid #FFFFFF",
                  outline: "none",
                  transition: "all 0.3s ease",
                  backdropFilter: "blur(8px)"
                }}
                whileFocus={{ 
                  scale: 1.02, 
                  boxShadow: "0px 0px 30px rgba(247, 171, 10, 0.5)",
                  borderColor: "#F7AB0A" 
                }}
                animate={{
                  boxShadow: ["0px 0px 0px rgba(247, 171, 10, 0)", "0px 0px 20px rgba(247, 171, 10, 0.4)", "0px 0px 0px rgba(247, 171, 10, 0)"],
                }}
                transition={{
                  boxShadow: {
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }
                }}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </motion.div>
          </motion.div>
          
          <div style={{ position: "relative" }}>
            <div
              style={{
                maxWidth: "64rem",
                margin: "0 auto",
                height: "70vh",
                overflowY: "auto",
                padding: "1rem",
                scrollbarWidth: "none",
              }}
              className="hide-scrollbar"
            >
              <AnimatePresence mode="wait">
                {isLoading ? (
                  <motion.div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                      gap: "1.5rem",
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i}
                        style={{
                          height: "10rem",
                          background: "rgba(31, 41, 55, 0.5)",
                          borderRadius: "0.5rem",
                          overflow: "hidden"
                        }}
                        animate={{
                          opacity: [0.5, 0.8, 0.5],
                          scale: [1, 1.02, 1]
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          delay: i * 0.2
                        }}
                      >
                        <motion.div
                          style={{
                            width: "100%",
                            height: "3px",
                            background: "linear-gradient(90deg, #38BDF8, #F7AB0A, #38BDF8)",
                            backgroundSize: "200% 100%"
                          }}
                          animate={{
                            backgroundPosition: ["0% center", "200% center"],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear"
                          }}
                        />
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                      gap: "1.5rem",
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {filteredProjects.map((project, i) => (
                      <motion.div
                        key={project.id}
                        custom={i}
                        variants={projectCardVariants}
                        initial="hidden"
                        animate="visible"
                        whileHover="hover"
                        style={{
                          background: "rgba(17, 24, 39, 0.9)",
                          borderRadius: "0.5rem",
                          padding: "1.5rem",
                          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                          border: "1px solid #374151",
                          transition: "all 0.3s ease",
                          backdropFilter: "blur(8px)",
                          position: "relative",
                          overflow: "hidden"
                        }}
                      >
                        <motion.div
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "3px",
                            background: "linear-gradient(90deg, #38BDF8, #F7AB0A)",
                            transformOrigin: "left"
                          }}
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: 1 }}
                          transition={{ duration: 0.8, delay: i * 0.1 }}
                        />
                        <ProjectLay {...project} />
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {!isLoading && filteredProjects.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{ textAlign: "center", padding: "3rem 0" }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.p 
                    style={{ color: "#FFFFFF", fontSize: "1.25rem" }}
                    animate={{
                      scale: [1, 1.05, 1],
                      color: ["#FFFFFF", "#F7AB0A", "#FFFFFF"]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity
                    }}
                  >
                    Oops... This project doesn't exist in the list.
                  </motion.p>
                  
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <motion.button
                      style={{
                        marginTop: "1rem",
                        padding: "0.5rem 1rem",
                        background: "linear-gradient(90deg, #38BDF8, #F7AB0A)",
                        color: "#111827",
                        borderRadius: "0.5rem",
                        border: "none",
                        fontWeight: "bold",
                        cursor: "pointer"
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSearchTerm("")}
                    >
                      Clear Search
                    </motion.button>
                  </motion.div>
                </motion.div>
              )}
            </div>
            
            {!isLoading && filteredProjects.length > 3 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  textAlign: "center",
                  padding: "3rem 0 1rem",
                  background: "linear-gradient(to top, rgba(17, 24, 39, 1), transparent)",
                  pointerEvents: "none"
                }}
              >
                <motion.span
                  animate={{ 
                    y: [0, -8, 0],
                    color: ["#9ca3af", "#F7AB0A", "#9ca3af"]
                  }}
                  transition={{ 
                    y: { repeat: Infinity, duration: 1.5, ease: "easeInOut" },
                    color: { repeat: Infinity, duration: 3 }
                  }}
                  style={{
                    fontSize: "0.875rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem"
                  }}
                >
                  <svg 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <path d="M7 13l5 5 5-5M7 6l5 5 5-5"/>
                  </svg>
                  Scroll to explore more
                </motion.span>
              </motion.div>
            )}
          </div>
        </div>
      </div>
      
      {/* Single Footer */}
      <Footer />
      
      {/* Add global CSS for scrollbar hiding */}
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </motion.div>
  );
};

export default ProjectList;