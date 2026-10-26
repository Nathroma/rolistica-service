import { parsedEnv } from '@/config/env';
import { Injectable, Logger } from '@nestjs/common';
import type { Transporter } from 'nodemailer';
import * as nodemailer from 'nodemailer';

const HOSTINGER_MAX_EMAILS_PER_MINUTE = 5;
const MIN_INTERVAL_MS = 60_000 / HOSTINGER_MAX_EMAILS_PER_MINUTE;

@Injectable()
export class MailService {
    private readonly logger = new Logger(MailService.name);
    private transporter: Transporter | null = null;
    private lastSentAt = 0;

    private getTransporter(): Transporter {
        if (!this.transporter) {
            this.transporter = nodemailer.createTransport({
                host: parsedEnv.SMTP_HOST,
                port: parsedEnv.SMTP_PORT,
                secure: parsedEnv.SMTP_SECURE,
                auth: {
                    user: parsedEnv.SMTP_USER,
                    pass: parsedEnv.SMTP_PASSWORD,
                },
            });
        }

        return this.transporter;
    }

    async sendPasswordResetEmail(to: string, resetUrl: string): Promise<void> {
        const subject = 'Password reset — Rolistica';
        const text = [
            'Hello,',
            '',
            'You have requested a password reset.',
            'Click the link below (valid for 15 minutes) :',
            '',
            resetUrl,
            '',
            'If you did not request a password reset, please ignore this email.',
        ].join('\n');

        const html = `
            <p>Hello,</p>
            <p>You have requested a password reset.</p>
            <p><a href="${resetUrl}">Reset your password</a></p>
            <p>This link is valid for <strong>15 minutes</strong>.</p>
            <p>If you did not request a password reset, please ignore this email.</p>
        `;

        await this.waitForRateLimit();

        await this.getTransporter().sendMail({
            from: parsedEnv.SMTP_FROM,
            to,
            subject,
            text,
            html,
        });

        this.lastSentAt = Date.now();
    }

    private async waitForRateLimit(): Promise<void> {
        const elapsed = Date.now() - this.lastSentAt;
        const waitMs = MIN_INTERVAL_MS - elapsed;

        if (waitMs > 0) {
            await new Promise((resolve) => setTimeout(resolve, waitMs));
        }
    }
}
