import { MailService } from '@/modules/mail/mail.service';
import { Module } from '@nestjs/common';

@Module({
    providers: [MailService],
    exports: [MailService],
})
export class MailModule {}
