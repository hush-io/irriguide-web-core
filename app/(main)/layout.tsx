import { navbarClassName, navbarStyle } from "@/components/navbar/constants";
import Navbar from "@/components/navbar/navbar";
import { cn } from "@/lib/utils";

// Pages that show the navigation bar. Pages without it (e.g. login) go in a separate route group.
// The navigation bar floats over the page, so pages offset their content with `--navbar-offset`.
export default function MainLayout({ children }: LayoutProps<"/">) {
  return (
    <div
      style={navbarStyle}
      className={cn("flex flex-1 flex-col", navbarClassName)}
    >
      <Navbar />
      {children}
    </div>
  );
}
