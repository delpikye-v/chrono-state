import type { Scope } from "intentx-core-z";
import { Store } from "./store";
export declare function createStore<S extends object>(initial: S, scope?: Scope): Store<S>;
