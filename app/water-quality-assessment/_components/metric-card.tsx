import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import type { ConditionRange, MetricBoundaries, MetricKey } from "../_lib/api";
import type { Condition } from "./status-pill";
import StatusPill from "./status-pill";

export type Tone =
  | "primary"
  | "secondary"
  | "tertiary"
  | "quarternary"
  | "quinary";
export interface Metric {
  key: MetricKey;
  label: string;
  tone: Tone;
  icon: LucideIcon;
  min: number;
  max: number;
  step: number;
}

const toneStyleIcon: Record<Tone, string> = {
  primary: "bg-primary-alt text-primary",
  secondary: "bg-secondary-alt text-secondary",
  tertiary: "bg-tertiary-alt text-tertiary",
  quarternary: "bg-quarternary-alt text-quarternary",
  quinary: "bg-quinary-alt text-quinary",
};
const toneStyleSlider: Record<Tone, string> = {
  primary:
    "**:data-[slot=slider-range]:bg-primary **:data-[slot=slider-thumb]:border-primary",
  secondary:
    "**:data-[slot=slider-range]:bg-secondary **:data-[slot=slider-thumb]:border-secondary",
  tertiary:
    "**:data-[slot=slider-range]:bg-tertiary **:data-[slot=slider-thumb]:border-tertiary",
  quarternary:
    "**:data-[slot=slider-range]:bg-quarternary **:data-[slot=slider-thumb]:border-quarternary",
  quinary:
    "**:data-[slot=slider-range]:bg-quinary **:data-[slot=slider-thumb]:border-quinary",
};
const conditionNote: Record<Condition, string> = {
  suitable: "Within the suitable range",
  moderate: "Outside the optimal range, keep monitoring",
  unsuitable: "Outside the acceptable range, take action",
};

function formatRange({
  min,
  min_inclusive,
  max,
  max_inclusive,
}: ConditionRange) {
  if (min !== null && max !== null) {
    return `${min} – ${max}`;
  }
  if (max !== null) {
    return `${max_inclusive ? "≤" : "<"} ${max}`;
  }
  if (min !== null) {
    return `${min_inclusive ? "≥" : ">"} ${min}`;
  }

  return "Any";
}

interface MetricCardProps {
  metric: Metric;
  value: number;
  condition?: Condition;
  boundaries?: MetricBoundaries;
  onValueChange: (value: number) => void;
}

export default function MetricCard({
  metric,
  value,
  condition,
  boundaries,
  onValueChange,
}: MetricCardProps) {
  const Icon = metric.icon;
  const iconTone = toneStyleIcon[metric.tone];
  const sliderTone = toneStyleSlider[metric.tone];
  const decimals = metric.step.toString().split(".")[1]?.length ?? 0;
  const target = boundaries?.conditions.suitable.map(formatRange).join(", ");

  return (
    <Card className="min-h-48">
      <CardContent>
        <div className="flex items-center gap-2">
          <div
            className={cn(
              "grid size-10 place-items-center rounded-lg",
              iconTone,
            )}
          >
            <Icon size={17} />
          </div>
          {condition && <StatusPill condition={condition} />}
        </div>
        <div className="flex flex-col gap-2">
          <div>
            <p className="font-bold text-[10px] text-slate-400 uppercase tracking-[.14em]">
              {metric.label}
            </p>
            <p className="mt-1 font-bold font-mono text-3xl text-slate-800 tracking-tight">
              {value.toFixed(decimals)}
              <span className="ml-1 font-normal text-slate-400 text-xs">
                {boundaries?.unit}
              </span>
            </p>
          </div>
          <Slider
            className={cn("py-1.5", sliderTone)}
            aria-label={metric.label}
            value={value}
            min={metric.min}
            max={metric.max}
            step={metric.step}
            onValueChange={(next) =>
              onValueChange(typeof next === "number" ? next : next[0])
            }
          />
          <div className="flex justify-between text-[10px] text-slate-400">
            <span>{target && `Target ${target}`}</span>
            <span>
              {metric.min} – {metric.max}
            </span>
          </div>
        </div>
        <p className="mt-auto text-slate-500 text-xs leading-relaxed">
          {condition && conditionNote[condition]}
        </p>
      </CardContent>
    </Card>
  );
}
