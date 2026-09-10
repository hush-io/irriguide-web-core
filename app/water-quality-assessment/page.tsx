import {
  Droplets,
  Gauge,
  Leaf,
  MoreHorizontal,
  ThermometerSun,
  Waves,
} from "lucide-react";
import { H1, H2, H3 } from "@/components/common/typography";
import type { Metric } from "./_components/metric-card";
import MetricCard from "./_components/metric-card";

const metrics: Metric[] = [
  {
    label: "pH level",
    value: 6.4,
    unit: "pH",
    detail: "Target 5.8 – 6.8",
    condition: "suitable",
    tone: "quarternary",
    icon: Droplets,
    progress: 68,
    note: "Balanced for nutrient uptake",
  },
  {
    label: "EC",
    value: 1.8,
    unit: "mS/cm",
    detail: "Target 1.2 – 2.0",
    condition: "suitable",
    tone: "secondary",
    icon: Waves,
    progress: 78,
    note: "Nutrients are within range",
  },
  {
    label: "Salinity",
    value: 0.9,
    unit: "ppt",
    detail: "Target 0.0 – 1.0",
    condition: "moderate",
    tone: "tertiary",
    icon: Gauge,
    progress: 72,
    note: "Monitor accumulation this week",
  },
  {
    label: "Water level",
    value: 82,
    unit: "%",
    detail: "Target 70 – 100%",
    condition: "suitable",
    tone: "primary",
    icon: ThermometerSun,
    progress: 82,
    note: "Reservoir has healthy headroom",
  },
];

function Simulation() {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-slate-200/30 shadow-sm">
      <div className="flex items-center justify-between">Simulation</div>
    </section>
  );
}

export default function WaterQualityAssessment() {
  return (
    <main>
      <section className="flex-1">
        <div className="mx-auto w-[calc(100%-2rem)] max-w-6xl space-y-7 py-8 lg:w-[calc(100%-5rem)]">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <H1>Water Quality Assessment</H1>
          </div>
          <div className="flex flex-col justify-between gap-5 rounded-xl border border-emerald-100 bg-success-alt p-5 sm:flex-row sm:items-center">
            <div className="flex items-center gap-4">
              <div className="grid size-16 place-items-center rounded-full border-8 border-success bg-white font-bold font-mono text-emerald-800 text-lg">
                92<span className="font-normal text-[9px]">/100</span>
              </div>
              <div>
                <p className="font-bold text-[10px] text-slate-400 uppercase tracking-[.14em]">
                  Overall water quality
                </p>
                <H3 className="mt-1 text-success">Suitable</H3>
                <p className="mt-1 text-slate-500 text-xs">
                  Water conditions are supporting optimal crop growth.
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <p className="font-bold text-[10px] text-slate-400 uppercase tracking-[.14em]">
                Water quality metrics
              </p>
              <H2 className="mt-1">Today&apos;s readings</H2>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {metrics.map((metric) => (
              <MetricCard key={metric.label} metric={metric} />
            ))}
          </div>
          <div className="grid gap-4 xl:grid-cols-[1.4fr_.8fr]">
            <Simulation />
            <section className="flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-slate-200/30 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-bold text-[10px] text-slate-400 uppercase tracking-[.14em]">
                    Recommended action
                  </p>
                  <h2 className="mt-1 font-semibold text-lg text-slate-800">
                    Best farmer&apos;s practice
                  </h2>
                </div>
                <div className="grid size-9 place-items-center rounded-lg bg-emerald-50 text-emerald-700">
                  <Leaf size={18} />
                </div>
              </div>
              <p className="mt-6 text-slate-600 text-sm leading-relaxed">
                Keep the reservoir topped up and check salinity again before the
                next irrigation cycle. Your nutrient balance is stable, so avoid
                making large adjustments today.
              </p>
              <div className="mt-5 grid gap-3 text-slate-600 text-xs">
                <div>
                  <span className="mr-2 text-emerald-600">✓</span>Top up
                  reservoir by <strong>5–8 L</strong>
                </div>
                <div>
                  <span className="mr-2 text-emerald-600">✓</span>Retest
                  salinity at <strong>2:00 PM</strong>
                </div>
                <div>
                  <span className="mr-2 text-emerald-600">✓</span>Keep nutrient
                  mix unchanged
                </div>
              </div>
              <div className="mt-auto flex items-center justify-between border-slate-100 border-t pt-5 text-[10px] text-slate-400">
                <span>
                  <span className="mr-1 inline-block size-1.5 rounded-full bg-emerald-500" />
                  Based on today&apos;s readings
                </span>
                <MoreHorizontal size={18} />
              </div>
            </section>
          </div>
          <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-slate-200/30 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="font-bold text-[10px] text-slate-400 uppercase tracking-[.14em]">
                Recent activity
              </p>
              <button className="text-emerald-700 text-xs" type="button">
                See all <span>→</span>
              </button>
            </div>
            <div className="mt-3 divide-y divide-slate-100">
              {[
                [
                  "Water quality test completed",
                  "Today, 09:42 AM · Automated sensor",
                  "Suitable",
                ],
                ["Crop cycle updated", "Yesterday, 04:16 PM · Jamie Davis", ""],
                [
                  "Salinity approaching upper range",
                  "Yesterday, 10:05 AM · System alert",
                  "Moderate",
                ],
              ].map(([title, meta, _status]) => (
                <div key={title} className="flex items-center gap-3 py-3">
                  <div className="grid size-8 place-items-center rounded-lg bg-slate-100 text-slate-500">
                    <Droplets size={15} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <strong className="block truncate text-slate-700 text-xs">
                      {title}
                    </strong>
                    <small className="text-[10px] text-slate-400">{meta}</small>
                  </div>
                  {/* {status && <StatusPill condition={status} />} */}
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
