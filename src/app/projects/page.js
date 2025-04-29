import Image from "next/image";
import bg from "../../../public/background/cdbg.jpg";
import ProjectList from "@/components/projects";
import { projectsData } from "../../components/projects/data";
import Navigation from "@/components/navigation";
import Footer from "./footer";

export default function Home() {
  return (
    <main style={{
      position: "relative",
      width: "100%",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden"
    }}>
      {/* Background Layer */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0
      }}>
        <Image
          src={bg}
          alt="background-image"
          fill
          style={{
            objectFit: "cover",
            opacity: 0.6,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            backdropFilter: "blur(10px)"
          }}
        />
      </div>

      {/* Navigation - at the top */}
      <div style={{ position: "relative", zIndex: 20 }}>
        <Navigation />
      </div>

      {/* Content Layer - takes remaining space */}
      <div style={{
        position: "relative",
        flex: 1,
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 10,
        overflow: "hidden"
      }}>
        <div style={{
          width: "100%",
          maxWidth: "4xl",
          height: "calc(100vh - 80px)", // Adjust based on Navigation height
          margin: "0 auto",
          padding: "1.5rem",
          borderRadius: "0.5rem",
          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          backdropFilter: "blur(16px)",
          overflowY: "auto"
        }}>
          <ProjectList projects={projectsData} />
        </div>
      </div>

      {/* Optional Footer */}
      {/* <div style={{ position: "relative", zIndex: 20 }}>
        <Footer />
      </div> */}
    </main>
  );
}