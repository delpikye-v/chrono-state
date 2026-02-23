# ⏱️ chrono-state-z

[![NPM](https://img.shields.io/npm/v/chrono-state-z.svg)](https://www.npmjs.com/package/chrono-state-z) ![Downloads](https://img.shields.io/npm/dt/chrono-state-z.svg)  

<a href="https://codesandbox.io/p/sandbox/8mnycx" target="_blank">LIVE EXAMPLE</a>

---

**chrono-state-z** is a reactive state runtime that keeps business logic outside React.   
It provides **atoms, computed values, async state, effects, scheduling**, with a **headless core** and **thin React bindings**.   

> **React renders. Logic lives elsewhere.**

---

## ✨ Why chrono-state-z?

- Predictable state & side-effects
- Complex async flows (fetch → invalidate → retry)
- Logic reusable outside React (tests, workers, backend)
- Fine-grained reactivity (no global rerenders)
- Clear separation between **logic** and **view**

---

## 🧠 Mental Model

- **Atom** → small reactive state unit  
- **Computed** → derived, cached reactive value  
- **AsyncAtom** → async resource with invalidate + priority  
- **Effect** → reactive side-effect runner  
- **Transaction** → batch updates  
- **Store / Intent** → event-driven orchestration  
- **React hooks** → thin bindings over the headless core  

---

## 📦 Installation

```bash
npm install chrono-state-z
# If using React:
npm install react
```

---

## ⚡ Quick Start

```ts
import { atom, computed, asyncAtom } from "chrono-state-z";

const count = atom(0);
const double = computed(() => count() * 2);

const user = asyncAtom(async () =>
  fetch("https://jsonplaceholder.typicode.com/todos/1")
    .then(r => r.json())
);
```

```ts
import { useAtom, useComputed } from "chrono-state-z";

function App() {
  const value = useAtom(count);
  const doubled = useComputed(double);
  const username = useComputed(() => user()?.title);

  return (
    <button onClick={() => count.set(c => c + 1)}>
      {value}
    </button>
  );
}

```

✨ Fine-grained updates.  
✨ Suspense-ready async.  
✨ No reducers. No boilerplate.   

---

## 🔹 Core Usage

### Atom & Computed

```ts
import { atom, computed } from 'chrono-state-z'

const count = atom(0)
const double = computed(() => count() * 2)

count.set(5)

console.log(count())   // 5
console.log(double())  // 10
```

---

### Reactive Effects

```ts
import { atom, effect } from 'chrono-state-z'

const count = atom(0)

const dispose = effect(() => {
  console.log('Count changed:', count())
})

count.set(1) // logs: Count changed: 1

dispose()
```

---

## 🔹 Async State

### AsyncAtom

```ts
import { asyncAtom } from 'chrono-state-z'

const user = asyncAtom(async () => {
  const res = await fetch('/api/user')
  return res.json()
})

await user.load()

const u = user()
```

Invalidate & refetch:

```ts
user.invalidate()
user.invalidate('low')
```

---

### AsyncComputed

```ts
import { asyncComputed, atom } from 'chrono-state-z'

const count = atom(2)

const doubleAsync = asyncComputed(async () => {
  await new Promise(r => setTimeout(r, 50))
  return count() * 2
})

await doubleAsync()
```

---

## 🔹 Transactions (Batch updates)

```ts
import { atom, transaction } from 'chrono-state-z'

const a = atom(1)
const b = atom(2)

transaction(() => {
  a.set(10)
  b.set(20)
})

console.log(a(), b())
```

---

## 🔹 Store & Intent (Logic Layer)

```ts
import { createStore } from 'chrono-state-z'

type State = {
  saving: boolean
  value: string
}

const logic = createStore<State>({
  saving: false,
  value: ''
})

logic.on('SAVE', async ({ state, setState }) => {
  setState(s => { s.saving = true })

  await fakeApiSave(state().value)

  setState(s => { s.saving = false })
})
```

Emit intent:

```ts
await logic.emit('SAVE')
```

---

## 🔹 React Integration

### useAtom

```tsx
import { atom, useAtom } from 'chrono-state-z'

const count = atom(0)

function Counter() {
  const value = useAtom(count)

  return (
    <button onClick={() => count.set(value + 1)}>
      Count: {value}
    </button>
  )
}
```

---

### useComputed

```tsx
import { computed, useComputed } from 'chrono-state-z'

const total = computed(() => price() * qty())

function TotalView() {
  const value = useComputed(total)
  return <div>Total: {value}</div>
}
```

---

### useAtomSelector

```tsx
// atom() returns a callable reactive value
const user = atom({ id: 1, name: 'Alice', age: 20 })

function Username() {
  const name = useAtomSelector(user, u => u.name)
  return <span>{name}</span>
}
```

---

### useStore

```tsx
import { useStore } from 'chrono-state-z'
import type { Store } from 'chrono-state-z'

function StoreView({ store }: { store: Store<any> }) {
  const state = useStore(store)
  return <pre>{JSON.stringify(state, null, 2)}</pre>
}

```

---

### useStoreSelector

```tsx
// Only re-renders when saving changes, not the whole store.
import { useStoreSelector } from "chrono-state-z"

function SavingBadge({ store }) {
  const saving = useStoreSelector(store, s => s.saving)
  return saving ? "Saving..." : "Idle"
}

```
- `selector` should be pure and stable.
- If you need dynamic selection, memoize the selector.

---

### useWatch

```ts
import { useWatch } from 'chrono-state-z'

const user = atom<{ role?: string } | null>(null)

function AuthGuard() {
  useWatch(
    () => user(),
    (u) => {
      if (u?.role === 'admin') {
        redirect('/admin')
      }
    }
  )

  return null
}

```

### AsyncAtom
```ts
const user = asyncAtom(fetchUser)

// load explicitly
await user.load()

// read value (throws / suspends if not ready)
const u = user()
```

---

## 🧩 Architecture Pattern

```ts
import { asyncAtom, computed } from 'chrono-state-z'

export function createUserLogic() {
  const user = asyncAtom(fetchUser)
  const name = computed(() => user()?.name ?? 'Guest')

  return {
    user,
    name,
    reload: () => user.invalidate()
  }
}
```

```tsx
function UserView({ logic }) {
  const user = useAtom(logic.user)
  const name = useComputed(logic.name)

  return (
    <>
      <div>Hello {name}</div>
      <button onClick={logic.reload}>Reload</button>
    </>
  )
}

```

---

## 🔍 Comparison

<b>This is not about “better” — it's about architectural.</b>

| Feature                     | chrono-state-z | Redux Toolkit | Zustand  | Jotai | MobX |
| --------------------------- | -------------- | ------------- | -------- | ----- | ---- |
| Fine-grained reactivity     | ✅              | ❌            | ⚠️       | ✅     | ✅   |
| Built-in async primitives   | ✅              | ⚠️            | ❌       | ⚠️     | ❌   |
| Scheduler / priority system | ✅              | ❌            | ❌       | ❌     | ❌   |
| Headless (non-React) core   | ✅              | ✅            | ⚠️       | ⚠️     | ✅   |
| Boilerplate level           | ✅              | ❌            | ✅       | ✅     | ⚠️   |
| Devtools maturity           | ⚠️              | ✅            | ✅       | ⚠️     | ✅   |
| Learning curve              | ⚠️              | ⚠️            | ✅       | ✅     | ⚠️   |


<br />

<b>📝 Notes</b>

⚠️ Fine-grained in Zustand: achieved via selectors, but not dependency-tracked graph-level.

⚠️ Async in Redux / Jotai / Recoil: supported via patterns (thunks, query libs, async selectors), not core-first primitives.

⚠️ Headless in Zustand/Jotai: possible, but primarily designed for React usage.

⚠️ Devtools: Redux and MobX have mature ecosystems; newer libs are still evolving.

---

## ⚖️ Strengths Compared to Others

<b>vs Redux Toolkit</b>

- More fine-grained updates
- Less reducer boilerplate
- Built-in reactive primitives
- Redux has stronger ecosystem & devtools

<b>vs Zustand</b>

- More structured async handling
- Explicit intent layer
- Built-in scheduler support
- Zustand is simpler & lighter for small apps

<b>vs Jotai</b>

- More explicit effect + scheduler control
- Async-first primitives
- Jotai is more minimal and React-native

<b>vs MobX</b>

- More explicit dependency graph (no proxy magic)
- Better control over update priority
- MobX is more ergonomic for mutable patterns

<b>vs Recoil</b>

- Headless core (not React-bound)
- Explicit effect system
- Recoil has better React DevTools integration

<b>vs Solid signals</b>

- Similar fine-grained reactive model
- Designed for React ecosystem
- Solid is framework-native and extremely optimized

---

## 🚫 Anti-patterns

- Putting business logic inside React components
- Mutating atom values directly
- Coupling domain logic to UI events
- Skipping computed / effects for orchestration

---

## 🧠 Philosophy

- Logic lives outside React
- Deterministic, testable state
- Effects are explicit and traceable
- UI is a pure projection of state

---

## 📜 License

MIT