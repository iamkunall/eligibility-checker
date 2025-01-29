import { z } from "zod"

export const frameworkSchema = z.object({
  name: z.string().min(1, "Name is required"),
  company: z.string().min(1, "Company is required"),
  remarks: z.string().optional(),
})

export type FrameworkFormData = z.infer<typeof frameworkSchema>

