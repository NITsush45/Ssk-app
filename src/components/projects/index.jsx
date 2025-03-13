"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectLay from "./ProjectLay";
import { projectsData } from "../projects/data";
import Navigation from "../navigation";
import Footer from "@/app/projects/footer";

const ProjectList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [filteredProjects, setFilteredProjects] = useState([]);

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

  return (
    <div className="min-h-screen w-full py-12 px-6 sm:px-8 lg:px-12 bg-gradient-to-b from-gray-900 to-gray-800">
      <motion.div
        style={{ position: "fixed", top: 0, left: 0, width: "100%", zIndex: 50 }}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Navigation />
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
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            style={{
              fontSize: "2rem",
              fontWeight: "bold",
              backgroundImage: "linear-gradient(to right, #F7AB0A, #FFD700)",
              WebkitBackgroundClip: "text",
              color: "transparent",
              marginTop: "0.2rem",
            }}
          >
            My Projects
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
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
          >
            Let me introduce you to all my {filteredProjects.length} Projects
          </motion.div>

          <p style={{ color: "#38BDF8", fontSize: "1rem" }}>
          Explore my technical journey along with my Tech-skills through the tech-stack I have used for these projects.
          </p>
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            whileFocus={{ scale: 1.05 }}
            style={{ maxWidth: "28rem", margin: "1.5rem auto 0" }}
          >
            <input
              type="text"
              placeholder="🔍 Search Sushant's projects...."
              style={{
                width: "100%",
                padding: "0.75rem 1.25rem",
                borderRadius: "1.5rem",
                background: "#111827",
                color: "#d1d5db",
                border: "1px solid #FFFFFF",
                outline: "none",
                transition: "all 0.3s ease",
              }}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </motion.div>
        </motion.div>
        <div style={{ position: "relative" }}>
          <div
            style={{
              maxWidth: "60rem",
              margin: "0 auto",
              height: "70vh",
              overflowY: "auto",
              scrollbarWidth: "none",
              padding: "1rem",
            }}
          >
            <AnimatePresence>
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
                        animation: "pulse 1.5s infinite",
                      }}
                    />
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
                  {filteredProjects.map((project) => (
                    <motion.div
                      key={project.id}
                      whileHover={{ scale: 1.05, rotate: 2 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      style={{
                        background: "#111827",
                        borderRadius: "0.5rem",
                        padding: "1.5rem",
                        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                        border: "1px solid #374151",
                      }}
                    >
                      <ProjectLay {...project} />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {!isLoading && filteredProjects.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ textAlign: "center", padding: "3rem 0" }}
              >
                <p style={{ color: "#FFFFFF", fontSize: "1.25rem" }}>
                  Oops... This project doesn't exist in the list.
                </p>
              </motion.div>
            )}
          </div>
          {!isLoading && filteredProjects.length > 3 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              whileHover={{ scale: 1.1 }}
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                textAlign: "center",
                padding: "1rem 0",
              }}
            >
              <motion.span
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                style={{
                  color: "#9ca3af",
                  fontSize: "0.875rem",
                }}
              >
                ⬇ Scroll to explore
              </motion.span>
            </motion.div>
          )}
        </div>
      </div>
      <Footer/>
    </div>
    
  );
};

export default ProjectList;
