# Interactivity Examples (Code Snippets)

Copy-paste friendly snippets for button clicks, controlled inputs, screen transitions, and form submit. All code belongs in markdown or in your own files when you implement; adapt as needed for the Journey app.

---

## 1. Button clicks (client component)

Requires `"use client"` so that hooks and `onClick` work.

```tsx
"use client";

import { useState } from "react";

export default function ClickExample() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount((c) => c + 1);
  }

  return (
    <div>
      <p>Count: {count}</p>
      <button type="button" onClick={handleClick}>
        Increment
      </button>
    </div>
  );
}
```

- Use `type="button"` on buttons that are not meant to submit a form.
- Handler can be inline: `onClick={() => setCount(c => c + 1)}` or a named function as above.

---

## 2. Controlled inputs

### Single text input

```tsx
"use client";

import { useState } from "react";

export default function NameInput() {
  const [name, setName] = useState("");

  return (
    <input
      type="text"
      value={name}
      onChange={(e) => setName(e.target.value)}
      placeholder="Your name"
      aria-label="Your name"
    />
  );
}
```

### Checkbox

```tsx
const [checked, setChecked] = useState(false);

<input
  type="checkbox"
  checked={checked}
  onChange={(e) => setChecked(e.target.checked)}
  aria-label="Description of checkbox"
/>
```

### Multiple inputs (e.g. 5 daily habits)

```tsx
"use client";

import { useState } from "react";

const HABIT_COUNT = 5;

export default function HabitsInput() {
  const [habits, setHabits] = useState<string[]>(() =>
    Array(HABIT_COUNT).fill("")
  );

  function updateHabit(index: number, value: string) {
    setHabits((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  }

  return (
    <div>
      {habits.map((habit, i) => (
        <input
          key={i}
          type="text"
          value={habit}
          onChange={(e) => updateHabit(i, e.target.value)}
          placeholder={`Habit ${i + 1}`}
          aria-label={`Habit ${i + 1}`}
        />
      ))}
    </div>
  );
}
```

---

## 3. Screen / view transitions

### Option A: Conditional rendering (single page, no URL change)

```tsx
"use client";

import { useState } from "react";

export default function AppShell() {
  const [hasCompletedIntro, setHasCompletedIntro] = useState(false);

  if (!hasCompletedIntro) {
    return (
      <IntroScreen onComplete={() => setHasCompletedIntro(true)} />
    );
  }

  return <MainExperience />;
}
```

- Store “intro completed” in state (or later in localStorage/API). Toggle to show Intro vs main view.

### Option B: Next.js routing (different URLs)

```tsx
"use client";

import { useRouter } from "next/navigation";

export default function IntroScreen() {
  const router = useRouter();

  function goToDashboard() {
    router.push("/dashboard");
  }

  return (
    <div>
      {/* ... form ... */}
      <button type="button" onClick={goToDashboard}>
        Continue
      </button>
    </div>
  );
}
```

- For declarative links: `<Link href="/dashboard">Go to dashboard</Link>` (from `next/link`).

---

## 4. Submitting intro data (form + handler)

Pattern: form with `onSubmit`, `preventDefault`, then read state and pass to a handler (or log). No API/DB here.

```tsx
"use client";

import { useState } from "react";

type IntroData = {
  name: string;
  goals: string;
  habits: string[];
};

export default function IntroForm() {
  const [name, setName] = useState("");
  const [goals, setGoals] = useState("");
  const [habits, setHabits] = useState<string[]>(() => Array(5).fill(""));

  function updateHabit(index: number, value: string) {
    setHabits((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const data: IntroData = { name, goals, habits };
    console.log(data); // Replace with: onComplete(data), router.push(...), etc.

    // e.g. transition to main screen or another route
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <label>
        Main goals
        <textarea
          value={goals}
          onChange={(e) => setGoals(e.target.value)}
          required
        />
      </label>
      {habits.map((habit, i) => (
        <label key={i}>
          Habit {i + 1}
          <input
            type="text"
            value={habit}
            onChange={(e) => updateHabit(i, e.target.value)}
          />
        </label>
      ))}
      <button type="submit">Continue</button>
    </form>
  );
}
```

- Use `e.preventDefault()` so the page doesn’t reload.
- Read from your state (name, goals, habits) inside `handleSubmit`, then call your “intro complete” logic (e.g. set parent state, navigate, or later send to an API).
