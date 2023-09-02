import { z } from 'zod'

export const createChallengeFormSchema = z.object({
  title: z.string().min(3).max(255),
  description: z.string().min(3).max(255),
  endDate: z.number(),
  bounty: z.number().gt(0),
  beneficiary: z.string(),
  jury: z.array(z.string()).length(1)
})

export const createChallengeFormTitleSchema =
  createChallengeFormSchema.shape.title
export const createChallengeFormDescriptionSchema =
  createChallengeFormSchema.shape.description
export const createChallengeFormEndDateSchema =
  createChallengeFormSchema.shape.endDate
export const createChallengeFormBountySchema =
  createChallengeFormSchema.shape.bounty
export const createChallengeFormBeneficiarySchema =
  createChallengeFormSchema.shape.beneficiary
export const createChallengeFormJurySchema =
  createChallengeFormSchema.shape.jury

export type CreateChallengeFormSchema = z.infer<
  typeof createChallengeFormSchema
>
