"use client";

import { useState } from "react";
import { Press_Start_2P } from "next/font/google";
import "./page.css";

const pressStart2P = Press_Start_2P({ weight: "400", subsets: ["latin"] });

export default function Main() {
  const [step, setStep] = useState(0);

  return (
    <div onClick={() => setStep((s) => s + 1)} className="screen">
      <main className="main-wrapper">
        <div className="gradient-background" aria-hidden />
        <div className={`screen-content ${pressStart2P.className}`}>
          {step === 0 && (
            <>
              <h1 className="journey-title">Journey</h1>
              <p className="journey-subtitle text-white/60">Time to rise</p>
            </>
          )}
          {step === 1 && (
            <h1 className="journey-title" style={{ fontSize: "1.5rem" }}>What is your main goal?</h1>
          )}
        </div>
      </main>
    </div>
  );
}
