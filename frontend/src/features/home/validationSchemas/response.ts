import { z } from 'zod'

export const testResSchema = z.object({ message: z.string() })

export type TestResSchema = z.infer<typeof testResSchema>
