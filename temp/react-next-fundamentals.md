# React + Next.js Fundamentals Reference

Quick reference and links for state management, hooks, TypeScript, App Router, and form handling. Use this when building the Journey app.

---

## State management

- **`useState`** – Primary way to hold UI state in a component. Returns `[value, setValue]`. Updates trigger re-renders.
- **Lifting state** – When two+ components need the same state, put it in their closest common parent and pass it down (or pass a setter). [React: Lifting State Up](https://react.dev/learn/sharing-state-between-components)
- **`useReducer`** – For complex state (many related fields) or when the next state depends on the previous. Reduces prop-drilling of multiple setters.
- **Context** – Use when many components need to read the same data (e.g. theme, user). Avoid putting frequently changing state in context; prefer composition or state in a parent.
- **External store** – For app-wide or cross-route state (e.g. Zustand, Jotai) you can add later; start with `useState` and lift as needed.

**References**

- [React: Managing State](https://react.dev/learn/managing-state)
- [React: Choosing the State Structure](https://react.dev/learn/choosing-the-state-structure)

---

## Hooks

| Hook | Purpose |
|------|---------|
| **`useState`** | Local component state. |
| **`useEffect`** | Side effects after render (fetch, subscriptions, sync with external systems). Dependencies array controls when it runs. |
| **`useRef`** | Mutable ref object that doesn’t trigger re-renders. Use for DOM refs, timers, or keeping a previous value. |
| **`useCallback`** | Memoize a function so it’s stable across renders (useful when passing callbacks to memoized children). |
| **`useMemo`** | Memoize a computed value to avoid recalculating every render. |

**Next.js App Router and client components**

- By default, components in the App Router are **React Server Components** (no hooks, no browser APIs, no `onClick`).
- For interactivity (clicks, state, `useEffect`, etc.), add **`"use client"`** at the top of the file. That makes the component (and its imports) a Client Component.

**References**

- [React: Hooks Reference](https://react.dev/reference/react)
- [Next.js: Client and Server Components](https://nextjs.org/docs/app/building-your-application/rendering/client-components)

---

## TypeScript in React

- **Props** – Prefer an inline type or interface for the props object, e.g. `type Props = { name: string; onSubmit: () => void };` then `function MyComponent({ name, onSubmit }: Props)`.
- **`React.FC`** – Optional; many codebases skip it and type the function’s argument (and return type if needed) directly.
- **Event types** – Use React’s types: `React.ChangeEvent<HTMLInputElement>`, `React.MouseEvent<HTMLButtonElement>`, `React.FormEvent<HTMLFormElement>`.
- **State** – Type the generic: `useState<string>('')`, `useState<number | null>(null)`.
- **Refs** – DOM refs: `useRef<HTMLInputElement>(null)`. Mutable refs: `useRef<SomeType>(initial)`.

**References**

- [TypeScript: React and Web](https://www.typescriptlang.org/docs/handbook/react.html)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)

---

## Next.js App Router basics

- **Structure** – `app/` holds routes. `app/page.tsx` is `/`, `app/dashboard/page.tsx` is `/dashboard`. `layout.tsx` wraps segments and is shared.
- **Client vs server** – Server Components by default; use `"use client"` only where you need hooks or browser APIs.
- **Navigation** – Use `<Link href="/path">` for declarative navigation, or `useRouter()` from `next/navigation` for programmatic (e.g. after form submit): `router.push('/dashboard')`.
- **Screen transfers** – Either (1) conditional rendering in one page (e.g. intro vs main view) or (2) separate routes and navigate with `Link`/`router.push()`.

**References**

- [Next.js: App Router](https://nextjs.org/docs/app/building-your-application/routing)
- [Next.js: Linking and Navigating](https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating)
- [Next.js: useRouter (next/navigation)](https://nextjs.org/docs/app/api-reference/functions/use-router)

---

## Form handling

- **Controlled inputs** – Value comes from state; `onChange` updates state. Single source of truth: `value={name} onChange={(e) => setName(e.target.value)}`.
- **`onSubmit`** – Attach to `<form>`. Call `e.preventDefault()` so the page doesn’t reload. Read state (or form data) and run your submit logic.
- **Validation** – Check required fields and format in the submit handler (or on blur). Optionally show error state in component state.
- **Multiple inputs** – One `useState` per field, or one state object, or an array of items (e.g. for a list of 5 habits).

**References**

- [React: Responding to Events](https://react.dev/learn/responding-to-events)
- [React: Form components (e.g. input)](https://react.dev/reference/react-dom/components/input)
