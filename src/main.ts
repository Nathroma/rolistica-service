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
        .addTag('auth', 'Authentification')
        .addTag('characters', 'Gestion des personnages')
        .addTag('spells', 'Gestion des sorts')
        .addTag('items', 'Gestion des objets')
        .addTag('notes', 'Gestion des notes')
        .addBearerAuth()
        .build();

    const document = cleanupOpenApiDoc(SwaggerModule.createDocument(app, config));
    SwaggerModule.setup('api', app, document);

    app.enableCors({
        methods: 'GET,PUT,POST,DELETE',
        credentials: true,
    });

    await app.listen(parsedEnv.APP_API_PORT, parsedEnv.APP_HOSTNAME);

    console.log(`🚀 Application en cours d'exécution sur http://${parsedEnv.APP_HOSTNAME}:${parsedEnv.APP_API_PORT}`);
    console.log(
        `📚 Documentation Swagger disponible sur http://${parsedEnv.APP_HOSTNAME}:${parsedEnv.APP_API_PORT}/api`,
    );
}

bootstrap();
