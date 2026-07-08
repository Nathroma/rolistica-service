import { config } from 'dotenv';
import { z } from 'zod';

config();

const environmentConfigSchema = z.object({
    APP_API_PORT: z.coerce.number().int().positive().default(3000),
    APP_HOSTNAME: z.string().min(1).default('0.0.0.0'),

    MONGO_DB_ENDPOINT: z.string().min(1).startsWith('mongodb://'),

    JWT_SECRET: z.string().min(1),
    JWT_REFRESH_SECRET: z.string().min(1),

    ACCESS_TOKEN_EXPIRATION_TIME: z.string().min(1),
    REFRESH_TOKEN_EXPIRATION_TIME: z.string().min(1),

    FRONTEND_URL: z.url(),

    SMTP_HOST: z.string().min(1),
    SMTP_PORT: z.coerce.number().int().positive(),
    SMTP_SECURE: z.enum(['true', 'false']).transform((value) => value === 'true'),
    SMTP_USER: z.string().min(1),
    SMTP_PASSWORD: z.string().min(1),
    SMTP_FROM: z.email(),
});

export type EnvironmentConfig = z.infer<typeof environmentConfigSchema>;

function loadEnv(): EnvironmentConfig {
    const result = environmentConfigSchema.safeParse(process.env);

    if (!result.success) {
        console.error('Invalid environment variables:');
        for (const issue of result.error.issues) {
            const path = issue.path.length > 0 ? issue.path.join('.') : 'environment';
            console.error(`  - ${path}: ${issue.message}`);
        }
        process.exit(1);
    }

    return result.data;
}

export const parsedEnv = loadEnv();
