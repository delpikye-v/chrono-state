import type { Scope } from "intentx-core-z";
import { Store } from "./types";
export declare function createStore<S extends object>(initial: S, scope?: Scope): Store<S>;
