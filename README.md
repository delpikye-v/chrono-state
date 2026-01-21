# ⚙️ chrono-state-z

[![NPM](https://img.shields.io/npm/v/chrono-state-z.svg)](https://www.npmjs.com/package/chrono-state-z) ![Downloads](https://img.shields.io/npm/dt/chrono-state-z.svg)  

<a href="https://codesandbox.io/p/sandbox/8mnycx" target="_blank">LIVE EXAMPLE</a>

---

**chrono-state-z** is a **reactive, intent-first state runtime**  
designed to keep **business logic outside React**.

It provides **atoms, computed values, async state, effects, scheduling**,  
with a **headless core** and **thin React bindings**.

> **React renders state. Logic lives elsewhere.**

---

## ✨ Why chrono-state-z?

Use chrono-state-z when you need:

- Predictable state & side-effects
- Complex async flows (fetch → invalidate → retry)
- Logic reusable outside React (tests, workers, backend)
- Fine-grained reactivity (no global rerenders)
- Clear separation between **logic** and **view**

---

## 🧠 Mental Model

- Atom — small reactive state unit
- Computed — derived value, cached and reactive
- AsyncAtom — async state with suspense-style read
- Effect — reactive side-effect runner
- Scheduler — priority-based execution control
- Store / Intent — intent-driven state orchestration
- React hooks — thin bindings over the headless core

---

## 📦 Installation

```bash
npm install chrono-state-z
```

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
  const value = useComputed(() => total())
  return <div>Total: {value}</div>
}
```

---

### useAtomSelector

```tsx
import { atom, useAtomSelector } from 'chrono-state-z'

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

function StoreView({ store }) {
  const state = useStore(store)
  return <pre>{JSON.stringify(state)}</pre>
}
```

---

### useStoreSelector

```tsx
import { useStoreSelector } from 'chrono-state-z'

function SavingBadge({ store }) {
  const saving = useStoreSelector(store, s => s.saving)
  return saving ? 'Saving...' : 'Idle'
}
```

---

### useWatch

```ts
import { useWatch } from 'chrono-state-z'

useWatch(
  () => user(),
  (u) => {
    if (u?.role === 'admin') redirect('/admin')
  }
)
```

---

## 🧩 Architecture Example

```ts
import { asyncAtom, computed } from 'chrono-state-z'

export function createUserLogic() {
  const user = asyncAtom(fetchUser)
  const username = computed(() => user()?.name ?? 'Guest')

  return {
    user,
    username,
    reload: () => user.invalidate()
  }
}
```

```tsx
function UserView({ logic }) {
  const user = useAtom(logic.user)
  const name = useComputed(() => logic.username())

  return (
    <div>
      <h3>Hello {name}</h3>
      <button onClick={logic.reload}>Reload</button>
    </div>
  )
}
```

---

## 📊 Comparison with Other Libraries

| Feature                   | chrono-state-z  | Redux | Zustand  | Jotai  |
|---------------------------|---------------- |-------|--------- |------- |
| Fine-grained reactivity   | ✅              | ❌     | ⚠️       | ✅     |
| Async primitives          | ✅              | ⚠️     | ❌       | ⚠️     |
| Intent / effect layer     | ✅              | ⚠️     | ❌       | ❌     |
| Scheduler / priority      | ✅              | ❌     | ❌       | ❌     |
| Headless (non-React) core | ✅              | ❌     | ⚠️       | ❌     |
| Testability               | ✅              | ⚠️     | ⚠️       | ❌     |

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

MIT / Delpi