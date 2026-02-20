"use client";

import { Press_Start_2P } from "next/font/google";
import "./page.css";

const pressStart2P = Press_Start_2P({ weight: "400", subsets: ["latin"] });

export default function Page() {
  return (
    <div className="screen">
      <main className="main-wrapper">
        <div className="gradient-background" aria-hidden />
        <div className={`screen-content ${pressStart2P.className}`}>
          <h1 className="journey-title">Journey</h1>
          <p className="journey-subtitle text-white/60">Time to rise</p>
        </div>
      </main>
    </div>
  );
}
