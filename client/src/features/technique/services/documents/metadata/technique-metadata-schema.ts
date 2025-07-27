import z from 'zod'
import { HabitMateMetadataSchema } from './originalMetadata/habit-mate-metadata-schema'
import { TechniqueMetadataBaseSchema } from './technique-metadata-base-document'
import {
  DocumentReadSchema,
  DocumentWriteSchema,
} from '../../../../../types/db/db-service-document-schema'

const AllMetadataReadSchemas = [
  HabitMateMetadataSchema.extend(DocumentReadSchema.shape),
  TechniqueMetadataBaseSchema.extend({
    techniqueId: z.literal('taskPress'),
  }).extend(DocumentReadSchema.shape),
  TechniqueMetadataBaseSchema.extend({
    techniqueId: z.literal('tinySteps'),
  }).extend(DocumentReadSchema.shape),
  TechniqueMetadataBaseSchema.extend({
    techniqueId: z.literal('pomodoro'),
  }).extend(DocumentReadSchema.shape),
  TechniqueMetadataBaseSchema.extend({
    techniqueId: z.literal('feynman'),
  }).extend(DocumentReadSchema.shape),
  TechniqueMetadataBaseSchema.extend({
    techniqueId: z.literal('timeBlocking'),
  }).extend(DocumentReadSchema.shape),
] as const

const AllMetadataWriteSchemas = [
  HabitMateMetadataSchema.extend(DocumentWriteSchema.shape),
  TechniqueMetadataBaseSchema.extend({
    techniqueId: z.literal('taskPress'),
  }).extend(DocumentWriteSchema.shape),
  TechniqueMetadataBaseSchema.extend({
    techniqueId: z.literal('tinySteps'),
  }).extend(DocumentWriteSchema.shape),
  TechniqueMetadataBaseSchema.extend({
    techniqueId: z.literal('pomodoro'),
  }).extend(DocumentWriteSchema.shape),
  TechniqueMetadataBaseSchema.extend({
    techniqueId: z.literal('feynman'),
  }).extend(DocumentWriteSchema.shape),
  TechniqueMetadataBaseSchema.extend({
    techniqueId: z.literal('timeBlocking'),
  }).extend(DocumentWriteSchema.shape),
] as const

const AllPartialMetadataReadSchemas = AllMetadataReadSchemas.map((schema) =>
  schema.partial()
)
const AllPartialMetadataWriteSchemas = AllMetadataWriteSchemas.map((schema) =>
  schema.partial()
)

export const MetadataReadSchema = z.union(AllMetadataReadSchemas)
export const MetadataWriteSchema = z.union(AllMetadataWriteSchemas)

export const PartialMetadataReadSchema = z.union(AllPartialMetadataReadSchemas)
export const PartialMetadataWriteSchema = z.union(
  AllPartialMetadataWriteSchemas
)

export type TechniqueMetadataRead = z.infer<typeof MetadataReadSchema>
export type TechniqueMetadataWrite = z.infer<typeof MetadataWriteSchema>
