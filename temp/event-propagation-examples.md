# Event propagation – simple use cases

Events **bubble**: they fire on the element you clicked, then on its parent, then the next parent, up to the root.

---

## 1. Button inside a clickable card (stop the card from reacting)

```jsx
function Card() {
  const handleCardClick = () => alert("Card clicked");
  const handleButtonClick = (e) => {
    e.stopPropagation(); // Don’t tell the card about this click
    alert("Button clicked");
  };

  return (
    <div onClick={handleCardClick} style={{ padding: 20, border: "1px solid" }}>
      <p>Click anywhere on the card</p>
      <button onClick={handleButtonClick}>Only me</button>
    </div>
  );
}
```

- Click the **card** → "Card clicked"
- Click the **button** → "Button clicked" only (card’s handler doesn’t run because of `stopPropagation`)

---

## 2. Modal overlay (click overlay to close, but not when clicking the modal content)

```jsx
function Modal({ onClose, children }) {
  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}
```

- Click **overlay** → `onClose()` runs (modal closes)
- Click **inside the modal** → event doesn’t bubble to overlay, so modal stays open

---

## 3. Your Journey input (same idea)

```jsx
<main onClick={handleActivate}>   {/* Click anywhere → next step */}
  ...
  <div className="journey-input-layer" onClick={(e) => e.stopPropagation()}>
    <textarea ... />   {/* Clicking/typing here should NOT advance the step */}
  </div>
</main>
```

Without `stopPropagation`: clicking the input would also trigger `handleActivate` and advance the step.  
With it: only the input receives the click; the main’s handler doesn’t run.

---

## Quick reference

| Method                 | Effect |
|------------------------|--------|
| `e.stopPropagation()`  | This element handles the event; parents do not see it. |
| (do nothing)          | Event bubbles; every ancestor with a handler runs it. |

Use `stopPropagation()` when the **child** should handle the event and the **parent** should not react to the same click/key event.
