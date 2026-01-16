# ⚙️ chrono-state-z

[![NPM](https://img.shields.io/npm/v/chrono-state-z.svg)](https://www.npmjs.com/package/chrono-state-z)  
![Downloads](https://img.shields.io/npm/dt/chrono-state-z.svg)  

<a href="https://codesandbox.io/p/sandbox/xt6npl" target="_blank">LIVE EXAMPLE</a>

---

**chrono-state-z** is a **reactive, intent-first runtime**
with **atoms, computed, async effects, FSM, form engine, and devtools timeline.**

> **Logic lives outside React.** React only renders state and emits intents.

---

## ✨ Why / When to Use

- Zero hooks in UI components
- Complex async flows (login → fetch → redirect)
- Predictable & testable side effects
- Headless testing without rendering
- Architecture-driven reactive design
- Devtools timeline for replay & debugging

---

## 📦 Installation

```bash
npm install chrono-state-z
```

## 🧠 Mental Model

- Atoms: reactive state units
- Computed: derived values
- Effects: middleware-style interceptors
- FSM / Form: orchestrate async flows & validations
- Timeline: devtools recording & replay
- React: purely renders state + emits intents

## Examples

#### 1️⃣ Core Atom + Computed + Scheduler
```ts
import { atom, computed } from 'chrono-state-z'

const count = atom(0)
const double = computed(() => count() * 2)

count.set(5)
console.log(count())   // 5
console.log(double())  // 10

count.set(10)
console.log(count())   // 10
console.log(double())  // 20
```

#### 2️⃣ Async Atom + Async Computed
```ts
import { asyncAtom, asyncComputed, atom } from 'chrono-state-z'

const value = asyncAtom(async () => {
  await new Promise(r => setTimeout(r, 100))
  return 42
})

value.load().then(v => console.log('AsyncAtom loaded:', v)) // 42

const count = atom(2)
const doubleAsync = asyncComputed(async () => {
  await new Promise(r => setTimeout(r, 50))
  return count() * 2
})

doubleAsync().then(v => console.log('AsyncComputed:', v)) // 4
```

#### 3️⃣ Batch / Transaction
```ts
import { atom, batch } from 'chrono-state-z'

const a = atom(1)
const b = atom(2)

batch(() => {
  a.set(10)
  b.set(20)
})

console.log(a(), b()) // 10, 20
```

#### 4️⃣ FSM Example
```ts
import { createFSM } from 'chrono-state-z'

const loginFSM = createFSM({
  initial: { status: 'idle' },
  states: {
    idle: { on: { SUBMIT: ({ state }) => ({ status: 'loading' }) } },
    loading: { on: { SUCCESS: () => ({ status: 'success' }), FAIL: () => ({ status: 'error' }) } },
    success: {},
    error: {},
  },
})

await loginFSM.dispatch('SUBMIT')
console.log(loginFSM.state().status) // 'loading'

await loginFSM.dispatch('SUCCESS')
console.log(loginFSM.state().status) // 'success'

```

#### 5️⃣ Form Engine + Validation
```ts
import { useForm } from 'chrono-state-z'

const loginForm = useForm({
  username: { initial: '', validate: val => val ? null : 'Required' },
  password: { initial: '', validate: val => val ? null : 'Required' },
})

loginForm.fields.username.value.set('admin')

if (loginForm.isValid()) {
  console.log(loginForm.values())
} else {
  console.log('Validation errors exist')
}

```

#### 6️⃣ React Integration (Headless View)
```ts
import React from 'react'
import { atom, useAtom } from 'chrono-state-z'

const count = atom(0)

function CounterView({ countAtom }: { countAtom: typeof count }) {
  const value = useAtom(countAtom)

  return (
    <div>
      <div>Count: {value}</div>
      <button onClick={() => countAtom.set(countAtom() + 1)}>+</button>
    </div>
  )
}

export function App() {
  return <CounterView countAtom={count} />
}

```

#### 7️⃣ Devtools Timeline & Replay
```ts
import { trackNode, schedule } from 'chrono-state-z'

const node = trackNode('count')

schedule(() => {
  console.log('Replay atom change:', node.value)
}, 'normal')

```

#### 8️⃣ Effect Subscription
```ts
import { effect } from 'chrono-state-z'

const count = atom(0)

const unsubscribe = effect(() => {
  console.log('Effect triggered:', count())
})

count.set(1) // logs "Effect triggered: 1"

// cleanup
unsubscribe()

```

---

## 🔍 Comparison / Features
| Feature              | chrono-state-z | Redux | Zustand |
| -------------------- | -------------- | ----- | ------- |
| Atoms / Computed     | ✅              | ⚠️    | ⚠️      |
| Async Effects        | ✅              | ⚠️    | ⚠️      |
| FSM / Form Engine    | ✅              | ❌     | ❌     |
| Scheduler / Priority | ✅              | ❌     | ❌     |
| Headless Testing     | ✅              | ⚠️    | ⚠️      |
| Devtools Timeline    | ✅              | ⚠️    | ❌      |

---

## 🚫 Anti-patterns

- Don’t mutate atoms outside runtime
- Don’t put business logic inside React
- Always emit intent or use effects for orchestration
- Don’t bypass scheduler / computed dependencies

---

## 🧠 Philosophy

- Logic lives outside React
- Devtools timeline ensures determinism
- Scheduler + priority enables safe async updates

## 📜 License

MIT / Delpi