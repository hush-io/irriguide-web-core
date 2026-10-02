import { useSyncExternalStore } from "react";

function subscribe(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

// Whether the page is scrolled away from the top. Reads the current position on mount,
// so it's also true when the page is loaded or restored somewhere other than the top.
export function useIsScrolled() {
  return useSyncExternalStore(
    subscribe,
    () => window.scrollY > 0,
    () => false,
  );
}
