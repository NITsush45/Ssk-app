"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { FiSearch } from "react-icons/fi";
import bg from "../../public/background/codebg.jpg";
import dynamic from 'next/dynamic';
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import ClientOnly from "@/components/ClientOnly";
import { useRouter, usePathname } from "next/navigation";

// Dynamically import components
const RenderModel = dynamic(
  () => import("@/components/RenderModel"),
  { ssr: false, loading: () => <div>Loading 3D...</div> }
);

const Model = dynamic(
  () => import("@/components/models/model"),
  { ssr: false }
);

const Navigation = dynamic(
  () => import("@/components/navigation"),
  { ssr: false }
);

const Footer = dynamic(
  () => import("./projects/footer"),
  { ssr: false }
);


export default function Home() {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [swipeIndex, setSwipeIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const router = useRouter();
  
  const swipeImages = [
    "/background/sskimg2.jpeg",
    "/background/sskimg.jpeg",
    "/background/sskimg1.jpeg",
    "/background/sskimg4.jpeg",
    "/background/sskimg5.jpeg",
    "/background/sskimg6.jpeg",
    "/background/sskimg7.jpeg",
    "/background/sskimg8.jpeg",
  ];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setSwipeIndex((prev) => (prev + 1) % swipeImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [swipeImages.length]);
  
  useEffect(() => {
    fetchSpotifyTracks("top hits");
  }, []);

  async function fetchSpotifyTracks(query) {
    if (!query.trim()) return;
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        "https://spotify23.p.rapidapi.com/search/",
        {
          params: { q: query, type: "tracks" },
          headers: {
            "X-RapidAPI-Key":
              "39ad2a025bmsh47cc1c19ae4c1c5p1e1a13jsnd6f8295a231a",
            "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
          },
        }
      );

      const fetchedTracks = response.data.tracks.items.map((item) => ({
        id: item.data.id,
        name: item.data.name,
        artist: item.data.artists.items[0]?.profile.name || "Unknown",
        image: item.data.albumOfTrack.coverArt.sources[0]?.url,
      }));

      setTracks(fetchedTracks);
    } catch (err) {
      setError("Failed to fetch tracks");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <ClientOnly>
        <div style={{ position: "fixed", inset: 0, zIndex: 0 }}>
          <Image
            src={bg}
            alt="background-image"
            fill
            style={{ objectFit: "cover", opacity: 0.6 }}
            priority
          />
        </div>
      </ClientOnly>

      <main
        style={{
          position: "relative",
          width: "100%",
          flex: "1 0 auto",
          display: "flex",
          flexDirection: "column",
          overflow: "auto",
          scrollbarWidth: "none",
          zIndex: 10,
        }}
      >
        <ClientOnly>
          <div
            style={{
              position: "relative",
              left: 0,
              width: "100%",
              zIndex: 999,
            }}
          >
            <Navigation />
          </div>
        </ClientOnly>
        
        <div
          style={{
            position: "absolute",
            top: "80px",
            right: "40px",
            zIndex: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            background: "rgba(0, 0, 0, 0.5)",
            padding: "5px",
            borderRadius: "10px",
            width: "250px",
          }}
        >
          <div
            style={{
              marginBottom: "15px",
              background: "rgba(0, 0, 0, 0.8)",
              padding: "5px",
              borderRadius: "30px",
              textAlign: "center",
              width: "100%",
            }}
          >
            <h1
              style={{
                color: "#00FF00",
                fontSize: "18px",
                margin: 0,
                fontFamily: "cursive",
              }}
            >
              About the Developer :)
            </h1>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "5px",
            }}
          >
            <button
              onClick={() =>
                setSwipeIndex(
                  (prev) => (prev - 1 + swipeImages.length) % swipeImages.length
                )
              }
              style={{
                background: "rgba(255, 255, 255, 0.2)",
                border: "none",
                borderRadius: "50%",
                padding: "8px 12px",
                cursor: "pointer",
                color: "white",
                fontSize: "1rem",
                transition: "all 0.3s ease",
              }}
              aria-label="Previous image"
            >
              ‹
            </button>

            <div
              style={{
                position: "relative",
                width: "150px",
                height: "150px",
                flexShrink: 0,
              }}
            >
              <Image
                src={swipeImages[swipeIndex]}
                alt={`Music related ${swipeIndex + 1}`}
                fill
                style={{
                  borderRadius: "30px",
                  objectFit: "cover",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
              />
            </div>

            <button
              onClick={() =>
                setSwipeIndex((prev) => (prev + 1) % swipeImages.length)
              }
              style={{
                background: "rgba(255, 255, 255, 0.2)",
                border: "none",
                borderRadius: "50%",
                padding: "8px 12px",
                cursor: "pointer",
                color: "white",
                fontSize: "1rem",
                transition: "all 0.3s ease",
              }}
              aria-label="Next image"
            >
              ›
            </button>
          </div>

          <div
            style={{
              marginTop: "15px",
              background: "rgba(255, 255, 255, 0.2)",
              padding: "10px",
              borderRadius: "10px",
              textAlign: "center",
              width: "100%",
            }}
          >
            <div
              style={{
                color: "#FFFFFF",
                fontSize: "14px",
                fontWeight: "thin",
                overflowY: "scroll",
                maxHeight: expanded ? "250px" : "150px",
                width: "220px",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                scrollbarColor: "rgba(255,255,255,0)",
                padding: "10px",
                border: "1px solid black",
                borderRadius: "5px",
                backgroundColor: "#1e1e1e",
              }}
            >
              <p>Hello......& Welcome</p>
              <p>
                My name is <strong>Sushant Kumar</strong> and I am currently
                pursuing my Bachelor of Technology in Electronics &
                Communication as a third-year undergrad from{" "}
                <strong>NIT Kurukshetra</strong>. Being a passionate and
                versatile software developer with expertise in{" "}
                <strong>
                  full-stack development, game development, AI, and cloud
                  technologies.
                </strong>{" "}
                I bring creative problem-solving abilities and a diverse skill
                set across multiple programming languages, frameworks, and
                tools. My experience includes end-to-end project development,
                API integration, and leveraging emerging technologies for
                dynamic software solutions.
              </p>

              {expanded && (
                <>
                  <h3 style={{ fontSize: "14px", marginBottom: "5px" }}>
                    Skills & Expertise:
                  </h3>
                  <ul style={{ paddingLeft: "15px", marginBottom: "5px" }}>
                    <li>
                      <strong>Programming Languages:</strong> C#, C, C++,
                      Python, JavaScript, Dart, Java, Kotlin
                    </li>
                    <li>
                      <strong>Frontend Development:</strong> React.js, Redux,
                      Flutter (Android & iOS), Next.js, Bootstrap
                    </li>
                    <li>
                      <strong>Backend Development:</strong> Node.js, Express,
                      Django, Streamlit
                    </li>
                    <li>
                      <strong>Databases:</strong> MongoDB, PostgreSQL,
                      PineConeDB
                    </li>
                    <li>
                      <strong>AI & ML:</strong> Neural Networks (CNN), OpenCV,
                      K-Nearest Neighbors (KNN)
                    </li>
                    <li>
                      <strong>Game Development:</strong> Unity, Unreal Engine,
                      AI-powered game dev
                    </li>
                    <li>
                      <strong>Tools & DevOps:</strong> Docker, Git, GitHub,
                      Postman, Balsamiq Wireframes, Jetpack Compose, DBeaver
                    </li>
                    <li>
                      <strong>Cloud Services:</strong> AWS, Firebase, Google
                      Sheets, Azure
                    </li>
                    <li>
                      <strong>Other Technologies:</strong> WordPress, Hostinger,
                      Botpress (chatbots)
                    </li>
                  </ul>
                </>
              )}

              <button
                onClick={() => setExpanded(!expanded)}
                style={{
                  marginTop: "8px",
                  padding: "5px",
                  fontSize: "12px",
                  color: "#fff",
                  backgroundColor: "blue",
                  border: "none",
                  borderRadius: "20px",
                  cursor: "pointer",
                  width: "100%",
                }}
              >
                {expanded ? "Read Less" : "Read More about my Skills"}
              </button>
            </div>
          </div>
        </div>
        
        <div
          style={{
            position: "relative",
            zIndex: 15,
            display: "flex",
            padding: "20px",
            marginTop: "60px",
            flex: "1",
          }}
        >
          <div style={{ flex: 3, paddingRight: "20px" }}>
            <h2
              style={{
                color: "#00FF00",
                fontStyle: "italic",
                marginLeft: "10px",
                fontSize: "15px",
                backgroundColor: "rgba(0, 0, 0, 0.8)",
                padding: "8px 10px",
                borderRadius: "20px",
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
              }}
            >
              <MusicNoteIcon style={{ color: "#FFD700" }} />
              Your Song Buddy
            </h2>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "2px",
                marginTop: "5px",
                marginBottom: "5px",
              }}
            >
              <input
                type="text"
                placeholder="Enjoy songs with Ssk...."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && fetchSpotifyTracks(searchQuery)
                }
                style={{
                  width: "30vh",
                  padding: "8px",
                  borderRadius: "20px",
                  border: "1px solid gray",
                  background: "#D3D3D3",
                  color: "black",
                }}
              />
              <button
                onClick={() => {
                  setIsClicked(true);
                  fetchSpotifyTracks(searchQuery);
                  setTimeout(() => setIsClicked(false), 200);
                }}
                style={{
                  background: "#9370DB",
                  border: "1px solid white",
                  padding: "8px",
                  borderRadius: "10px",
                  cursor: "pointer",
                  transform: isClicked ? "scale(0.9)" : "scale(1)",
                  transition: "transform 0.1s ease-in-out",
                }}
              >
                <FiSearch size={15} color="white" />
              </button>
            </div>

            {loading ? (
              <p style={{ color: "cyan" }}>Loading....</p>
            ) : error ? (
              <p style={{ color: "red" }}>{error}</p>
            ) : (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                  gap: "8px",
                  marginTop: "5px",
                  maxHeight: "35vh",
                  maxWidth: "35vh",
                  overflowY: "auto",
                  opacity: 0.8,
                  background: "rgba(34, 34, 34, 0.8)",
                  padding: "10px",
                  borderRadius: "10px",
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
              >
                {tracks.map((track) => (
                  <div
                    key={track.id}
                    style={{
                      textAlign: "center",
                      background: "#222",
                      padding: "10px",
                      borderRadius: "10px",
                    }}
                  >
                    <Image
                      src={track.image}
                      alt={track.name}
                      width={120}
                      height={120}
                      style={{ borderRadius: "10px" }}
                    />
                    <p
                      style={{
                        color: "white",
                        marginTop: "10px",
                        fontSize: "14px",
                      }}
                    >
                      {track.name}
                    </p>
                    <p style={{ color: "gray", fontSize: "12px" }}>
                      {track.artist}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <ClientOnly>
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 14.5,
              pointerEvents: "none",
            }}
          >
            <RenderModel>
              <Model />
            </RenderModel>
          </div>
        </ClientOnly>
      </main>

      <ClientOnly>
        <footer
          style={{
            width: "100%",
            zIndex: 100,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(5px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            flexShrink: 0,
            marginTop: "auto",
          }}
        >
          <Footer />
        </footer>
      </ClientOnly>
    </div>
  );
}