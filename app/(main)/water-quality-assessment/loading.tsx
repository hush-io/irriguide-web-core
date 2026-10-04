import { H1 } from "@/components/common/typography";
import { Card, CardContent } from "@/components/ui/card";
import Assessment from "./_components/assessment";
import type { WaterQualityValues } from "./_lib/api";

const initialValues: WaterQualityValues = {
  ph: 6.4,
  ec: 1.8,
  salinity: 0.9,
  water_level: 82,
};

function Simulation() {
  return (
    <Card>
      <CardContent>Simulation</CardContent>
    </Card>
  );
}

export default async function WaterQualityAssessment() {
  return (
    <main className="flex-1 pt-(--navbar-offset)">
      <div className="mx-auto w-[calc(100%-2rem)] max-w-6xl space-y-7 py-8 lg:w-[calc(100%-5rem)]">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <H1>Water Quality Assessment</H1>
        </div>
        <Assessment initialValues={initialValues} simulation={<Simulation />} />
      </div>
    </main>
  );
}
