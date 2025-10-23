import * as v from 'valibot';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = v.picklist(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const UserScalarFieldEnumSchema = v.picklist(['id','name','address','iconUrl']);

export const MaidProfileScalarFieldEnumSchema = v.picklist(['id','name','character','description','imageUrl','createdAt','updatedAt']);

export const SortOrderSchema = v.picklist(['asc','desc']);

export const QueryModeSchema = v.picklist(['default','insensitive']);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = v.object({
  id: v.pipe(v.number(), v.integer()),
  name: v.string(),
  address: v.pipe(v.string(), v.length(42)),
  iconUrl: v.pipe(v.string(), v.url()),
})

export type User = v.InferOutput<typeof UserSchema>

/////////////////////////////////////////
// MAID PROFILE SCHEMA
/////////////////////////////////////////

export const MaidProfileSchema = v.object({
  id: v.pipe(v.number(), v.integer()),
  name: v.string(),
  character: v.string(),
  description: v.string(),
  imageUrl: v.pipe(v.string(), v.url()),
  // omitted: createdAt: v.coerce(v.date()),
  // omitted: updatedAt: v.coerce(v.date()),
})

export type MaidProfile = v.InferOutput<typeof MaidProfileSchema>
