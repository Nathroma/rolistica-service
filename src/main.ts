import { VERSION_NEUTRAL, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { cleanupOpenApiDoc } from 'nestjs-zod';
import { AppModule } from './app/app.module';

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
        .addTag('characters', 'Gestion des personnages')
        .addTag('spells', 'Gestion des sorts')
        .addTag('items', 'Gestion des objets')
        .addTag('notes', 'Gestion des notes')
        .build();

    const document = cleanupOpenApiDoc(SwaggerModule.createDocument(app, config));
    SwaggerModule.setup('api', app, document);

    app.enableCors({
        origin: '*',
        methods: 'GET,,PUT,POST,DELETE',
        credentials: true,
    });

    const port = parseInt(process.env.APP_API_PORT || '4000');
    const host = process.env.APP_HOSTNAME || 'localhost';
    await app.listen(port, host);

    console.log(`🚀 Application en cours d'exécution sur http://${host}:${port}`);
    console.log(`📚 Documentation Swagger disponible sur http://${host}:${port}/api`);
}

bootstrap();
