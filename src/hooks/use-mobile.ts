import * as React from "react"

const MOBILE_BREAKPOINT = 768
const QUERY = `(max-width: ${MOBILE_BREAKPOINT - 1}px)`

const subscribe = (onChange: () => void) => {
  const mql = window.matchMedia(QUERY)
  mql.addEventListener("change", onChange)
  return () => mql.removeEventListener("change", onChange)
}

const getSnapshot = () => window.matchMedia(QUERY).matches

/**
 * Adapted from the shadcn/ui `use-mobile` hook (MIT).
 *
 * The upstream version copies the media query result into state from an
 * effect. `useSyncExternalStore` subscribes to the query directly instead, so
 * the value is correct on the very first client render and no extra render is
 * scheduled on mount. The server snapshot is `false`, which matches the
 * desktop-first markup Next.js prerenders.
 */
export function useIsMobile() {
  return React.useSyncExternalStore(subscribe, getSnapshot, () => false)
}
