import { z } from 'zod'

export const testFormSchema = z.object({
  name: z
    .string()
    .min(3, 'Name should be at least 3 characters long.')
    .max(21, 'Name too long.')
})

export const testFormNameSchema = testFormSchema.shape.name

export type TestFormSchema = z.infer<typeof testFormSchema>
