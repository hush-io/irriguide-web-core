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
// The browser goes through the `/api` rewrite in next.config.ts, the server calls the backend directly.
const backendUrl = process.env.IRRIGUIDE_API_URL ?? "http://localhost:8000";
function apiUrl(path: string) {
  return typeof window === "undefined" ? `${backendUrl}${path}` : path;
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(apiUrl(path), init);
  if (!response.ok) {
    throw new Error(
      `${init?.method ?? "GET"} ${path} failed with ${response.status}`,
    );
  }

  return response.json();
}

export function getWaterQualityBoundaries() {
  return request<WaterQualityBoundaries>("/api/water-quality/boundaries");
}

export function getFarmersPractices() {
  return request<FarmersPractice[]>("/api/farmers/farmers-practice");
}
