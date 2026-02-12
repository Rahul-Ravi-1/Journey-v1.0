import { Press_Start_2P } from "next/font/google";
import "./page.css";

const pressStart2P = Press_Start_2P({ weight: "400", subsets: ["latin"] });

export default function Main() {
  return (
    <main className="main-wrapper">
      <div className="gradient-background" aria-hidden />
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4">
        <h1 className={`journey-title ${pressStart2P.className}`}>Journey</h1>
        <p 
          className={`${pressStart2P.className} text-white/60`}
          style={{ fontSize: "1.0rem", 
            textShadow: "0 0 3px rgba(255, 255, 255, 0.5)", 
            animationDelay: "1.2s", 
            animation: "fadeInTop 0.5s ease-out 1.0s forwards", 
            opacity: 0,
            marginTop: "1.5rem"
          }}
        >
        Time to rise
        </p>
      </div>
    </main>
  );
}
