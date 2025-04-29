"use client";
import Navigation from "@/components/navigation";
import React, { useEffect } from "react";
import Footer from "../projects/footer";
// Import icons from react-icons
import { 
  BiCodeAlt, BiServer, BiData, BiMobileAlt, BiGame, BiCloud,
  BiCodeCurly, BiPalette, BiAtom, BiLaptop, BiBot
} from "react-icons/bi";
import { FaReact, FaDatabase, FaNodeJs, FaAndroid, FaUnity, FaDocker } from "react-icons/fa";
import { AiOutlineApi, AiOutlineLock } from "react-icons/ai";
import { SiTensorflow, SiPytorch, SiJupyter, SiFlutter, SiKubernetes } from "react-icons/si";
import { MdQueryStats, MdOutlineManageAccounts } from "react-icons/md";
import { IoLanguage } from "react-icons/io5";
import { HiOutlineCode } from "react-icons/hi";

const Skills = () => {
  // Function to add animations once component is mounted
  useEffect(() => {
    if (typeof window !== "undefined") {
      const styleSheet = document.styleSheets[0];
      
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
      for (let i = 0; i < 6; i++) {
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
  }, []);

  // Main skill categories with detailed descriptions, manually defined skill levels, and icons
  const mainSkills = [
    {
      heading: "Languages",
      text: "Proficient in Programming languages like:- Java, Python, C, C++, C#, PHP, Dart, Kotlin and web programming languages like JavaScript, HTML, CSS, VHDL",
      skillLevel: 90,
      icon: <HiOutlineCode size={36} />
    },
    {
      heading: "Web Development",
      text: "Proficient in modern frontend frameworks like React, Next.js, and Vue.js. Experienced in building responsive, accessible, and performant web applications with clean and maintainable code. Skilled in HTML5, CSS3, JavaScript ES6+, TypeScript, and various CSS frameworks including Tailwind, Bootstrap, and Material UI.",
      skillLevel: 90,
      icon: <FaReact size={36} />
    },
    {
      heading: "Backend Development",
      text: "Strong foundation in Node.js, Express, Django, Flask. Capable of designing RESTful APIs and implementing server-side logic. Experienced in building scalable microservices, handling authentication/authorization, and optimizing database performance for high-traffic applications.",
      skillLevel: 85,
      icon: <BiServer size={36} />
    },
    {
      heading: "Databases",
      text: "Hands on experience with database technologies like MongoDB, PostgreSQL, MySQL, Firebase, PineconeDB. Along with manually managing database with the help of tools like DBeaver.",
      skillLevel: 85,
      icon: <FaDatabase size={36} />
    },
    {
      heading: "Artificial Intelligence & Machine Learning (AI/ML)",
      text: "Expertise in developing AI/ML models, including supervised and unsupervised learning, deep learning architectures, data science, and analytics. Proficient in training, fine-tuning, and deploying ML/DL models using TensorFlow, Keras, PyTorch Vision, and Convolutional Neural Networks (CNN). Experienced in data manipulation, statistical analysis, and visualization with NumPy, Pandas, SciPy, Matplotlib, Seaborn, Plotly, and Dash. Skilled in Natural Language Processing (NLP) with NLTK, Hugging Face API, and SpeechRecognition for text processing, sentiment analysis, and language model fine-tuning. Proficient in Computer Vision applications using OpenCV, Pillow, and Librosa for object detection, facial recognition, and image classification. Experienced with AI development platforms such as Jupyter, Google Colab, and MATLAB for model experimentation, optimization, and cloud-based training.",
      skillLevel: 92,
      icon: <BiBot size={36} />
    },
    {
      heading: "App/Android/iOS Development",
      text: "Proficient in developing cross-platform mobile applications using Flutter and Dart. Experienced in native Android development with Kotlin and Java, leveraging Android Studio and Android SDK. Skilled in implementing Material Design, state management, Firebase integration, API handling, and performance optimization for scalable mobile apps.",
      skillLevel: 90,
      icon: <BiMobileAlt size={36} />
    },
    {
      heading: "Game Development",
      text: "Experienced in game development using Unity and C#. Skilled in designing interactive gameplay mechanics, physics simulations, and 2D/3D rendering. Proficient in optimizing game performance, implementing AI-driven behaviors, and integrating assets for an immersive gaming experience.",
      skillLevel: 84,
      icon: <BiGame size={36} />
    },
    {
      heading: "Cloud Platforms",
      text: "Proficient in cloud platforms like AWS, Azure, and Google Cloud. Experienced in deploying applications on cloud servers, managing cloud storage, and implementing serverless computing architectures. Skilled in configuring cloud services, managing cloud databases, and automating cloud-based workflows.",
      skillLevel: 78,
      icon: <BiCloud size={36} />
    }            
  ];

  // Related smaller skill sets for each main skill with manually defined skill levels and icons
  const relatedSkills = [
    [
      {
        heading: "General Purpose Languages",
        text: "Java, Python, C, C++, C#, PHP, Dart, Kotlin",
        skillLevel: 92,
        icon: <BiCodeAlt size={24} />
      },
      {
        heading: "Web Technologies Languages",
        text: "JavaScript, HTML, CSS, VHDL",
        skillLevel: 90,
        icon: <HiOutlineCode size={24} />
      },
    ],
    // Web Development related skills
    [
      {
        heading: "Frontend Frameworks",
        text: "React, Next.js, Vue, Angular, React Native, Three.js",
        skillLevel: 95,
        icon: <FaReact size={24} />
      },
      {
        heading: "CSS & Styling",
        text: "Tailwind CSS, Styled Components, SASS, Material-UI, Bootstrap, DaisyUI",
        skillLevel: 95,
        icon: <BiPalette size={24} />
      },
      {
        heading: "State Management",
        text: "Redux, Context API, Zustand",
        skillLevel: 85,
        icon: <BiAtom size={24} />
      },
      {
        heading: "Web Performance",
        text: "Lazy Loading, Code Splitting, Optimization",
        skillLevel: 87,
        icon: <BiLaptop size={24} />
      },
      {
        heading: "Styling & UI Components",
        text:"Tailwind CSS, DaisyUI, Material Design, React-Icons, React-Calendar, Toast",
        skillLevel: 90,
        icon: <BiPalette size={24} />
      }
    ],
    // Backend Development related skills
    [
      {
        heading: "Frameworks",
        text: "Django, Express.js, Node.js, Flask, Laravel",
        skillLevel: 90,
        icon: <FaNodeJs size={24} />
      },
      {
        heading: "API Development",
        text: "REST, GraphQL, WebSockets, Postman, Docker",
        skillLevel: 92,
        icon: <AiOutlineApi size={24} />
      },
      {
        heading: "Authentication",
        text: "JWT, OAuth, Session Management",
        skillLevel: 83,
        icon: <AiOutlineLock size={24} />
      },
      {
        heading: "Server Technologies",
        text: "Express, Fastify, NestJS",
        skillLevel: 89,
        icon: <BiServer size={24} />
      },
      {
        heading: "Real-Time Communication",
        text: "Socket.io",
        skillLevel: 88,
        icon: <BiCodeCurly size={24} />
      },
      {
        heading: "Security & Authentication",
        text: "Bcrypt",
        skillLevel: 80,
        icon: <AiOutlineLock size={24} />
      },
      {
        heading: "Caching",
        text: "Redis, Memcached",
        skillLevel: 85,
        icon: <BiCodeCurly size={24} />
      }
    ],
    [
      {
        heading: "NoSQL Databases",
        text: "Firebase, MongoDB, PineconeDB (Vector Database)",
        skillLevel: 87,
        icon: <FaDatabase size={24} />
      },
      {
        heading: "SQL Database",
        text: "PostgreSQL",
        skillLevel: 80,
        icon: <FaDatabase size={24} />
      },
      {
        heading: "Query Language",
        text: "GraphQL(query language for APIs)",
        skillLevel: 82,
        icon: <MdQueryStats size={24} />
      },
      {
        heading: "Database Performance",
        text: "Indexing, Query Optimization, Denormalization",
        skillLevel: 80,
        icon: <BiData size={24} />
      },
      {
        heading: "Database Management",
        text: "DBeaver, MySQL Workbench",
        skillLevel: 85,
        icon: <MdOutlineManageAccounts size={24} />
      }
    ],
    [
      {
        heading: "Machine Learning & Deep Learning",
        text: "TensorFlow, Keras, PyTorch Vision, CNN",
        skillLevel: 90,
        icon: <SiTensorflow size={24} />
      },
      {
        heading: "Data Science & Analytics",
        text: "NumPy, Pandas, SciPy, Matplotlib, Seaborn, Plotly, Dash",
        skillLevel: 90,
        icon: <BiData size={24} />
      },
      {
        heading: "Natural Language Processing (NLP)",
        text: "NLTK, Hugging Face API, SpeechRecognition",
        skillLevel: 85,
        icon: <BiCodeAlt size={24} />
      },
      {
        heading: "Computer Vision",
        text: "OpenCV, Pillow, Librosa",
        skillLevel: 88,
        icon: <BiCodeCurly size={24} />
      },
      {
        heading: "AI Development Platforms",
        text: "Jupyter, Google Colab, MATLAB",
        skillLevel: 90,
        icon: <SiJupyter size={24} />
      },
    ],
    [
      {
        heading: "App & Android/iOS Development",
        text: "Flutter Development, Kotlin, Android Studio",
        skillLevel: 90,
        icon: <SiFlutter size={24} />
      },
      {
        heading: "React Native",
        text: "React Native",
        skillLevel: 90,
        icon: <FaReact size={24} />
      },
      {
        heading: "iOS Development",
        text: "Swift, Objective-C, Xcode",
        skillLevel: 85,
        icon: <BiMobileAlt size={24} />
      },
      {
        heading: "Android Development",
        text: "Java, Kotlin",
        skillLevel: 90,
        icon: <FaAndroid size={24} />
      },
      {
        heading: "Mobile App Development Platforms",
        text: "App Store, Google Play Store, TestFlight",
        skillLevel: 90,
        icon: <BiMobileAlt size={24} />
      },
    ],
    [
      {
        heading: "Game Development",
        text: "Unity, C#",
        skillLevel: 80,
        icon: <FaUnity size={24} />
      },
      {
        heading: "Game Engine",
        text: "Unity, Unreal Engine",
        skillLevel: 85,
        icon: <BiGame size={24} />
      },
      {
        heading: "Game Design",
        text: "Game Design Document (GDD), Prototyping, Storyboarding, GIMP Art",
        skillLevel: 80,
        icon: <BiPalette size={24} />
      },
      {
        heading: "Game Development Platforms",
        text: "Unity, Unreal Engine, GameMaker Studio",
        skillLevel: 90,
        icon: <FaUnity size={24} />
      },
    ],
    [
      {
        heading: "Cloud Platforms",
        text: "AWS, Azure, Google Cloud",
        skillLevel: 80,
        icon: <BiCloud size={24} />
      },
      {
        heading: "Serverless Computing",
        text: "AWS Lambda, Google Cloud Functions, Azure Functions",
        skillLevel: 85,
        icon: <BiCodeCurly size={24} />
      },
      {
        heading: "Containerization",
        text: "Docker, Kubernetes",
        skillLevel: 80,
        icon: <FaDocker size={24} />
      },
      {
        heading: "DevOps",
        text: "CI/CD, Jenkins, GitLab CI/CD",
        skillLevel: 85,
        icon: <BiCodeAlt size={24} />
      },
      {
        heading: "Cloud Monitoring & Logging",
        text: "AWS CloudWatch, Google Cloud Monitoring, Azure Monitor",
        skillLevel: 80,
        icon: <BiCloud size={24} />
      },
      {
        heading: "Cloud Architecture Design",
        text: "AWS CloudFormation, Google Cloud Deployment Manager, Azure Resource Manager",
        skillLevel: 85,
        icon: <SiKubernetes size={24} />
      },
    ]
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
            className="star"
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
        <div style={styles.line}></div> {/* Vertical line */}
        
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
                <div style={styles.iconContainer}>
                  <div style={styles.iconWrapper}>
                    {mainSkill.icon}
                  </div>
                </div>
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
                  <div style={styles.smallIconContainer}>
                    {skill.icon}
                  </div>
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
    position: "relative",
  },
  iconContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "15px",
  },
  iconWrapper: {
    background: "linear-gradient(135deg, #00f9ff, #4B0082)",
    borderRadius: "50%",
    width: "70px",
    height: "70px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
    color: "#fff",
  },
  smallIconContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "10px",
    color: "#00f9ff",
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