import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const ProjectLay = ({ image, name, description = "", date, link }) => {
  const [expanded, setExpanded] = useState(false);

  const isValidDate = (dateString) => !isNaN(Date.parse(dateString));

  return (
    <motion.div
      style={{
        width: "100%",
        maxWidth: "400px",
        height: "400px",
        padding: "1.5rem",
        background: "rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(10px)",
        borderRadius: "0.75rem",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        transition: "all 0.3s ease",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
      whileHover={{ y: -15, borderColor: "rgba(255, 255, 255, 0.2)" }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      {image && (
        <motion.img
          src={image}
          alt={name || "Project Image"}
          style={{
            width: "100%",
            height: "120px",
            objectFit: "cover",
            borderRadius: "0.5rem",
            marginBottom: "0.5rem",
          }}
          whileHover={{ scale: 1.22 }}
        />
      )}

      <div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <motion.h2
            style={{
              fontSize: "1.3rem",
              fontWeight: "bold",
              backgroundImage: "linear-gradient(to right, #F7AB0A, #FFD700)",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
            whileHover={{ x: 5 }}
          >
            {name}
          </motion.h2>
          {link && (
            <motion.a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "rgba(255, 255, 255, 0.5)",
                transition: "color 0.3s ease",
              }}
              whileHover={{ scale: 1.1, color: "#F7AB0A" }}
              whileTap={{ scale: 0.9 }}
              aria-label={`View ${name} project`}
            >
              <ArrowUpRight style={{ width: "1.5rem", height: "1.5rem" }} />
            </motion.a>
          )}
        </div>

        <div
          style={{
            color: "rgba(255, 255, 255, 0.8)",
            fontSize: "0.9rem",
            lineHeight: "1.5",
            height: expanded ? "auto" : "3.5rem",
            maxHeight: expanded ? "150px" : "3.5rem",
            overflowY: expanded ? "auto" : "hidden",
            paddingRight: expanded ? "5px" : "0",
            scrollbarWidth: "thin",
            scrollbarColor: "#F7AB0A rgba(255, 255, 255, 0.1)",
          }}
        >
          {description}
        </div>

        {description && description.length > 100 && (
          <button
            onClick={() => setExpanded(!expanded)}
            style={{
              marginTop: "0.5rem",
              color: "#F7AB0A",
              fontWeight: "500",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
            role="button"
            aria-expanded={expanded}
          >
            {expanded ? "Read Less" : "Read More"}
          </button>
        )}
      </div>

      {date && isValidDate(date) && (
        <motion.div whileHover={{ scale: 1.05 }}>
          <div
            style={{
              display: "inline-block",
              padding: "0.25rem 0.75rem",
              background: "rgba(255, 255, 255, 0.05)",
              borderRadius: "9999px",
            }}
          >
            <p style={{ fontSize: "0.875rem", color: "#F7AB0A", fontWeight: "500" }}>
              {new Date(date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ProjectLay;
