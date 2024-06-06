import { Redis } from "ioredis";
import { config } from 'dotenv';
config();
console.log("Redis connection string ",process.env.REDIS_CONNECTION_STRING);

export const pub = new Redis(process.env.REDIS_CONNECTION_STRING as string, {
	connectTimeout: 100000,
});

export const sub = new Redis(process.env.REDIS_CONNECTION_STRING as string, {
	connectTimeout: 100000,
});