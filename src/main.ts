import { AppModule } from '@/app/app.module';
import { parsedEnv } from '@/config/env';
import { VERSION_NEUTRAL, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { cleanupOpenApiDoc } from 'nestjs-zod';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.enableVersioning({
        type: VersioningType.URI,
        defaultVersion: VERSION_NEUTRAL,
        prefix: 'v',
    });

    const config = new DocumentBuilder()
        .setTitle('Rolistica API')
        .setDescription('A dynamic RPG character creator and manager API')
        .setVersion('1.0')
        .addTag('app', 'Application status')
        .addTag('auth', 'Authentication')
        .addTag('characters', 'Characters management')
        .addTag('spells', 'Spells management')
        .addTag('items', 'Items management')
        .addTag('notes', 'Notes management')
        .addBearerAuth()
        .build();

    const document = cleanupOpenApiDoc(SwaggerModule.createDocument(app, config));
    SwaggerModule.setup('api', app, document);

    app.enableCors({
        methods: 'GET,PUT,POST,DELETE',
        credentials: true,
    });

    await app.listen(parsedEnv.APP_API_PORT, parsedEnv.APP_HOSTNAME);

    console.log(`🚀 Application is running on http://${parsedEnv.APP_HOSTNAME}:${parsedEnv.APP_API_PORT}`);
    console.log(
        `📚 Documentation Swagger is available on http://${parsedEnv.APP_HOSTNAME}:${parsedEnv.APP_API_PORT}/api`,
    );
}

bootstrap();
