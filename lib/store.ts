// lib/store.ts
"use client";

import { read, write, defaults, type DashboardState } from "./storage";

type Listener = () => void;

const listeners = new Set<Listener>();

// Snapshot the SSR render and the first client render see.
// Must be identical server/client so hydration matches. `read()` is
// client-only, so we return defaults() here and hydrate after mount.
let serverSnapshot: DashboardState = defaults();

// Cache so getSnapshot() returns a stable reference between writes —
// required by useSyncExternalStore to avoid infinite loops.
let cache: DashboardState | null = null;

function getSnapshot(): DashboardState {
  if (cache === null) cache = read();
  return cache;
}

function getServerSnapshot(): DashboardState {
  return serverSnapshot;
}

function subscribe(listener: Listener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function setState(next: DashboardState) {
  cache = next;
  serverSnapshot = next;
  write(next);
  for (const l of listeners) l();
}

function patchState(updater: (current: DashboardState) => DashboardState) {
  setState(updater(getSnapshot()));
}

export const dashboardStore = {
  subscribe,
  getSnapshot,
  getServerSnapshot,
  setState,
  patchState,
};