import { request } from "@/lib/api";
import type { Condition } from "../_components/status-pill";

export type MetricKey = "ph" | "ec" | "salinity" | "water_level";
export type WaterQualityValues = Record<MetricKey, number>;

export interface ConditionRange {
  min: number | null;
  min_inclusive: boolean;
  max: number | null;
  max_inclusive: boolean;
}
export interface MetricBoundaries {
  unit: string;
  conditions: Record<Condition, ConditionRange[]>;
}
export type WaterQualityBoundaries = Record<MetricKey, MetricBoundaries>;

export interface FarmersPractice {
  id: number;
  title: string;
  content: string;
  keywords: string[];
}
export function getWaterQualityBoundaries() {
  return request<WaterQualityBoundaries>("/api/water-quality/boundaries");
}

export function getFarmersPractices() {
  return request<FarmersPractice[]>("/api/farmers/farmers-practice");
}
