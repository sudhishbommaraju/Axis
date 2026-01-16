import fs from 'fs/promises';
import path from 'path';

const DB_PATH = process.env.NODE_ENV === 'production'
    ? path.join('/tmp', 'axis_db.json')
    : path.join(process.cwd(), 'data', 'db.json');

export type UserRole = 'owner' | 'customer' | 'applicant';
export type OnboardingStatus = 'incomplete' | 'complete';

export interface User {
    id: string;
    email: string;
    passwordHash: string;
    name: string;
    role: UserRole;
    onboardingStatus: OnboardingStatus;
    createdAt: string;
    emailVerified: boolean;
    verificationCode?: string;
    visitCount?: number;
}

export interface Message {
    id: string;
    senderId: string;
    receiverId: string;
    content: string;
    timestamp: string;
    read: boolean;
}

export interface OnboardingData {
    userId: string;
    role: UserRole;
    data: any;
    updatedAt: string;
}

export interface DbSchema {
    users: User[];
    onboarding: OnboardingData[];
    messages: Message[];
}

async function readDb(): Promise<DbSchema> {
    try {
        const data = await fs.readFile(DB_PATH, 'utf-8');
        if (!data.trim()) return { users: [], onboarding: [], messages: [] };
        const parsed = JSON.parse(data);
        return {
            users: parsed.users || [],
            onboarding: parsed.onboarding || [],
            messages: parsed.messages || []
        };
    } catch (error) {
        return { users: [], onboarding: [], messages: [] };
    }
}

// Simple Mutex for single-process concurrency safety
// Simple Mutex for single-process concurrency safety
class Mutex {
    private mutex = Promise.resolve();

    lock(): Promise<() => void> {
        let unlockNext: () => void = () => { };

        const willUnlock = new Promise<void>(resolve => {
            unlockNext = () => resolve();
        });

        const effectiveLock = this.mutex.then(() => {
            return unlockNext;
        });

        this.mutex = willUnlock;

        return effectiveLock;
    }
}
const dbMutex = new Mutex();

async function writeDb(data: DbSchema): Promise<void> {
    try {
        await fs.mkdir(path.dirname(DB_PATH), { recursive: true });
        await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
    } catch (error: any) {
        console.error("DB Write Error:", error);
        throw new Error(`DB Save Failed: ${error.code || error.message} at ${DB_PATH}`);
    }
}

export const db = {
    users: {
        findByEmail: async (email: string) => {
            const dbData = await readDb();
            return dbData.users.find(u => u.email === email);
        },
        findById: async (id: string) => {
            const dbData = await readDb();
            return dbData.users.find(u => u.id === id);
        },
        create: async (user: User) => {
            const unlock = await dbMutex.lock();
            try {
                const dbData = await readDb();
                dbData.users.push(user);
                await writeDb(dbData);
                return user;
            } finally {
                unlock();
            }
        },
        update: async (id: string, updates: Partial<User>) => {
            const unlock = await dbMutex.lock();
            try {
                const dbData = await readDb();
                const index = dbData.users.findIndex(u => u.id === id);
                if (index === -1) return null;

                dbData.users[index] = { ...dbData.users[index], ...updates };
                await writeDb(dbData);
                return dbData.users[index];
            } finally {
                unlock();
            }
        },
        incrementVisits: async (id: string) => {
            const unlock = await dbMutex.lock();
            try {
                const dbData = await readDb();
                const index = dbData.users.findIndex(u => u.id === id);
                if (index === -1) return null;

                const current = dbData.users[index].visitCount || 0;
                dbData.users[index].visitCount = current + 1;
                await writeDb(dbData);
                return dbData.users[index];
            } finally {
                unlock();
            }
        },
        getMany: async (ids: string[]) => {
            const dbData = await readDb();
            return dbData.users.filter(u => ids.includes(u.id));
        }
    },
    onboarding: {
        save: async (data: OnboardingData) => {
            const unlock = await dbMutex.lock();
            try {
                const dbData = await readDb();
                const index = dbData.onboarding.findIndex(o => o.userId === data.userId);

                if (index >= 0) {
                    dbData.onboarding[index] = data;
                } else {
                    dbData.onboarding.push(data);
                }

                await writeDb(dbData);
                return data;
            } finally {
                unlock();
            }
        },
        getByUserId: async (userId: string) => {
            const dbData = await readDb();
            return dbData.onboarding.find(o => o.userId === userId);
        }
    },
    messages: {
        create: async (msg: Message) => {
            const unlock = await dbMutex.lock();
            try {
                const dbData = await readDb();
                dbData.messages.push(msg);
                await writeDb(dbData);
                return msg;
            } finally {
                unlock();
            }
        },
        getConversation: async (user1: string, user2: string) => {
            const dbData = await readDb();
            return dbData.messages.filter(m =>
                (m.senderId === user1 && m.receiverId === user2) ||
                (m.senderId === user2 && m.receiverId === user1)
            ).sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
        },
        getRecentContacts: async (userId: string) => {
            // Basic implementation: find all unique userIds communicated with
            const dbData = await readDb();
            const contacts = new Set<string>();
            dbData.messages.forEach(m => {
                if (m.senderId === userId) contacts.add(m.receiverId);
                if (m.receiverId === userId) contacts.add(m.senderId);
            });
            return Array.from(contacts);
        }
    }
};
