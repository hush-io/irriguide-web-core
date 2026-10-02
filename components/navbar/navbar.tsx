"use client";

import { MenuIcon } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import HoverPrefetchLink from "@/components/common/hover-prefetch-link";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useIsScrolled } from "@/hooks/use-is-scrolled";
import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "./constants";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

function Logo() {
  return (
    <HoverPrefetchLink
      href="/"
      className="flex items-center gap-2 rounded-md font-bold font-heading text-lg outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
    >
      <Image
        src="/assets/logo.png"
        alt=""
        width={32}
        height={32}
        preload
        className="size-8 rounded-lg"
      />
      Irriguide
    </HoverPrefetchLink>
  );
}

function NavLinks({
  className,
  onNavigate,
}: {
  className?: string;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  return (
    <ul className={className}>
      {NAV_ITEMS.map(({ title, href }) => {
        const active = isActive(pathname, href);

        return (
          <li key={href}>
            <HoverPrefetchLink
              href={href}
              aria-current={active ? "page" : undefined}
              onClick={onNavigate}
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "w-full justify-start",
                active && "bg-muted text-foreground",
              )}
            >
              {title}
            </HoverPrefetchLink>
          </li>
        );
      })}
    </ul>
  );
}

function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button variant="ghost" size="icon" className="md:hidden">
            <MenuIcon />
            <span className="sr-only">Open menu</span>
          </Button>
        }
      />
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <nav aria-label="Main">
          <NavLinks
            className="flex flex-col gap-1 px-2"
            onNavigate={() => setOpen(false)}
          />
        </nav>
      </SheetContent>
    </Sheet>
  );
}

export default function Navbar() {
  const scrolled = useIsScrolled();

  return (
    <header className="fixed inset-x-0 top-0 z-40 p-(--navbar-margin)">
      <div
        data-scrolled={scrolled}
        className={cn(
          "mx-auto flex h-(--navbar-height) max-w-[calc(var(--container-6xl)+--spacing(4))] items-center justify-between gap-4 rounded-xl px-2 text-(--navbar-foreground) transition-[background-color,box-shadow,backdrop-filter] duration-200",
          // Solid background when the browser can't blur what's behind the navigation bar
          "data-[scrolled=true]:bg-background data-[scrolled=true]:text-foreground data-[scrolled=true]:shadow-xs data-[scrolled=true]:ring-1 data-[scrolled=true]:ring-foreground/10 data-[scrolled=true]:supports-backdrop-filter:bg-background/70 data-[scrolled=true]:supports-backdrop-filter:backdrop-blur-md",
        )}
      >
        <Logo />
        <nav aria-label="Main" className="hidden md:block">
          <NavLinks className="flex items-center gap-1" />
        </nav>
        <MobileMenu />
      </div>
    </header>
  );
}
