import type { CSSProperties } from "react";

// Recommended top app bar heights (Material Design): 56px on phones, 64px on
// tablets and desktops. The switch happens at the `sm` breakpoint.
export enum NavbarHeight {
  Mobile = 56,
  Desktop = 64,
}

// Gap between the navigation bar and the viewport edges, so it feels like it's floating.
export const NAVBAR_MARGIN = 8;

// Exposes the navigation bar sizes as CSS variables to everything below the element it's applied to:
// - `--navbar-height`: height of the navigation bar for the current screen size
// - `--navbar-margin`: gap between the navigation bar and the viewport edges
// - `--navbar-offset`: space the navigation bar takes up, used to push page content below it
// - `--navbar-foreground`: text color while the navigation bar is transparent. Pages with a light
//   backdrop behind the navigation bar (e.g. a wallpaper) mark it with `data-navbar-backdrop="light"`
//   to keep the text readable in dark mode.
export const navbarStyle = {
  "--navbar-height-mobile": `${NavbarHeight.Mobile}px`,
  "--navbar-height-desktop": `${NavbarHeight.Desktop}px`,
  "--navbar-margin": `${NAVBAR_MARGIN}px`,
} as CSSProperties;

export const navbarClassName =
  "[--navbar-foreground:var(--color-foreground)] [--navbar-height:var(--navbar-height-mobile)] [--navbar-offset:calc(var(--navbar-height)+var(--navbar-margin)*2)] has-data-[navbar-backdrop=light]:[--navbar-foreground:var(--color-black)] sm:[--navbar-height:var(--navbar-height-desktop)]";

export interface NavItem {
  title: string;
  href: string;
}

export const NAV_ITEMS: NavItem[] = [
  { title: "Home", href: "/" },
  { title: "Climate Data", href: "/climate-data" },
  { title: "Water Quality Assessment", href: "/water-quality-assessment" },
];
