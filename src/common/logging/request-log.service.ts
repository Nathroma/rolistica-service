import { Injectable, Logger } from '@nestjs/common';

const ANSI = {
    reset: '\x1b[0m',
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    gray: '\x1b[90m',
} as const;

export type RequestLogEntry = {
    method: string;
    path: string;
    statusCode: number;
    durationMs: number;
};

@Injectable()
export class RequestLogService {
    private readonly logger = new Logger('HTTP');

    log(entry: RequestLogEntry): void {
        const { method, path, statusCode, durationMs } = entry;
        const coloredStatus = this.colorizeStatusCode(statusCode);
        const duration = `${ANSI.gray}${durationMs}ms${ANSI.reset}`;

        this.logger.log(`${method} ${path} ${coloredStatus} ${duration}`);
    }

    private colorizeStatusCode(statusCode: number): string {
        if (statusCode >= 200 && statusCode < 400) {
            return `${ANSI.green}${statusCode}${ANSI.reset}`;
        }

        if (statusCode >= 400 && statusCode < 500) {
            return `${ANSI.yellow}${statusCode}${ANSI.reset}`;
        }

        return `${ANSI.red}${statusCode}${ANSI.reset}`;
    }
}
