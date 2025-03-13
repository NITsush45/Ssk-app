"use client";
import Navigation from "@/components/navigation";
import React from "react";
import Footer from "../projects/footer";

const About = () => {
  const cards = [
    {
      heading: "About Sushant (Ssk)",
      text: "Welcome to our platform! We are dedicated to providing the best experience for our users. Our mission is to innovate and deliver high-quality solutions tailored to your needs.",
    },
    {
      heading: "Our Mission",
      text: "Whether you are here to explore, learn, or grow, we are here to support you every step of the way. Let's achieve greatness together.",
    },
    {
      heading: "Our Vision",
      text: "We envision a world where technology bridges gaps and makes life easier, better, and more enjoyable for everyone.",
    },
    {
      heading: "Our Values",
      text: "Integrity, innovation, and collaboration drive everything we do. We believe in being transparent and working closely with our community to bring meaningful impact.",
    },
    {
      heading: "Our Team",
      text: "A passionate group of developers, designers, and creators united by a common goal — to make technology accessible and valuable for all.",
    },
    {
      heading: "Join Us",
      text: "Be a part of our journey. Whether as a contributor, partner, or user, your presence matters and makes a difference in our growing community.",
    },
  ];

  return (
    <div style={styles.container}>
      <Navigation />
      <div style={styles.contentWrapper}>
        <div style={styles.centerText}>About My life </div>
        <div style={styles.line}></div> {/* Vertical animated line */}
        {cards.map((card, idx) => (
          <div
            key={idx}
            style={{
              ...styles.cardWrapper,
              flexDirection: idx % 2 === 0 ? "row" : "row-reverse",
            }}
          >
            {/* Horizontal line to connect center vertical line and card */}
            <div
              style={{
                ...styles.horizontalLine,
                [idx % 2 === 0 ? "right" : "left"]: "50%",
              }}
            ></div>

            <div style={styles.card}>
              <h2 style={styles.heading}>{card.heading}</h2>
              <p style={styles.text}>{card.text}</p>
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
    backgroundImage: 'url("/background/abbg.jpg")',
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
  contentWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "80px",
    width: "100%",
    maxWidth: "1000px",
    margin: "20px auto",
    flex: 1,
    paddingBottom: "80px",
    position: "relative",
  },
  centerText: {
    position: "absolute",
    top: "-40px",
    left: "50%",
    transform: "translateX(-50%)",
    fontSize: "24px",
    fontWeight: "thin",
    fontStyle:"italic",
    color: "#fff",
    zIndex: 2,
    background: "rgba(0, 0, 0, 0.7)",
    padding: "10px 20px",
    borderRadius: "30px",
    marginTop:"20px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.4)",
  },
  line: {
    position: "absolute",
    left: "50%",
    top: 0,
    bottom: 0,
    width: "4px",
    background: "linear-gradient(to bottom, #00f, #0ff)",
    animation: "moveUpDown 4s infinite alternate ease-in-out",
    zIndex: 0,
    marginTop:"10px",
    borderRadius: "4px",
  },
  cardWrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    position: "relative",
    marginTop:"50px",
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
  card: {
    background: "linear-gradient(135deg, #333333 70%, #8B4513 30%)",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
    maxWidth: "45%",
    textAlign: "center",
    zIndex: 1,
  },
  heading: {
    color: "#fff",
    fontSize: "22px",
    marginBottom: "10px",
  },
  text: {
    color: "#bbb",
    fontSize: "16px",
    lineHeight: "1.6",
  },
  footer: {
    bottom: "0",
    width: "100%",
    backgroundColor: "#121212",
  },
};

// Add animation via global styles
const styleSheet =
  typeof window !== "undefined" ? document.styleSheets[0] : null;
if (styleSheet) {
  styleSheet.insertRule(
    `
    @keyframes lineAnimation {
  0% { background-position: 0% 0%; }
  100% { background-position: 0% 100%; }
}
  
  `,
    styleSheet.cssRules.length
  );
}

export default About;
