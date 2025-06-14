import { z } from "zod";

// Defines the structure/type of the word
export const wordSchema = z
  .string()
  .min(1, "Please enter a word, entry cannot be empty");

export const dataSchema = z.object({
  data: wordSchema,
});
