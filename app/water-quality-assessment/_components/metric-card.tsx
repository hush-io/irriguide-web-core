import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Condition } from "./status-pill";
import StatusPill from "./status-pill";

export type Tone =
  | "primary"
  | "secondary"
  | "tertiary"
  | "quarternary"
  | "quinary";
export interface Metric {
  label: string;
  value: number;
  unit: string;
  detail: string;
  condition: Condition;
  tone: Tone;
  icon: LucideIcon;
  progress: number;
  note: string;
}

const toneStyleIcon: Record<Tone, string> = {
  primary: "bg-primary-alt text-primary",
  secondary: "bg-secondary-alt text-secondary",
  tertiary: "bg-tertiary-alt text-tertiary",
  quarternary: "bg-quarternary-alt text-quarternary",
  quinary: "bg-quinary-alt text-quinary",
};
const toneStyleSlider: Record<Tone, string> = {
  primary: "bg-primary",
  secondary: "bg-secondary",
  tertiary: "bg-tertiary",
  quarternary: "bg-quarternary",
  quinary: "bg-quinary",
};

export default function MetricCard({ metric }: { metric: Metric }) {
  const Icon = metric.icon;
  const iconTone = toneStyleIcon[metric.tone];
  const sliderTone = toneStyleSlider[metric.tone];

  return (
    <article className="flex min-h-48 flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-slate-200/30 shadow-sm">
      <div className="flex items-center gap-2">
        <div
          className={cn("grid size-9 place-items-center rounded-lg", iconTone)}
        >
          <Icon size={17} />
        </div>
        <StatusPill condition={metric.condition} />
      </div>
      <div className="mt-5 flex items-end justify-between">
        <div>
          <p className="font-bold text-[10px] text-slate-400 uppercase tracking-[.14em]">
            {metric.label}
          </p>
          <p className="mt-1 font-bold font-mono text-3xl text-slate-800 tracking-tight">
            {metric.value}
            <span className="ml-1 font-normal text-slate-400 text-xs">
              {metric.unit}
            </span>
          </p>
        </div>
        <span className="text-[9px] text-slate-400 uppercase tracking-wider">
          Live reading
        </span>
      </div>
      <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-slate-100">
        <span
          className={`block h-full rounded-full ${sliderTone}`}
          style={{ width: `${metric.progress}%` }}
        />
      </div>
      <div className="mt-2 flex justify-between text-[10px] text-slate-400">
        <span>{metric.detail}</span>
        <span>{metric.progress}% in range</span>
      </div>
      <p className="mt-auto pt-4 text-slate-500 text-xs leading-relaxed">
        {metric.note}
      </p>
    </article>
  );
}
