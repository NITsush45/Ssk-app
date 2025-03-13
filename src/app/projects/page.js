import Image from "next/image";
import bg from "../../../public/background/cdbg.jpg";
import ProjectList from "@/components/projects";
import { projectsData } from "../../components/projects/data";

export default function Home() {
  return (
    <main className="relative w-full h-screen overflow-hidden">
      <div className="relative w-full h-full">
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
          className="absolute inset-0"
          style={{ backdropFilter: "blur(10px)" }}
        />
      </div>

      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 9999,
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div
            className="scrollable-content w-full max-w-4xl h-[80vh] p-6 rounded-lg shadow-lg bg-white/20 backdrop-blur-md"
            style={{
              maxHeight: "100vh",
              overflowY: "auto",
            }}
          >
            <ProjectList projects={projectsData} />
          </div>
        </div>
      </div>
    </main>
  );
}
