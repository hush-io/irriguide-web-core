import { Badge } from "@/components/ui/badge";
export type Condition = "suitable" | "moderate" | "unsuitable";

const toneStyleCondition: Record<Condition, string> = {
  suitable: "bg-success-alt text-success",
  moderate: "bg-warning-alt text-warning",
  unsuitable: "bg-destructive-alt text-destructive",
};

export default function StatusPill({ condition }: { condition: Condition }) {
  const conditionTone = toneStyleCondition[condition];

  return (
    <Badge className={`${conditionTone}`}>
      <span className="mr-1 size-1.5 rounded-full bg-current" />
      {condition.charAt(0).toUpperCase() + condition.slice(1).toLowerCase()}
    </Badge>
  );
}
