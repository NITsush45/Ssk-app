"use client";
import Navigation from "@/components/navigation";
import React, { useEffect } from "react";
import Footer from "../projects/footer";
import Image from "next/image";

const About = () => {
  const cards = [
    {
      heading: "My Childhood Journey",
      text: "From an early age, I displayed an ambitious and inquisitive nature, always eager to explore and learn. I began my education at a young age while also nurturing my passion for cricket as a favorite pastime.",
      imageUrl: "/background/born.avif", // Add your image path here
    },
    {
      heading: "My ambition of being Scientist",
      text: "By the time I reached the third grade, I had developed a keen interest in science. It was during this period that I first dreamed of becoming a scientist, dedicating myself to the pursuit of knowledge and the wonders of scientific exploration.",
      imageUrl: "/background/scientist-kid.avif", // Add your image path here
    },
    {
      heading: "Interest in Singing & Creativity",
      text: "Life took an unexpected turn when one of my teachers recognized my talent for singing. This discovery marked my introduction to the world of music, where I began performing on stage at various events. From that point forward, I juggled both academics and my newfound passion for singing.",
      imageUrl: "/background/boysing.jpeg", // Add your image path here
    },
    {
      heading: "Suddenly my singing talent fall off and last attempt to kick off my last dream of being a cricketer.",
      text: "As my academic responsibilities grew, I found it increasingly difficult to balance my studies with my musical endeavors. When an important event coincided with my exams, I had to make the difficult decision to step away from singing. It was then that I reignited my passion for cricket, aspiring to represent the Indian National Cricket Team. I joined a cricket academy and eventually had the opportunity to represent my city in a tournament.",
      imageUrl: "/background/cric.avif", // Add your image path here
    },
    {
      heading: "Leaving cricket to advance in my career",
      text: "The mounting academic pressure and frequent exams made it challenging to devote time to cricket. Consequently, I had to give up my dream of becoming a professional cricketer and shift my focus entirely to academics.",
      imageUrl: "/background/cricket.jpg", // Add your image path here
    },
    {
      heading: "Advancing in my Educational career, & Boards",
      text: "With my focus now firmly on academics, I became more disciplined in my studies, aligning myself with the rigorous preparations required for my board exams.",
      imageUrl: "/background/study.webp", // Add your image path here
    },
    {
      heading: "Changing School for 10+2 & cracking several exams",
      text: "I enrolled in a new school for my higher secondary education (10+2) and, during this period, successfully cleared multiple competitive exams, including PRMO, NSTSE, and NAEST.",
      imageUrl: "/background/aiboy.jpg", // Add your image path here
    },
    {
      heading: "Getting offer of admission from Cornell University and clearing TATA Scholarship.", 
      text: "During my 12th-grade studies, I achieved a significant milestone by securing an admission offer from Cornell University, supported by the prestigious TATA Scholarship and a Buddy4Study Application Fee Waiver. Unfortunately, due to unforeseen circumstances, I was unable to enroll, marking a major setback in my academic journey. ",
      imageUrl: "https://th.bing.com/th/id/OIP.rrYw2dxc2uR9t4-wFvSyIQHaEE?rs=1&pid=ImgDetMain", // Add your image path here
    },
    {
      heading: "Disappointed from these failures and again failed to get high percentile in JEE",
      text: "The disappointment did not end there, as I was unable to achieve a high percentile in the JEE examination. This was a deeply disheartening phase of my life, as I had invested immense effort into my preparations.",
      imageUrl: "https://img.freepik.com/premium-photo/mental-health-awareness_553012-16739.jpg", // Add your image path here
    },
    {
      heading: "Taking admission in SRM, Ghaziabad, and preparation of JEE again",
      text: "Despite my setbacks, I secured admission to SRM University, Ghaziabad, in the Bachelor of Technology program in Computer Science. Determined not to give up on my dream, I continued preparing for JEE while managing my academic responsibilities.",
      imageUrl: "https://th.bing.com/th/id/OIP.ntzz7Ldic3ByJCO6U4pd8AHaCe?rs=1&pid=ImgDetMain", // Add your image path here
    },
    {
      heading: "Qualifying for the JEE, along with maintaining CGPA in SRM",
      text: "After a year of dedication and perseverance, I managed to maintain a CGPA of 9.1 at SRM while simultaneously qualifying for JEE with a commendable percentile of 98.145.",
      imageUrl: "https://wallpaperaccess.com/full/9480314.jpg", // Add your image path here
    },
    {
      heading: "Getting admission in NIT, Kurukshetra in B.Tech ECE but continued to work in IT part.",
      text: "My JEE qualification led to my admission to the National Institute of Technology (NIT) Kurukshetra, where I pursued a B.Tech in Electronics and Communication Engineering (ECE). However, my prior exposure to IT and software development kept me actively engaged in the field, balancing my academic coursework with my passion for technology.",
      imageUrl: "https://www.collegechalo.com/news/wp-content/uploads/2020/03/NITK1-1024x681.jpeg", // Add your image path here
    },
    {
      heading: "Working regularly in IT part and so affected in ECE part",
      text: "During my time at NIT, I immersed myself in IT-related fields, mastering Data Structures & Algorithms and beginning my journey in Web Development. I also undertook a doubt-solving internship in my second semester. Unfortunately, my growing interest in IT led to a decline in my performance in core ECE subjects.",
      imageUrl: "https://th.bing.com/th/id/OIP.WZJhIp2M3ZRn5t8b_l83FQHaFj?w=800&h=600&rs=1&pid=ImgDetMain", // Add your image path here
    },
    {
      heading: "Completed Web Development, Done AIML research internship.",
      text: "I successfully completed my Web Development training and secured an AI/ML research internship at Woosong University, South Korea. My research focused on Neural Networks, and after two months of intensive work, I successfully completed my Summer Internship. This experience solidified my interest in Artificial Intelligence and Machine Learning.",
      imageUrl: "https://2.bp.blogspot.com/-U5UbLbjuQvM/Wp-Pb-34TnI/AAAAAAAAAJg/bwLpWnM_L0E90DkN8OpzIm5ol8axYtcugCLcBGAs/s1600/7%2B1webdevelopment_1600x1200_021014.jpg", // Add your image path here
    },
    {
      heading: "Continuosly worked in AI & ML along with starting game development for free-lancing.",
      text: "With a newfound passion for AI and ML, I continued my exploration of the field. Simultaneously, I ventured into game development, learning C# and mastering the Unity game engine. I began freelancing by developing multiple games, further expanding my technical skill set.",
      imageUrl: "https://sreyas.ac.in/wp-content/uploads/2020/06/web-banner-AIML-1.jpg", // Add your image path here
    },
    {
      heading: "Completed Game Development and started Android/iOS Development",
      text: "After successfully completing my game development journey, I shifted my focus to mobile app development. I learned Flutter and Dart, leading me to work on a project for CRED, where I developed the frontend and REST API in Flutter. Additionally, I completed an internship at ReachInboxAI as a Backend Developer.",
      imageUrl: "https://th.bing.com/th/id/OIP.A96BfCRZQd_YNaN1TQMnhAHaEK?rs=1&pid=ImgDetMain", // Add your image path here
    },
    {
      heading: "Recently worked as Full Stack Devloper in C.H.I.R.A.G Technologies",
      text: "Most recently, I worked as a Full-Stack Developer at C.H.I.R.A.G Technologies, where I contributed to the development of an application using Kotlin, MVVM architecture, Google Cloud Platform, DBeaver. This experience further honed my software development skills and prepared me for future challenges in the industry.",
      imageUrl: "https://i1.wp.com/articleusa.com/wp-content/uploads/2021/02/software_development-blog-banner.png?resize=1536%2C922&ssl=1", // Add your image path here
    }
  ];

  // Add intersection observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe all cards
    document.querySelectorAll('.animated-card').forEach((card) => {
      observer.observe(card);
    });

    return () => {
      observer.disconnect();
    };
  }, []);
  
  // Add global styles for animations
  useEffect(() => {
    if (typeof window !== "undefined") {
      const style = document.createElement('style');
      style.innerHTML = `
        
        @keyframes rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes glow {
          0% { box-shadow: 0 0 5px rgba(0, 255, 255, 0.6); }
          50% { box-shadow: 0 0 20px rgba(0, 255, 255, 0.8); }
          100% { box-shadow: 0 0 5px rgba(0, 255, 255, 0.6); }
        }
        
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `;
      document.head.appendChild(style);

      return () => {
        document.head.removeChild(style);
      };
    }
  }, []);

  return (
    <div style={styles.container}>
      <Navigation />
      <div style={styles.contentWrapper}>
        <div style={styles.centerText} className="animate-fadeIn">About My life </div>
        <div style={styles.line}></div> {/* Vertical animated line */}
        {cards.map((card, idx) => (
          <div
            key={idx}
            className="animated-card"  
            style={{
              ...styles.cardWrapper,
              flexDirection: idx % 2 === 0 ? "row" : "row-reverse",
              opacity: 0,
              transform: "translateY(20px)",
              transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
              transitionDelay: `${idx * 0.2}s`
            }}
          >
            {/* Horizontal line to connect center vertical line and card */}
            <div
              style={{
                ...styles.horizontalLine,
                [idx % 2 === 0 ? "right" : "left"]: "50%",
                animation: `shimmer 3s infinite linear`,
                backgroundSize: "200% 100%",
                backgroundImage: "linear-gradient(to right, #0ff, #00f, #0ff)"
              }}
            ></div>

            <div 
              style={styles.card}
              className="hover-card"
            >
              <div 
                style={styles.imageContainer}
                className="rotate-on-hover"
              >
                {/* Next/Image component for better performance */}
                <img 
                  src={card.imageUrl} 
                  alt={card.heading}
                  style={styles.image}
                />
              </div>
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
    animation: "fadeIn 1.5s ease-in-out, pulse 2s infinite ease-in-out",
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
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },
  imageContainer: {
    width: "80px",
    height: "80px",
    marginBottom: "15px",
    borderRadius: "50%",
    overflow: "hidden",
    border: "3px solid #0ff",
    boxShadow: "0 0 10px rgba(0, 255, 255, 0.6)",
    transition: "transform 0.5s ease",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
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

// Add animation via CSS-in-JS
const styleSheet =
  typeof window !== "undefined" ? document.styleSheets[0] : null;
if (styleSheet) {
  styleSheet.insertRule(`
    .animate-fadeIn {
      animation: fadeIn 1.5s ease-in-out;
    }
  `, styleSheet.cssRules.length);
  
  styleSheet.insertRule(`
    .hover-card:hover {
      transform: translateY(-10px);
      box-shadow: 0px 10px 20px rgba(0, 255, 255, 0.3);
    }
  `, styleSheet.cssRules.length);
  
  styleSheet.insertRule(`
    .rotate-on-hover:hover {
      animation: rotate 1s ease-in-out;
    }
  `, styleSheet.cssRules.length);
}

export default About;