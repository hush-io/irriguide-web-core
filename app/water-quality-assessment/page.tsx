import { Droplets } from "lucide-react";
import { connection } from "next/server";
import { H1 } from "@/components/common/typography";
import { Card, CardContent } from "@/components/ui/card";
import Assessment from "./_components/assessment";
import StatusPill, { type Condition } from "./_components/status-pill";
import {
  getFarmersPractices,
  getWaterQualityBoundaries,
  type WaterQualityValues,
} from "./_lib/api";

const initialValues: WaterQualityValues = {
  ph: 6.4,
  ec: 1.8,
  salinity: 0.9,
  water_level: 82,
};

type Activity = [string, string, Condition | ""];
const activities: Activity[] = [
  [
    "Water quality test completed",
    "Today, 09:42 AM · Automated sensor",
    "suitable",
  ],
  ["Crop cycle updated", "Yesterday, 04:16 PM · Jamie Davis", ""],
  [
    "Salinity approaching upper range",
    "Yesterday, 10:05 AM · System alert",
    "moderate",
  ],
];

function Simulation() {
  return (
    <Card>
      <CardContent>Simulation</CardContent>
    </Card>
  );
}

export default async function WaterQualityAssessment() {
  await connection();
  const [initialBoundaries, initialPractices] = await Promise.all([
    getWaterQualityBoundaries(),
    getFarmersPractices(),
  ]);

  return (
    <main className="flex-1">
      <div className="mx-auto w-[calc(100%-2rem)] max-w-6xl space-y-7 py-8 lg:w-[calc(100%-5rem)]">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <H1>Water Quality Assessment</H1>
        </div>
        <Assessment
          initialValues={initialValues}
          initialBoundaries={initialBoundaries}
          initialPractices={initialPractices}
          simulation={<Simulation />}
        />
        <Card>
          <CardContent className="gap-0">
            <div className="flex items-center justify-between">
              <p className="font-bold text-[10px] uppercase tracking-[.14em]">
                Recent activity
              </p>
            </div>
            <div className="mt-3 divide-y divide-border">
              {activities.map(([title, meta, status]) => (
                <div key={title} className="flex items-center gap-3 py-3">
                  <div className="grid size-8 place-items-center rounded-lg bg-slate-100">
                    <Droplets size={15} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <strong className="block truncate text-xs">{title}</strong>
                    <small className="text-[10px]">{meta}</small>
                  </div>
                  {status && <StatusPill condition={status} />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
