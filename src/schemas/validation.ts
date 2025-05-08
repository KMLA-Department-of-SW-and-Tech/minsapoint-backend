import { z } from 'zod';
import { UserRole } from './models';

export const baseUserSchema = z.object({
  _id: z.string(),
  firebase_uid: z.string(),
  role: z.nativeEnum(UserRole),
  name: z.string()
});

export const studentSchema = baseUserSchema.extend({
  role: z.literal(UserRole.STUDENT),
  studentNumber: z.number(),
  schoolPoints: z.number(),
  dormPoints: z.number(),
  rewardPoints: z.number(),
  totalPoints: z.number(),
  hasCourt: z.boolean()
});

export const accuserSchema = baseUserSchema.extend({
  role: z.literal(UserRole.ACCUSER)
});

export const deptOfJusticeSchema = baseUserSchema.extend({
  role: z.literal(UserRole.DEPT_OF_JUSTICE)
});

export const adminSchema = baseUserSchema.extend({
  role: z.literal(UserRole.ADMIN)
});

export const userSchema = z.discriminatedUnion('role', [
  studentSchema,
  accuserSchema,
  deptOfJusticeSchema,
  adminSchema
]);

export const accusationSchema = z.object({
  _id: z.string(),
  accuserId: z.string(),
  defendantId: z.string(),
  date: z.string(),
  article: z.string(),
  schoolPoints: z.number(),
  dormPoints: z.number(),
  totalPoints: z.number(),
  valid: z.boolean()
});
