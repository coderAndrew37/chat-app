// lib/tasks/types.ts

export type TaskType = "hotel-review" | "survey" | "chatting" | "ai-training";

// ─── Payloads ───────────────────────────────────────────────────────────────

export type HotelReviewPayload = {
  kind: "hotel-review";
  hotelSlug: string;
  hotelCity: string;
  ratings: Record<
    "overall" | "cleanliness" | "service" | "facilities" | "value",
    number
  >;
  title: string;
  text: string;
};

export type SurveyPayload = {
  kind: "survey";
  surveyId: string;
  answers: Record<string, string>;
};

export type ChattingPayload = {
  kind: "chatting";
  scenarioId: string;
  replies: string[];
};

export type AIRankPayload = {
  kind: "ai-rank";
  promptId: string;
  chosen: "a" | "b";
  rationale: string;
};

export type AILabelPayload = {
  kind: "ai-label";
  itemId: string;
  labels: Record<string, "correct" | "incorrect">;
};

export type TaskPayload =
  | HotelReviewPayload
  | SurveyPayload
  | ChattingPayload
  | AIRankPayload
  | AILabelPayload;

// ─── Payload ↔ Task type map ────────────────────────────────────────────────

/**
 * Maps each task type to the payload(s) it can carry.
 * `ai-training` has two subtypes; everything else is 1:1.
 */
export type TaskPayloadByType = {
  "hotel-review": HotelReviewPayload;
  survey: SurveyPayload;
  chatting: ChattingPayload;
  "ai-training": AIRankPayload | AILabelPayload;
};

// ─── Completion ─────────────────────────────────────────────────────────────

export type TaskCompletionStatus = "Verified" | "Verifying" | "Rejected";

type TaskCompletionCommon = {
  id: string;
  taskSlug: string;
  taskTitle: string;
  rewardUsd: number;
  rewardLocal: number;
  rate: number;
  date: string;
  status: TaskCompletionStatus;
  reasons: string[];
};

/**
 * The full per-type shape — used to construct the discriminated union below.
 * Not usually imported directly; use `TaskCompletion` or `TaskCompletionOf<T>`.
 */
export type TaskCompletionByType = {
  [T in TaskType]: TaskCompletionCommon & {
    taskType: T;
    payload: TaskPayloadByType[T];
  };
};

/**
 * A completed task. `taskType` narrows `payload`:
 *
 *   if (task.taskType === "survey") {
 *     task.payload.answers        // ✅ SurveyPayload, no cast
 *   }
 *   if (task.payload.kind === "ai-rank") {
 *     task.payload.chosen         // ✅ AIRankPayload
 *   }
 */
export type TaskCompletion = TaskCompletionByType[TaskType];

/**
 * Extract a specific task type from the union, for narrower helpers.
 *
 *   function renderAi(task: TaskCompletionOf<"ai-training">) { ... }
 */
export type TaskCompletionOf<T extends TaskType> = TaskCompletionByType[T];

// ─── Constants ──────────────────────────────────────────────────────────────

export const FREE_LIMIT: Record<TaskType, number> = {
  "hotel-review": 2,
  survey: 2,
  chatting: 2,
  "ai-training": 2,
};

export const TASK_LABELS: Record<TaskType, string> = {
  "hotel-review": "Hotel review",
  survey: "Survey",
  chatting: "Chatting",
  "ai-training": "AI training",
};

export const TASK_ROUTES: Record<TaskType, string> = {
  "hotel-review": "dashboard/hotels",
  survey: "dashboard/surveys",
  chatting: "dashboard/chatting",
  "ai-training": "dashboard/ai-training",
};

/**
 * Build an absolute route for a task type (and optional slug).
 *
 * Prefer this over `TASK_ROUTES[type]` string-concatenation — the current
 * `TASK_ROUTES` values are relative (`"dashboard/hotels"`), so forgetting the
 * leading `/` in a link produces a relative URL that resolves from the current
 * path.
 */
export function taskRouteFor(type: TaskType, slug?: string): string {
  const base = `/${TASK_ROUTES[type]}`;
  return slug ? `${base}/${slug}` : base;
}

export const TASK_ACCENTS: Record<
  TaskType,
  { bg: string; text: string; border: string; icon: string }
> = {
  "hotel-review": {
    bg: "#eeecfd",
    text: "#4637c2",
    border: "#5b4bdb",
    icon: "🏨",
  },
  survey: { bg: "#e2f6ee", text: "#13795b", border: "#13795b", icon: "📋" },
  chatting: { bg: "#fff1d6", text: "#9a5b00", border: "#ff7a00", icon: "💬" },
  "ai-training": {
    bg: "#f3e6ff",
    text: "#6b21a8",
    border: "#9333ea",
    icon: "🤖",
  },
};

export const VERIFY_DELAY_MS = 2500;