import { RequestLogService } from '@/common/logging/request-log.service';
import { RequestLoggingInterceptor } from '@/common/logging/request-logging.interceptor';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
    providers: [RequestLogService, RequestLoggingInterceptor],
    exports: [RequestLogService, RequestLoggingInterceptor],
})
export class LoggingModule {}
