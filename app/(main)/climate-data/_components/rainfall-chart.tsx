"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import type { RainfallData } from "../_lib/api";

const chartConfig = {
  actual: {
    label: "Actual",
    color: "var(--primary)",
  },
  predicted: {
    label: "Predicted",
    color: "var(--tertiary)",
  },
} satisfies ChartConfig;

const shortMonth = new Intl.DateTimeFormat("en", { month: "short" });
const longMonth = new Intl.DateTimeFormat("en", {
  month: "long",
  year: "numeric",
});

interface RainfallPoint {
  period: string;
  label: string;
  tick: string;
  actual: number;
  predicted: number;
}

function toPoints(rainfall: RainfallData[]): RainfallPoint[] {
  return rainfall
    .toSorted((a, b) => a.year - b.year || a.month - b.month)
    .map(({ year, month, actual_rainfall_value, predicted_rainfall_value }) => {
      const date = new Date(year, month - 1);

      return {
        period: `${year}-${month}`,
        label: longMonth.format(date),
        tick: shortMonth.format(date),
        actual: actual_rainfall_value,
        predicted: predicted_rainfall_value,
      };
    });
}

export default function RainfallChart({
  rainfall,
}: {
  rainfall: RainfallData[];
}) {
  const points = toPoints(rainfall);
  const byPeriod = new Map(points.map((point) => [point.period, point]));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Rainfall</CardTitle>
        <CardDescription>
          Actual and predicted monthly rainfall (mm)
        </CardDescription>
      </CardHeader>
      <CardContent>
        {points.length === 0 ? (
          <p className="py-10 text-center text-muted-foreground text-sm">
            No rainfall data available.
          </p>
        ) : (
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-72 w-full"
          >
            <AreaChart data={points} margin={{ left: 12, right: 12 }}>
              <defs>
                <linearGradient id="fillActual" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-actual)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-actual)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
                <linearGradient id="fillPredicted" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-predicted)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-predicted)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="period"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(period: string) =>
                  byPeriod.get(period)?.tick ?? period
                }
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                width={32}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    indicator="dot"
                    labelFormatter={(period) =>
                      byPeriod.get(String(period))?.label
                    }
                    formatter={(value, name) => (
                      <>
                        <span className="text-muted-foreground">
                          {chartConfig[name as keyof typeof chartConfig].label}
                        </span>
                        <span className="ml-auto font-medium font-mono text-foreground tabular-nums">
                          {Number(value).toLocaleString()} mm
                        </span>
                      </>
                    )}
                  />
                }
              />
              <Area
                dataKey="predicted"
                type="natural"
                fill="url(#fillPredicted)"
                stroke="var(--color-predicted)"
                strokeDasharray="4 4"
              />
              <Area
                dataKey="actual"
                type="natural"
                fill="url(#fillActual)"
                stroke="var(--color-actual)"
              />
              <ChartLegend content={<ChartLegendContent />} />
            </AreaChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
