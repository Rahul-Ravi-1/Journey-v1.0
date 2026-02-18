"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { Press_Start_2P } from "next/font/google";
import "./page.css";
import { JourneyData, emptyJourneyData } from "@/types/journey";

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
  setJourneyData: React.Dispatch<React.SetStateAction<JourneyData>>;
};

const INPUT_PLACEHOLDERS: Record<number, string> = {
  3: "Type your North Star here...",
  4: "What are your next steps for this week?",
  5: "One action per line (up to 5)...",
};

const CLICK_COOLDOWN_MS = 1000;

export function TitleScreenContent({ step, onNext, setJourneyData }: ScreenSteps) {
  const [isExiting, setIsExiting] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [inputRevealed, setInputRevealed] = useState(false);
  const lastAdvanceRef = useRef(0);

  const showInput = step >= 3 && step <= 5;
  const placeholder = INPUT_PLACEHOLDERS[step] ?? "";

  // Reset input state when step changes: clear text and hide until animation ends
  useEffect(() => {
    setInputValue("");
    setInputRevealed(false);
  }, [step]);

  const handleActivate = useCallback(() => {
    const now = Date.now();
    if (isExiting || now - lastAdvanceRef.current < CLICK_COOLDOWN_MS) return;
    lastAdvanceRef.current = now;
    setIsExiting(true);
  }, [isExiting]);

  const handleExitComplete = useCallback(() => {
    // Save current input into journeyData before advancing (step 3 → northStar, 4 → weeklyGoal, 5 → weeklyActions)
    if (showInput && inputValue.trim() !== "") {
      setJourneyData((prev: JourneyData) => {
        if (step === 3) {
          return { ...prev, northStar: inputValue.trim() };
        }
        if (step === 4) {
          return { ...prev, weeklyGoal: inputValue.trim() };
        }
        if (step === 5) {
          const lines = inputValue
            .split(/\n/)
            .map((s) => s.trim())
            .filter(Boolean)
            .slice(0, 5);
          const weeklyActions: [string, string, string, string, string] = [
            lines[0] ?? "",
            lines[1] ?? "",
            lines[2] ?? "",
            lines[3] ?? "",
            lines[4] ?? "",
          ];
          return {
            ...prev,
            weeklyActions,
            infoCompleted: true,
          };
        }
        return prev;
      });
    }
    onNext();
    setIsExiting(false);
  }, [onNext, setJourneyData, step, showInput, inputValue]);

  const content = STEP_CONTENT[step];
  if (content === undefined) return null;

  const isIntro = typeof content === "object";

  let animationClass = "fade-in";
  if (isExiting) animationClass = "fade-out";

  const handleAnimationEnd = () => {
    if (isExiting) {
      handleExitComplete();
    } else if (showInput) {
      setInputRevealed(true);
    }
  };

  return (
    <main
      className="main-wrapper"
      onClick={handleActivate}
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
      {showInput && inputRevealed && (
        <div
          className="journey-input-layer"
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.stopPropagation()}
        >
          <div className="journey-input-wrap">
            <textarea
              className="journey-input"
              placeholder={placeholder}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              rows={3}
              aria-label={placeholder}
            />
          </div>
        </div>
      )}
    </main>
  );
}

export default function Page() {
  const [step, setStep] = useState(0);
  const [journeyData, setJourneyData] = useState<JourneyData>(emptyJourneyData);
  return (
    <div className="screen">
      <TitleScreenContent
        step={step}
        onNext={() => setStep((s) => s + 1)}
        setJourneyData={setJourneyData}
      />
    </div>
  );
}
