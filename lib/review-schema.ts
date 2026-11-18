// lib/review-schema.ts
import { z } from "zod";

const star = z.number().int().min(1).max(5);

export const reviewSchema = z.object({
  ratings: z.object({
    overall:     star,
    cleanliness: star,
    service:     star,
    facilities:  star,
    value:       star,
  }),
  title: z.string().trim().min(5, "Add a review title of at least 5 characters.").max(80),
  text:  z.string().trim().min(100, "Write at least 100 characters.").max(4000),
  confirmed: z.literal(true, {
    message: "Confirm that the review is your own and honest.",
  }),
});

export type ReviewInput = z.infer<typeof reviewSchema>;