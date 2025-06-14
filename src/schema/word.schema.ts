import { z } from "zod";

// Defines the structure/type of the word
export const wordSchema = z.string();

export const dataSchema = z.object({
  data: wordSchema,
});
