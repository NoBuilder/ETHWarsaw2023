import { z } from 'zod'

export const testReqSchema = z.object({ userName: z.string() })

export type TestReqSchema = z.infer<typeof testReqSchema>
