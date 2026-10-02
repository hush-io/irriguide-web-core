"use client";

import Link from "next/link";
import { type ComponentProps, useState } from "react";

// Prefetches the full route, including its server-side data fetches, once the user shows intent
// (hover, focus or touch) instead of whenever the link scrolls into the viewport.
// Prefetching only runs in production builds.
export default function HoverPrefetchLink({
  onMouseEnter,
  onFocus,
  onTouchStart,
  ...props
}: Omit<ComponentProps<typeof Link>, "prefetch">) {
  const [active, setActive] = useState(false);

  return (
    <Link
      {...props}
      prefetch={active}
      onMouseEnter={(event) => {
        setActive(true);
        onMouseEnter?.(event);
      }}
      onFocus={(event) => {
        setActive(true);
        onFocus?.(event);
      }}
      onTouchStart={(event) => {
        setActive(true);
        onTouchStart?.(event);
      }}
    />
  );
}
