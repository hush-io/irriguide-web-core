import { ArrowRight, CloudSun, Droplets, type LucideIcon } from "lucide-react";
import HoverPrefetchLink from "@/components/common/hover-prefetch-link";
import { H1, H2 } from "@/components/common/typography";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Module {
  title: string;
  key: string;
  description: string;
  href: string;
  icon: LucideIcon;
}

const MODULES: Module[] = [
  {
    title: "Climate Data",
    key: "climate-data",
    description:
      "Real-time weather data monitoring, soil moisture insights, and historical climate analytics to inform your irrigation strategies.",
    href: "/climate-data",
    icon: CloudSun,
  },
  {
    title: "Water Quality Assessment",
    key: "water-quality-assessment",
    description:
      "Monitor and analyze essential water quality parameters for optimal irrigation safety, crop health, and regulatory compliance.",
    href: "/water-quality-assessment",
    icon: Droplets,
  },
];

export default function Home() {
  return (
    <main className="flex-1 font-body">
      <section
        data-navbar-backdrop="light"
        className="flex h-[calc(--spacing(72)+var(--navbar-offset))] w-full items-end bg-[url('/assets/splash-wallpaper.png')] bg-center bg-cover bg-no-repeat md:h-[calc(--spacing(80)+var(--navbar-offset))]"
      >
        <div className="w-full bg-linear-to-t from-white/80 to-transparent">
          <div className="mx-auto w-[calc(100%-2rem)] max-w-6xl pt-16 pb-10 lg:w-[calc(100%-5rem)]">
            <H1 className="text-black">Smart Irrigation. Thriving Crops.</H1>
            <p className="mt-2 text-black">
              Optimizing water resources for sustainable agriculture and
              healthier yields.
            </p>
          </div>
        </div>
      </section>
      <div className="mx-auto w-[calc(100%-2rem)] max-w-6xl space-y-4 py-8 lg:w-[calc(100%-5rem)]">
        <H2>Modules</H2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {MODULES.map(({ key, href, icon: Icon, title, description }) => (
            <HoverPrefetchLink
              key={key}
              href={href}
              className="group rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Card className="h-full transition-colors group-hover:bg-muted/50">
                <CardHeader className="gap-3">
                  <div className="flex items-center justify-between">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="size-5" />
                    </div>
                    <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                  </div>
                  <CardTitle className="text-base">{title}</CardTitle>
                  <CardDescription>{description}</CardDescription>
                </CardHeader>
              </Card>
            </HoverPrefetchLink>
          ))}
        </div>
      </div>
    </main>
  );
}
