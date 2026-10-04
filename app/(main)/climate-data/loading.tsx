import { H1 } from "@/components/common/typography";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";

function _Spinner() {
  return <Spinner className="size-8" />;
}

function _CardContent() {
  return (
    <CardContent className="my-18 items-center">
      <_Spinner />
    </CardContent>
  );
}

function RainfallChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Rainfall</CardTitle>
        <CardDescription>
          Actual and predicted monthly rainfall (mm)
        </CardDescription>
      </CardHeader>
      <_CardContent />
    </Card>
  );
}

function PercolationTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Percolation</CardTitle>
        <CardDescription>Soil type class per area</CardDescription>
      </CardHeader>
      <_CardContent />
    </Card>
  );
}

export default async function ClimateData() {
  return (
    <main className="flex-1 pt-(--navbar-offset)">
      <div className="mx-auto w-[calc(100%-2rem)] max-w-6xl space-y-7 py-8 lg:w-[calc(100%-5rem)]">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <H1>Climate Data</H1>
        </div>
        <RainfallChart />
        <PercolationTable />
      </div>
    </main>
  );
}
