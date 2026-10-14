import type { CheckState, DatabaseMode } from "@/Types/types";

export function readinessState(value: boolean | undefined): CheckState {
  if (value === true) return "success";
  if (value === false) return "warning";
  return "loading";
}

export function readinessText(value: boolean | undefined): string {
  if (value === true) return "آماده";
  if (value === false) return "نیازمند بررسی";
  return "نامشخص";
}

export function databaseModeText(mode: DatabaseMode | undefined): string {
  if (mode === "mongo") return "MongoDB";
  if (mode === "supabase") return "Supabase";
  return "نامشخص";
}
