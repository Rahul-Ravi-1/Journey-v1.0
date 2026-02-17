"use client";

import { useState, useCallback } from "react";
import { Press_Start_2P } from "next/font/google";
import "./page.css";

const pressStart2P = Press_Start_2P({ weight: "400", subsets: ["latin"] });

const STEP_CONTENT: Record<
  number,
  | { title: string; subtitle: string }
  | string
> = {
  0: { title: "Journey", subtitle: "Time to rise" },
  1: "This tool is meant for growth",
  2: "Be honest with us but at the same time be kind to yourself",
  3: "What is your North Star?",
  4: "That's good. What's your next steps for this week?",
  5: "How can we achieve that?",
};

type ScreenSteps = {
  step: number;
  onNext: () => void;
};

export function TitleScreenContent({ step, onNext }: ScreenSteps) {
  const [isExiting, setIsExiting] = useState(false);

  const handleActivate = useCallback(() => {
    if (isExiting) return;
    setIsExiting(true);
  }, [isExiting]);

  const handleExitComplete = useCallback(() => {
    onNext();
    setIsExiting(false);
  }, [onNext]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleActivate();
      }
    },
    [handleActivate]
  );

  const content = STEP_CONTENT[step];
  if (content === undefined) return null;

  const isIntro = typeof content === "object";

  let animationClass = "fade-in";
  if (isExiting) animationClass = "fade-out";

  const handleAnimationEnd = () => {
    if (isExiting) handleExitComplete();
  };

  return (
    <main
      className="main-wrapper"
      onClick={handleActivate}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
    >
      <div className="gradient-background" aria-hidden />
      <div className={`screen-content ${pressStart2P.className}`}>
        <div
          className={`step-content ${animationClass}`}
          onAnimationEnd={handleAnimationEnd}
        >
          {isIntro && (
            <>
              <h1 className="journey-title">{content.title}</h1>
              <p className="journey-subtitle text-white/60">{content.subtitle}</p>
            </>
          )}
          {!isIntro && (
            <h1 className="journey-title journey-title-sm">{content}</h1>
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
