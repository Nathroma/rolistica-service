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
        const subject = 'Réinitialisation de votre mot de passe — Rolistica';
        const text = [
            'Bonjour,',
            '',
            'Vous avez demandé la réinitialisation de votre mot de passe.',
            'Cliquez sur le lien ci-dessous (valable 15 minutes) :',
            '',
            resetUrl,
            '',
            "Si vous n'êtes pas à l'origine de cette demande, ignorez cet email.",
        ].join('\n');

        const html = `
            <p>Bonjour,</p>
            <p>Vous avez demandé la réinitialisation de votre mot de passe.</p>
            <p><a href="${resetUrl}">Réinitialiser mon mot de passe</a></p>
            <p>Ce lien est valable <strong>15 minutes</strong>.</p>
            <p>Si vous n'êtes pas à l'origine de cette demande, ignorez cet email.</p>
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
