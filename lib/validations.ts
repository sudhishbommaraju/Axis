import { z } from 'zod';
import { UserRole } from './db';

export const userRoleSchema = z.enum(['owner', 'customer', 'applicant']);

export const signupSchema = z.object({
    name: z.string().min(2).max(50),
    email: z.string().email(),
    password: z.string().min(8).max(100),
    role: userRoleSchema
});

export const loginSchema = z.object({
    email: z.string().trim().email(),
    password: z.string().min(1)
});

export const messageSchema = z.object({
    content: z.string().trim().min(1).max(1000)
});
