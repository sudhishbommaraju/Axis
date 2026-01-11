import fs from 'fs/promises';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'data', 'db.json');

export type UserRole = 'owner' | 'customer' | 'applicant';
export type OnboardingStatus = 'incomplete' | 'complete';

export interface User {
    id: string;
    email: string;
    passwordHash: string; // In a real app, this would be hashed. Storing cleartext/simulated hash for now.
    name: string;
    role: UserRole;
    onboardingStatus: OnboardingStatus;
    createdAt: string;
}

export interface OnboardingData {
    userId: string;
    role: UserRole;
    data: any; // Structured data based on role
    updatedAt: string;
}

export interface DbSchema {
    users: User[];
    onboarding: OnboardingData[];
}

async function readDb(): Promise<DbSchema> {
    try {
        const data = await fs.readFile(DB_PATH, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        // If file doesn't exist or error, return empty default
        return { users: [], onboarding: [] };
    }
}

async function writeDb(data: DbSchema): Promise<void> {
    await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
}

export const db = {
    users: {
        findByEmail: async (email: string) => {
            const dbData = await readDb();
            return dbData.users.find(u => u.email === email);
        },
        create: async (user: User) => {
            const dbData = await readDb();
            dbData.users.push(user);
            await writeDb(dbData);
            return user;
        },
        update: async (id: string, updates: Partial<User>) => {
            const dbData = await readDb();
            const index = dbData.users.findIndex(u => u.id === id);
            if (index === -1) return null;

            dbData.users[index] = { ...dbData.users[index], ...updates };
            await writeDb(dbData);
            return dbData.users[index];
        }
    },
    onboarding: {
        save: async (data: OnboardingData) => {
            const dbData = await readDb();
            const index = dbData.onboarding.findIndex(o => o.userId === data.userId);

            if (index >= 0) {
                dbData.onboarding[index] = data;
            } else {
                dbData.onboarding.push(data);
            }

            await writeDb(dbData);
            return data;
        },
        getByUserId: async (userId: string) => {
            const dbData = await readDb();
            return dbData.onboarding.find(o => o.userId === userId);
        }
    }
};
