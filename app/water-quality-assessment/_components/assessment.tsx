"use client";

import {
  Droplets,
  Gauge,
  Leaf,
  MoreHorizontal,
  ThermometerSun,
  Waves,
} from "lucide-react";
import { type ReactNode, useEffect, useState } from "react";
import { H2, H3 } from "@/components/common/typography";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  type FarmersPractice,
  getFarmersPractices,
  getWaterQualityBoundaries,
  type MetricKey,
  type WaterQualityBoundaries,
  type WaterQualityValues,
} from "../_lib/api";
import { evaluateCondition, overallCondition } from "../_lib/conditions";
import MetricCard, { type Metric } from "./metric-card";
import type { Condition } from "./status-pill";

const metrics: Metric[] = [
  {
    key: "ph",
    label: "pH level",
    tone: "quarternary",
    icon: Droplets,
    min: 0,
    max: 14,
    step: 0.1,
  },
  {
    key: "ec",
    label: "EC",
    tone: "secondary",
    icon: Waves,
    min: 0,
    max: 5,
    step: 0.1,
  },
  {
    key: "salinity",
    label: "Salinity",
    tone: "tertiary",
    icon: Gauge,
    min: 0,
    max: 4,
    step: 0.1,
  },
  {
    key: "water_level",
    label: "Water level",
    tone: "primary",
    icon: ThermometerSun,
    min: 0,
    max: 200,
    step: 1,
  },
];

const toneStyleOverall: Record<
  Condition,
  { container: string; ring: string; text: string }
> = {
  suitable: {
    container: "border-success/20 bg-success-alt",
    ring: "border-success",
    text: "text-success",
  },
  moderate: {
    container: "border-warning/20 bg-warning-alt",
    ring: "border-warning",
    text: "text-warning",
  },
  unsuitable: {
    container: "border-destructive/20 bg-destructive-alt",
    ring: "border-destructive",
    text: "text-destructive",
  },
};

const summary: Record<Condition, string> = {
  suitable: "All parameters are within the suitable range.",
  moderate: "outside the optimal range and should be monitored.",
  unsuitable: "outside the acceptable range. Take corrective action.",
};

const listFormat = new Intl.ListFormat("en");

const BOUNDARIES_POLL_INTERVAL_MS = 5 * 60 * 1000;

function keepIfEqual<T>(current: T, next: T) {
  return JSON.stringify(current) === JSON.stringify(next) ? current : next;
}

interface OverallStatusProps {
  condition: Condition;
  summary: string;
  error: boolean;
}

function OverallStatus({ condition, summary, error }: OverallStatusProps) {
  const tone = toneStyleOverall[condition];

  return (
    <div
      className={cn(
        "flex flex-col justify-between gap-5 rounded-xl border p-5 sm:flex-row sm:items-center",
        tone.container,
      )}
    >
      <div className="flex items-center gap-4">
        <div
          className={cn(
            "grid size-16 shrink-0 place-items-center rounded-full border-8 bg-white",
            tone.ring,
            tone.text,
          )}
        >
          <Droplets size={20} />
        </div>
        <div>
          <p className="font-bold text-[10px] uppercase tracking-[.14em]">
            Overall water quality
          </p>
          <H3 className={cn("mt-1 capitalize", tone.text)}>{condition}</H3>
          <p className="mt-1 text-xs">{summary}</p>
          {error && (
            <p className="mt-1 text-destructive text-xs">
              Unable to refresh the boundaries. Using the last fetched ones.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function RecommendedAction({ practice }: { practice?: FarmersPractice }) {
  return (
    <Card>
      <CardContent>
        <div className="flex items-start justify-between">
          <div>
            <p className="font-bold text-[10px] uppercase tracking-[.14em]">
              Recommended action
            </p>
            <h2 className="mt-1 font-semibold text-lg">
              {practice?.title ?? "Best farmer's practice"}
            </h2>
          </div>
          <div className="grid size-9 place-items-center rounded-lg bg-emerald-50 text-emerald-700">
            <Leaf size={18} />
          </div>
        </div>
        <p className="text-sm leading-relaxed">
          {practice?.content ??
            "No recommended practice is available for these readings."}
        </p>
        <div className="mt-auto flex items-center justify-between border-foreground/10 border-t pt-5 text-[10px]">
          <span>
            <span className="mr-1 inline-block size-1.5 rounded-full bg-emerald-500" />
            Based on the current readings
          </span>
          <MoreHorizontal size={18} />
        </div>
      </CardContent>
    </Card>
  );
}

interface AssessmentProps {
  initialValues: WaterQualityValues;
  initialBoundaries: WaterQualityBoundaries;
  initialPractices: FarmersPractice[];
  simulation: ReactNode;
}

export default function Assessment({
  initialValues,
  initialBoundaries,
  initialPractices,
  simulation,
}: AssessmentProps) {
  const [values, setValues] = useState(initialValues);
  const [boundaries, setBoundaries] = useState(initialBoundaries);
  const [practices, setPractices] = useState(initialPractices);
  const [error, setError] = useState(false);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const [nextBoundaries, nextPractices] = await Promise.all([
          getWaterQualityBoundaries(),
          getFarmersPractices(),
        ]);
        // Keep the previous references when nothing changed so the compiler-memoized children skip re-rendering.
        setBoundaries((current) => keepIfEqual(current, nextBoundaries));
        setPractices((current) => keepIfEqual(current, nextPractices));
        setError(false);
      } catch {
        setError(true);
      }
    }, BOUNDARIES_POLL_INTERVAL_MS);

    return () => clearInterval(interval);
  }, []);

  function updateValue(key: MetricKey, value: number) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  const conditions = Object.fromEntries(
    metrics.map(({ key }) => [
      key,
      evaluateCondition(values[key], boundaries[key]),
    ]),
  ) as Record<MetricKey, Condition>;
  const overall = overallCondition(Object.values(conditions));
  const flagged = metrics
    .filter(({ key }) => conditions[key] === overall)
    .map(({ label }) => label);
  const overallSummary =
    overall === "suitable"
      ? summary.suitable
      : `${listFormat.format(flagged)} ${flagged.length > 1 ? "are" : "is"} ${summary[overall]}`;
  const practice = practices.find(({ keywords }) => keywords.includes(overall));

  return (
    <>
      <OverallStatus
        condition={overall}
        summary={overallSummary}
        error={error}
      />
      <div className="flex items-end justify-between">
        <div>
          <p className="font-bold text-[10px] uppercase tracking-[.14em]">
            Water quality metrics
          </p>
          <H2 className="mt-1">Adjust readings</H2>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <MetricCard
            key={metric.key}
            metric={metric}
            value={values[metric.key]}
            condition={conditions[metric.key]}
            boundaries={boundaries[metric.key]}
            onValueChange={updateValue}
          />
        ))}
      </div>
      <section className="grid gap-4 xl:grid-cols-[1.4fr_.8fr]">
        {simulation}
        <RecommendedAction practice={practice} />
      </section>
    </>
  );
}
