# How the code works: title in, then disappear on click

---

## 1. Imports and state

You need `useState` from React and `"use client"` if this is Next.js (because you're using state).

```tsx
"use client";

import { useState } from "react";
// ... your other imports

export default function Main() {
  const [showTitle, setShowTitle] = useState(true);
  // ...
}
```

- `showTitle` starts as `true` → title is shown first.
- `setShowTitle(false)` is what you call on click to hide the title.

---

## 2. Click handler

A function that sets the state to false. Put it inside the component.

```tsx
const handleScreenClick = () => {
  setShowTitle(false);
};
```

---

## 3. JSX: wrap screen and use state

- Wrap the main screen area in a div and give it `onClick={handleScreenClick}` so any click runs the handler.
- Use `showTitle` to decide what to render: when true, show the title block; when false, show nothing (or your next screen).

**Only title (disappears to empty):**

```tsx
<div onClick={handleScreenClick} className="screen-content">
  {showTitle && (
    <>
      <h1 className={`journey-title ${pressStart2P.className}`}>Journey</h1>
      <p className={`journey-subtitle ${pressStart2P.className} text-white/60`}>Time to rise</p>
    </>
  )}
</div>
```

**Title or next screen (e.g. form):**

```tsx
<div onClick={handleScreenClick} className="screen-content">
  {showTitle ? (
    <>
      <h1 className={`journey-title ${pressStart2P.className}`}>Journey</h1>
      <p className={`journey-subtitle ${pressStart2P.className} text-white/60`}>Time to rise</p>
    </>
  ) : (
    <div>Next screen here</div>
  )}
</div>
```

---

## 4. How it runs

1. First render: `showTitle` is `true` → the title fragment is rendered inside the div.
2. User clicks anywhere on the div → `handleScreenClick` runs → `setShowTitle(false)`.
3. React re-renders: `showTitle` is now `false` → the condition fails → the title is not rendered, so it disappears (and the “else” part shows if you have one).

Entrance animation is handled by CSS on the title elements (e.g. `animation: fadeInTop ...`); no extra state needed for that.
