import { AppService } from '@/app/app.service';
import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('app')
@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get('/status')
    @HttpCode(HttpStatus.NO_CONTENT)
    status(): void {}
}
