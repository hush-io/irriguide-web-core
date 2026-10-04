import type { Condition } from "../_components/status-pill";
import type { ConditionRange, MetricBoundaries } from "./api";

const conditionOrder: Condition[] = ["suitable", "moderate", "unsuitable"];

function inRange(
  value: number,
  { min, min_inclusive, max, max_inclusive }: ConditionRange,
) {
  const aboveMin = min === null || (min_inclusive ? value >= min : value > min);
  const belowMax = max === null || (max_inclusive ? value <= max : value < max);

  return aboveMin && belowMax;
}

export function evaluateCondition(
  value: number,
  boundaries?: MetricBoundaries | null,
): Condition | null {
  return (
    conditionOrder.find((condition) =>
      boundaries?.conditions[condition].some((range) => inRange(value, range)),
    ) ?? null
  );
}

// The worst condition wins, the same way the backend determines the overall status.
export function overallCondition(conditions: Condition[]): Condition | null {
  if (
    !conditions ||
    conditions.length <= 0 ||
    !conditions.some((condition) => condition)
  ) {
    return null;
  }

  return conditionOrder.reduce((worst, condition) =>
    conditions.includes(condition) ? condition : worst,
  );
}
