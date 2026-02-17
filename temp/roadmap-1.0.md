# Journey App – Roadmap to 1.0 (multi-user, public)

Milestones to get from the current intro flow to a fully working 1.0 for public use with multi-user sessions.

---

## Milestones

### M1 – Intro flow + data in the app (current plan)

- North Star, Weekly Goal, 5 actions collected and saved in React state.
- Done screen / “Start” CTA.
- Single user, in-memory only.

**Done when:** You can complete the journey and see the data in state (e.g. log it or show on done screen).

---

### M2 – Single-user persistence

- Save/load JourneyData (and later User) so it survives refresh.
- Options: **localStorage** (simplest, one “profile” per device) or a **simple backend** (one user table, no auth).

**Done when:** Refresh the page and the same journey data is still there (or loaded from backend).

---

### M3 – User identity in the data model

- Add **name** (and optionally **email** for later) to the data you store.
- If still local: one “user” object in localStorage. If backend: User row with `id`, `name`, `email?`, `journeyData`, `meta`.

**Done when:** Stored data has a clear “user” shape (name + journeyData + room for more).

---

### M4 – Backend + database

- API (e.g. Next.js API routes or small separate service) that talks to a real DB (Postgres, SQLite, Supabase, etc.).
- Implement the User schema (id, name, email nullable, journeyData, meta).
- CRUD: create user, get user, update user (e.g. update journeyData).

**Done when:** App can create/read/update a user in the DB via the API (no auth yet).

---

### M5 – Auth + sessions (multi-user in practice)

- Sign up + login (email/password or OAuth).
- Session: cookie or JWT so the server knows “who is this request?”
- Every request that touches data is scoped to the current user’s id.

**Done when:** Two different people can sign up, log in, and each see only their own journey data.

---

### M6 – “Intro vs main app” flow

- If the user has no journeyData (or intro not completed), show intro flow.
- If they’ve completed intro (data exists), show main experience (e.g. fire screen).
- Optional: “Redo journey” or “Edit goals” from settings.

**Done when:** Returning users go straight to the main experience; new users go through the intro.

---

### M7 – Fire mechanic (minimal 1.0)

- Implement the core loop that **uses** JourneyData (North Star, weekly goal, 5 actions).
- Can be minimal: e.g. “tend the fire” with simple state (fuel, time, or progress) driven by that data.

**Done when:** The app feels like a complete loop: set goals → tend fire (or equivalent) using those goals.

---

### M8 – Polish for release

- Errors: network failures, validation errors, “session expired” handled with simple messages.
- Loading states for API calls.
- Basic a11y (labels, focus, keyboard).
- Optional: rate limits, basic security headers, input sanitization.

**Done when:** A stranger can use the app without hitting broken or confusing states.

---

### M9 – Deploy + public

- Host app (e.g. Vercel, Railway) and DB (e.g. managed Postgres, Supabase).
- Env vars for DB URL, secrets, auth keys.
- “Public use”: anyone can open the URL, sign up, and use the app.

**Done when:** 1.0 is live and usable by real users.

---

## Order and dependencies

```
M1 (intro + data) → M2 (persist) → M3 (user shape) → M4 (backend + DB)
                                                           ↓
M9 (deploy) ← M8 (polish) ← M7 (fire) ← M6 (intro vs main) ← M5 (auth + sessions)
```

- **M1–M4** get you from “it works on my machine” to “data lives in a real DB and has a user shape.”
- **M5** is when it becomes truly **multi-user** (sessions + per-user data).
- **M6–M7** make it a full product (correct routing + core mechanic).
- **M8–M9** make it safe and public.

---

## Rough timeline (ballpark)

| Milestone | Estimate |
| --------- | -------- |
| M1 | 2–5 hours |
| M2 | ~half day (localStorage) or ~1 day (simple backend) |
| M3 | ~half day |
| M4 | 1–2 days |
| M5 | 1–2 days |
| M6 | ~half day |
| M7 | 2–5 days |
| M8 | 1–2 days |
| M9 | ~half day to 1 day |

**Total:** about 2–4 weeks of focused work to a shippable 1.0 with multi-user sessions (faster if you use something like NextAuth or Supabase Auth for M5).

---

*Other docs in temp: TO DO LOG.md, journey-data-and-flow.md (when created by the intro + data plan).*
