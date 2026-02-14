"use client";

import { useState } from "react";
import { Press_Start_2P } from "next/font/google";
import "./page.css";

const pressStart2P = Press_Start_2P({ weight: "400", subsets: ["latin"] });

type ScreenSteps = {
  step: number;
  onNext: () => void;
};

export function TitleScreenContent({ step, onNext }: ScreenSteps) {
  const [isExiting, setIsExiting] = useState(false);

  const handleClick = () => {
    if (isExiting) return;
    setIsExiting(true);
  };

  const handleExitComplete = () => {
    onNext();
    setIsExiting(false);
  };


  return (
    <main className="main-wrapper" onClick={handleClick} role="button" tabIndex={0}>
      <div className="gradient-background" aria-hidden />
      <div className={`screen-content ${pressStart2P.className}`}>
        <div
          className={`step-content ${isExiting ? "fade-out" : "fade-in"}`}
          onAnimationEnd={() => isExiting && handleExitComplete()}
        >
          {step === 0 && (
            <>
              <h1 className="journey-title">Journey</h1>
              <p className="journey-subtitle text-white/60">Time to rise</p>
            </>
          )}
          {step === 1 && (
            <h1 className="journey-title" style={{ fontSize: "1.5rem" }}>
              What is your main goal?
            </h1>
          )}
          {step === 2 && (
            <h1 className="journey-title" style={{ fontSize: "1.5rem" }}>
              ur a bitch
            </h1>
          )}
        </div>
      </div>
    </main>
  );
}

export default function Page() {
  const [step, setStep] = useState(0);
  return (
    <div className="screen">
      <TitleScreenContent step={step} onNext={() => setStep((s) => s + 1)} />
    </div>
  );
}
