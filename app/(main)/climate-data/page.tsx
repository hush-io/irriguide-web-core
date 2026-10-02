import { connection } from "next/server";
import { H1 } from "@/components/common/typography";
import PercolationTable from "./_components/percolation-table";
import RainfallChart from "./_components/rainfall-chart";
import { getPercolationData, getRainfallData } from "./_lib/api";

export default async function ClimateData() {
  await connection();
  const [rainfall, percolation] = await Promise.all([
    getRainfallData(),
    getPercolationData(),
  ]);

  return (
    <main className="flex-1 pt-(--navbar-offset)">
      <div className="mx-auto w-[calc(100%-2rem)] max-w-6xl space-y-7 py-8 lg:w-[calc(100%-5rem)]">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <H1>Climate Data</H1>
        </div>
        <RainfallChart rainfall={rainfall} />
        <PercolationTable percolation={percolation} />
      </div>
    </main>
  );
}
