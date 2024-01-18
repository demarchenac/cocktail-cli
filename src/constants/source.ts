import type { Choice, Source } from "../types/source";

export const sources = {
  asura: "Asura Scans",
} as const;

export const sourceChoices = [
  { value: "asura", description: "Asura Scans" },
] satisfies Choice<Source>[];
