import { request } from "@/lib/api";

export interface RainfallData {
  id: number;
  year: number;
  month: number;
  actual_rainfall_value: number;
  predicted_rainfall_value: number;
}

export interface PercolationData {
  id: number;
  soil_type_area: string;
  soil_type_class: string;
}

export function getRainfallData() {
  return request<RainfallData[]>("/api/climate-data/rainfall");
}

export function getPercolationData() {
  return request<PercolationData[]>("/api/climate-data/percolation");
}
