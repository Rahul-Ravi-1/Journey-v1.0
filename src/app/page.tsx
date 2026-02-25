"use client";

import { useState } from "react";
import { Press_Start_2P } from "next/font/google";
import "./page.css";
import { emptyJourneyData } from "@/types/journey";

const pressStart2P = Press_Start_2P({ weight: "400", subsets: ["latin"] });

export default function Page() {
  const [started, setStarted] = useState(false);
  const handleClick = () => setStarted(true);
  const [journeyData, setJourneyData] = useState(emptyJourneyData);
  const [animationDone, setAnimationDone] = useState(false);

  return (
    <div className="screen">
      <main
        className="main-wrapper"
        onClick={started ? undefined : handleClick}
        role={started ? undefined : "button"}
        aria-label={started ? undefined : "Start"}
      >
        <div className="gradient-background" aria-hidden />
        <div className={`screen-content ${pressStart2P.className}`}>
          <h1 className="journey-title">Journey</h1>
          <p
            className="journey-subtitle text-white/60"
            onAnimationEnd={() => setAnimationDone(true)}
          >
            Time to rise
          </p>
          <ul className={`journey-data-list ${animationDone ? "is-visible" : ""} ${pressStart2P.className}`}>
            <li className="journey-data">North Star: {journeyData.northStar}</li>
            <li className="journey-data">Weekly Goal: {journeyData.weeklyGoal}</li>
            <li className="journey-data">Weekly Actions: {journeyData.weeklyActions.join(", ")}</li>
            <li className="journey-data">Fire State: {journeyData.fireState}</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
