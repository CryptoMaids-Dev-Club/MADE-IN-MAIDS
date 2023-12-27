import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const UserScalarFieldEnumSchema = z.enum(['id','name','address','iconUrl']);

export const MaidProfileScalarFieldEnumSchema = z.enum(['id','name','character','description','imageUrl','createdAt','updatedAt']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  address: z.string(),
  iconUrl: z.string(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// MAID PROFILE SCHEMA
/////////////////////////////////////////

export const MaidProfileSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  character: z.string(),
  description: z.string(),
  imageUrl: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type MaidProfile = z.infer<typeof MaidProfileSchema>
