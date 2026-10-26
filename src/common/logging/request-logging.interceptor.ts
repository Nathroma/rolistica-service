import { RequestLogService } from '@/common/logging/request-log.service';
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

const IGNORED_PATH_PREFIXES = ['/api'];

@Injectable()
export class RequestLoggingInterceptor implements NestInterceptor {
    constructor(private readonly requestLogService: RequestLogService) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
        const http = context.switchToHttp();
        const request = http.getRequest<{ method: string; originalUrl: string }>();
        const response = http.getResponse<{ statusCode: number }>();
        const { method, originalUrl } = request;

        if (this.shouldIgnore(originalUrl)) {
            return next.handle();
        }

        const startedAt = Date.now();

        return next.handle().pipe(
            tap({
                next: () => {
                    this.requestLogService.log({
                        method,
                        path: originalUrl,
                        statusCode: response.statusCode,
                        durationMs: Date.now() - startedAt,
                    });
                },
                error: (error: { status?: number; statusCode?: number }) => {
                    this.requestLogService.log({
                        method,
                        path: originalUrl,
                        statusCode: error.status ?? error.statusCode ?? 500,
                        durationMs: Date.now() - startedAt,
                    });
                },
            }),
        );
    }

    private shouldIgnore(path: string): boolean {
        return IGNORED_PATH_PREFIXES.some((prefix) => path === prefix || path.startsWith(`${prefix}/`));
    }
}
