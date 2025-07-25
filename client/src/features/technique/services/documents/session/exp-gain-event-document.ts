import z from 'zod'
import {
  DocumentReadSchema,
  DocumentWriteSchema,
} from '../../../../../types/db/db-service-document-schema'

export const TechniqueExpGainEventSchema = z.object({
  timestamp: z.number(),
  amount: z.number(),
  reason: z.string(),
})

export const TechniqueExpGainEventReadSchema =
  TechniqueExpGainEventSchema.extend(DocumentReadSchema.shape)
export const TechniqueExpGainEventWriteSchema =
  TechniqueExpGainEventSchema.extend(DocumentWriteSchema.shape)

export const PartialTechniqueExpGainEventReadSchema =
  TechniqueExpGainEventReadSchema.partial()
export const PartialTechniqueExpGainEventWriteSchema =
  TechniqueExpGainEventWriteSchema.partial()

export type TechniqueExpGainEventRead = z.infer<
  typeof TechniqueExpGainEventReadSchema
>
export type TechniqueExpGainEventWrite = z.infer<
  typeof TechniqueExpGainEventWriteSchema
>
