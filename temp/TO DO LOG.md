# Journey App – Foundation Checklist

Single place for the intro screen spec, things to keep track of, and next steps. No implementation in the main codebase until you’re ready to build.

---

## Intro screen requirements

### User inputs

1. **Name** – Single text input (e.g. “What should we call you?”).
2. **Main goals** – User’s primary goals (e.g. one text area or a few short inputs; specify “a few” or a number when you design the UI).
3. **5 daily habits** – Exactly 5 inputs (text or short labels) for habits the user wants to track daily.

### Flow

- **When** – First screen on first visit (or when “intro not completed”).
- **After submit** – Transition to the main experience (dashboard / main app view). No need to implement persistence yet; the foundation is “we have intro data and we leave the intro screen.”

---

## Things to keep track of for the app

- **Where intro data lives after submit** – In-memory state only for now, or plan for later: localStorage, API, or DB so it survives refresh and devices.
- **How “intro completed” is decided** – State flag (e.g. `hasCompletedIntro`) vs route (e.g. only show intro at `/` and main app at `/app`) vs stored preference.
- **Validation** – Required fields (name, goals, maybe all 5 habits or a minimum). Show errors inline or on submit.
- **Accessibility** – Labels for every input (`<label>`, `aria-label`, or `aria-labelledby`), focus order, and at least one clear submit button.
- **Screen transfer** – Conditional render (intro vs main in one page) or separate routes with navigation after submit.
- **Styling** – Reuse existing Journey styles (e.g. from `page.css` / Tailwind) so the intro screen fits the rest of the app.

---

## Next steps (when you start building)

1. Add an intro form component (name, main goals, 5 daily habits) and wire it to local state.
2. Add a way to know “intro completed” (e.g. parent state or a flag you’ll later replace with persistence).
3. Implement the screen transfer: show intro first, then main UI (or navigate to main route) after submit.
4. Add basic validation and error handling.
5. Add or connect the main UI that will use name, goals, and habits.

Use `temp/react-next-fundamentals.md` for concepts and `temp/interactivity-examples.md` for copy-paste patterns.




1.  We need to make persistent data models for the user

Schema will probably look like
2/13/2026
Player:
Username
Email
Main Goal
Daily Actions

2/14/2026
image-rendering: pixelated - command for making sure UI doesn't come out blocky test this out later
Finish up text logs and polish up animations for title screen
Set up "database"