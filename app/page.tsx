import Link from "next/link";
import { H1 } from "@/components/common/typography";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Anchor {
  title: string;
  key: string;
  description: string;
  buttonText: string;
  href: string;
}

const ANCHORS: Anchor[] = [
  {
    title: "Climate Data",
    key: "climate-data",
    description:
      "Real-time weather data monitoring, soil moisture insights, and historical climate analytics to inform your irrigation strategies.",
    buttonText: "View Dashboard",
    href: "/climate-data",
  },
  {
    title: "Water Quality Assessment",
    key: "water-quailty-assessment",
    description:
      "Monitor and analyze essential water quality parameters for optimal irrigation safety, crop health, and regulatory compliance.",
    buttonText: "Check Quality",
    href: "/water-quality-assessment",
  },
];

export default function Home() {
  return (
    <div className="bg-zinc-50 font-body">
      <main className="flex min-h-screen w-full flex-col items-center justify-center">
        <section className="relative flex h-screen w-full flex-col items-center justify-center bg-[url('/assets/splash-wallpaper.png')] bg-center bg-cover bg-no-repeat">
          <div className="my-6">
            <H1 className="text-center font-heading text-4xl text-black">
              Smart Irrigation. Thriving Crops.
            </H1>
            <p className="my-2 text-center text-black">
              Optimizing water resources for sustainable agriculture and
              healthier yields.
            </p>
          </div>
          <div className="my-6 flex w-full items-center justify-center">
            {ANCHORS.map((anchor) => (
              <Card key={anchor.key} className="mx-4 h-60 max-w-md">
                <CardHeader>
                  <CardTitle>{anchor.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{anchor.description}</CardDescription>
                </CardContent>
                <CardFooter className="mt-auto">
                  <Button
                    render={<Link href={anchor.href} />}
                    nativeButton={false}
                    className="w-full"
                  >
                    {anchor.buttonText}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
