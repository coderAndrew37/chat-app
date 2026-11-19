import type { TaskType } from "./types";
import { HOTELS } from "../hotels";
import { SURVEYS } from "./surveys";
import { CHATTING_SCENARIOS } from "./chatting";
import { AI_TRAINING_TASKS } from "./ai-training";

export type CatalogItem = {
  slug: string;
  name: string;
  pay: number;
  estMinutes: number;
};

export function catalogFor(type: TaskType): CatalogItem[] {
  switch (type) {
    case "hotel-review":
      return HOTELS.map((h) => ({
        slug: h.slug,
        name: h.name,
        pay: h.pay,
        estMinutes: 10,
      }));
    case "survey":
      return SURVEYS.map((s) => ({
        slug: s.slug,
        name: s.name,
        pay: s.pay,
        estMinutes: s.estMinutes,
      }));
    case "chatting":
      return CHATTING_SCENARIOS.map((c) => ({
        slug: c.slug,
        name: c.name,
        pay: c.pay,
        estMinutes: c.estMinutes,
      }));
    case "ai-training":
      return AI_TRAINING_TASKS.map((t) => ({
        slug: t.slug,
        name: t.name,
        pay: t.pay,
        estMinutes: t.estMinutes,
      }));
  }
}

export function catalogCount(type: TaskType): number {
  return catalogFor(type).length;
}

export * from "./types";
export { SURVEYS, surveyBySlug } from "./surveys";
export { CHATTING_SCENARIOS, chattingBySlug } from "./chatting";
export {
  AI_TRAINING_TASKS,
  aiTrainingBySlug,
  type AIRankTask,
  type AILabelTask,
  type AITrainingTask,
} from "./ai-training";