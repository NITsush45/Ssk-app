"use client";
import Navigation from "@/components/navigation";
import React from "react";
import Footer from "../projects/footer";

const Skills = () => {
  // Main skill categories with detailed descriptions and manually defined skill levels
  const mainSkills = [
    {
      heading: "Web Development",
      text: "Proficient in modern frontend frameworks like React, Next.js, and Vue.js. Experienced in building responsive, accessible, and performant web applications with clean and maintainable code. Skilled in HTML5, CSS3, JavaScript ES6+, TypeScript, and various CSS frameworks including Tailwind, Bootstrap, and Material UI.",
      skillLevel: 100
    },
    {
      heading: "Backend Development",
      text: "Strong foundation in Node.js, Express, and database technologies including MongoDB, PostgreSQL, and Firebase. Capable of designing RESTful APIs and implementing server-side logic. Experienced in building scalable microservices, handling authentication/authorization, and optimizing database performance for high-traffic applications.",
      skillLevel: 88
    },
  ];

  // Related smaller skill sets for each main skill with manually defined skill levels
  const relatedSkills = [
    // Web Development related skills
    [
      {
        heading: "Frontend Frameworks",
        text: "React, Next.js, Vue, Angular",
        skillLevel: 95
      },
      {
        heading: "CSS & Styling",
        text: "Tailwind CSS, Styled Components, SASS",
        skillLevel: 90
      },
      {
        heading: "State Management",
        text: "Redux, Context API, Zustand",
        skillLevel: 85
      },
      {
        heading: "Web Performance",
        text: "Lazy Loading, Code Splitting, Optimization",
        skillLevel: 80
      },
    ],
    // Backend Development related skills
    [
      {
        heading: "Databases",
        text: "MongoDB, PostgreSQL, MySQL, Firebase",
        skillLevel: 87
      },
      {
        heading: "API Development",
        text: "REST, GraphQL, WebSockets",
        skillLevel: 92
      },
      {
        heading: "Authentication",
        text: "JWT, OAuth, Session Management",
        skillLevel: 83
      },
      {
        heading: "Server Technologies",
        text: "Express, Fastify, NestJS",
        skillLevel: 89
      },
    ],
  ];

  // Function to render star ratings based on skill level
  const renderStars = (skillLevel, size = "large") => {
    // Calculate the number of full stars (out of 5)
    const maxStars = 5;
    const fullStars = Math.round((skillLevel / 100) * maxStars);
    
    return (
      <div style={size === "large" ? styles.starsContainer : styles.smallStarsContainer}>
        {[...Array(maxStars)].map((_, i) => (
          <span 
            key={i} 
            style={{
              ...styles.star,
              color: i < fullStars ? "#00f9ff" : "#555",
              fontSize: size === "large" ? "18px" : "14px",
            }}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <div style={styles.container}>
      <Navigation />
      <div style={styles.titleContainer}>
        <div style={styles.centerText}>My Skills & Expertise</div>
      </div>
      <div style={styles.contentWrapper}>
        <div style={styles.line}></div> {/* Vertical line (no longer animated) */}
        
        {mainSkills.map((mainSkill, idx) => (
          <div key={idx} style={styles.skillSection}>
            {/* Main skill card section */}
            <div
              style={{
                ...styles.mainCardWrapper,
                flexDirection: idx % 2 === 0 ? "row" : "row-reverse",
              }}
            >
              {/* Horizontal line to connect center vertical line and main card */}
              <div
                style={{
                  ...styles.horizontalLine,
                  [idx % 2 === 0 ? "right" : "left"]: "50%",
                }}
              ></div>

              <div style={styles.mainCard} className="animatedCard">
                <h2 style={styles.mainHeading}>{mainSkill.heading}</h2>
                <p style={styles.mainText}>{mainSkill.text}</p>
                {/* Skill level indicator with manual value */}
                <div style={styles.skillLevelContainer}>
                  <div style={{
                    ...styles.skillLevel,
                    width: `${mainSkill.skillLevel}%`
                  }}></div>
                  <span style={styles.skillLevelText}>{mainSkill.skillLevel}%</span>
                </div>
                {/* Star rating below the skill bar */}
                {renderStars(mainSkill.skillLevel)}
              </div>
            </div>

            {/* Small cards grid - positioned below and to the side of the main card */}
            <div style={{
              ...styles.smallCardsContainer,
              marginTop: "30px",
              marginLeft: idx % 2 === 0 ? "auto" : "15%",
              marginRight: idx % 2 === 0 ? "15%" : "auto",
              maxWidth: "70%",
            }}>
              {relatedSkills[idx].map((skill, skillIdx) => (
                <div key={skillIdx} style={styles.smallCard} className="animatedSmallCard">
                  <h3 style={styles.smallHeading}>{skill.heading}</h3>
                  <p style={styles.smallText}>{skill.text}</p>
                  {/* Small skill level indicator with manual value */}
                  <div style={styles.smallSkillLevelContainer}>
                    <div style={{
                      ...styles.skillLevel,
                      width: `${skill.skillLevel}%`
                    }}></div>
                    <span style={styles.smallSkillLevelText}>{skill.skillLevel}%</span>
                  </div>
                  {/* Star rating below the small skill bar */}
                  {renderStars(skill.skillLevel, "small")}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div style={styles.footer}>
        <Footer />
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    maxHeight: "100vh",
    overflowY: "auto",
    backgroundColor: "#121212",
    backgroundImage: `linear-gradient(135deg, rgba(249, 115, 22, 0.9) 0%, rgba(220, 38, 38, 0.7) 100%), url('https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    scrollbarWidth: "none",
    padding: "20px 0",
    display: "flex",
    paddingTop: "80px",
    flexDirection: "column",
    position: "relative",
  },
  titleContainer: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    marginTop: "10px",
    marginBottom: "20px",
    position: "relative",
    zIndex: 5,
  },
  centerText: {
    fontSize: "24px",
    fontWeight: "thin",
    fontStyle: "italic",
    color: "#fff",
    background: "rgba(0, 0, 0, 0.7)",
    padding: "10px 20px",
    borderRadius: "30px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.4)",
    textAlign: "center",
  },
  contentWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "150px",
    width: "100%",
    maxWidth: "1200px",
    margin: "0 auto",
    flex: 1,
    paddingBottom: "80px",
    position: "relative",
    paddingTop: "20px",
  },
  line: {
    position: "absolute",
    left: "50%",
    top: 0,
    bottom: 0,
    width: "4px",
    background: "linear-gradient(to bottom, #00f, #0ff)",
    zIndex: 0,
    marginTop: "10px",
    borderRadius: "4px",
  },
  skillSection: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "40px",
    position: "relative",
  },
  mainCardWrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    position: "relative",
    zIndex: 1,
  },
  horizontalLine: {
    position: "absolute",
    top: "50%",
    width: "calc(20% - 100px)",
    height: "4px",
    background: "linear-gradient(to right, #0ff, #00f)",
    zIndex: 0,
    borderRadius: "4px",
  },
  mainCard: {
    background: "linear-gradient(135deg, #333333 70%, #4B0082 30%)",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.3)",
    maxWidth: "50%",
    textAlign: "center",
    zIndex: 1,
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },
  mainHeading: {
    color: "#fff",
    fontSize: "26px",
    marginBottom: "15px",
  },
  mainText: {
    color: "#ddd",
    fontSize: "16px",
    lineHeight: "1.7",
    marginBottom: "20px",
  },
  smallCardsContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "15px",
    zIndex: 1,
    position: "relative",
    justifyContent: "center",
  },
  smallCard: {
    background: "linear-gradient(135deg, #2a2a2a 75%, #4B0082 25%)",
    padding: "15px",
    borderRadius: "8px",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
    textAlign: "center",
    width: "calc(50% - 15px)",
    position: "relative",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  },
  smallHeading: {
    color: "#fff",
    fontSize: "18px",
    marginBottom: "8px",
  },
  smallText: {
    color: "#bbb",
    fontSize: "14px",
    lineHeight: "1.5",
    marginBottom: "10px",
  },
  skillLevelContainer: {
    width: "100%",
    height: "8px",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: "4px",
    overflow: "hidden",
    marginTop: "10px",
    position: "relative",
  },
  smallSkillLevelContainer: {
    width: "100%",
    height: "6px",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: "3px",
    overflow: "hidden",
    marginTop: "8px",
    position: "relative",
  },
  skillLevel: {
    height: "100%",
    background: "linear-gradient(to right, #00f, #0ff)",
    borderRadius: "4px",
    transition: "width 1s ease-in-out",
  },
  skillLevelText: {
    position: "absolute",
    right: "0",
    top: "-18px",
    fontSize: "12px",
    color: "#fff",
    fontWeight: "bold",
  },
  smallSkillLevelText: {
    position: "absolute",
    right: "0",
    top: "-16px",
    fontSize: "10px",
    color: "#fff",
    fontWeight: "bold",
  },
  // New styles for star ratings
  starsContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "15px",
    gap: "5px",
  },
  smallStarsContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "12px",
    gap: "3px",
  },
  star: {
    display: "inline-block",
    transition: "transform 0.2s ease, color 0.3s ease",
  },
  footer: {
    bottom: "0",
    width: "100%",
    backgroundColor: "#121212",
  },
};

// Add animations via global styles
const styleSheet =
  typeof window !== "undefined" ? document.styleSheets[0] : null;
if (styleSheet) {
  // Add card animations
  styleSheet.insertRule(
    `
    .animatedCard {
      animation: fadeInSlide 0.8s ease forwards;
      opacity: 0;
      transform: translateY(20px);
    }
    `,
    styleSheet.cssRules.length
  );
  
  styleSheet.insertRule(
    `
    .animatedSmallCard {
      animation: popIn 0.6s ease forwards;
      animation-delay: calc(var(--order, 0) * 0.1s);
      opacity: 0;
      transform: scale(0.8);
    }
    `,
    styleSheet.cssRules.length
  );
  
  // Define the animations
  styleSheet.insertRule(
    `
    @keyframes fadeInSlide {
      0% {
        opacity: 0;
        transform: translateY(20px);
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }
    `,
    styleSheet.cssRules.length
  );
  
  styleSheet.insertRule(
    `
    @keyframes popIn {
      0% {
        opacity: 0;
        transform: scale(0.8);
      }
      70% {
        opacity: 1;
        transform: scale(1.05);
      }
      100% {
        opacity: 1;
        transform: scale(1);
      }
    }
    `,
    styleSheet.cssRules.length
  );
  
  // Add hover effects
  styleSheet.insertRule(
    `
    .animatedCard:hover {
      transform: translateY(-5px);
      box-shadow: 0px 12px 25px rgba(0, 0, 0, 0.5);
    }
    `,
    styleSheet.cssRules.length
  );
  
  styleSheet.insertRule(
    `
    .animatedSmallCard:hover {
      transform: translateY(-3px) scale(1.02);
      box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.3);
    }
    `,
    styleSheet.cssRules.length
  );

  // Add star hover effect
  styleSheet.insertRule(
    `
    .star:hover {
      transform: scale(1.2);
    }
    `,
    styleSheet.cssRules.length
  );

  // Set different animation delays for small cards
  for (let i = 0; i < 4; i++) {
    styleSheet.insertRule(
      `
      .animatedSmallCard:nth-child(${i + 1}) {
        --order: ${i};
      }
      `,
      styleSheet.cssRules.length
    );
  }
}

export default Skills;