// types/global.d.ts
declare global {
  interface Window {
    fbq: (...args: unknown[]) => void
  }
}