import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';

const HOSTINGER_MAX_EMAILS_PER_MINUTE = 5;
const MIN_INTERVAL_MS = 60_000 / HOSTINGER_MAX_EMAILS_PER_MINUTE;

@Injectable()
export class MailService {
    private readonly logger = new Logger(MailService.name);
    private transporter: Transporter | null = null;
    private lastSentAt = 0;

    private getTransporter(): Transporter | null {
        const host = process.env.SMTP_HOST;
        const user = process.env.SMTP_USER;
        const pass = process.env.SMTP_PASSWORD;

        if (!host || !user || !pass) {
            return null;
        }

        if (!this.transporter) {
            this.transporter = nodemailer.createTransport({
                host,
                port: parseInt(process.env.SMTP_PORT || '587'),
                secure: process.env.SMTP_SECURE === 'true',
                auth: { user, pass },
            });
        }

        return this.transporter;
    }

    async sendPasswordResetEmail(to: string, resetUrl: string): Promise<void> {
        const from = process.env.SMTP_FROM || process.env.SMTP_USER;
        const subject = 'Réinitialisation de votre mot de passe — Rolistica';
        const text = [
            'Bonjour,',
            '',
            'Vous avez demandé la réinitialisation de votre mot de passe.',
            'Cliquez sur le lien ci-dessous (valable 15 minutes) :',
            '',
            resetUrl,
            '',
            'Si vous n\'êtes pas à l\'origine de cette demande, ignorez cet email.',
        ].join('\n');

        const html = `
            <p>Bonjour,</p>
            <p>Vous avez demandé la réinitialisation de votre mot de passe.</p>
            <p><a href="${resetUrl}">Réinitialiser mon mot de passe</a></p>
            <p>Ce lien est valable <strong>15 minutes</strong>.</p>
            <p>Si vous n'êtes pas à l'origine de cette demande, ignorez cet email.</p>
        `;

        const transporter = this.getTransporter();

        if (!transporter) {
            this.logger.warn('SMTP not configured — password reset link (dev only):');
            this.logger.warn(resetUrl);
            return;
        }

        await this.waitForRateLimit();

        await transporter.sendMail({ from, to, subject, text, html });
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
