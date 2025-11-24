import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Active la validation globale des DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Supprime les propriétés non définies dans le DTO
      forbidNonWhitelisted: true, // Rejette les requêtes avec des propriétés non autorisées
      transform: true, // Transforme automatiquement les types
    }),
  );

  // Configuration CORS
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  const port = process.env.API_API_PORT || 3000;
  const host = process.env.API_HOSTNAME || 'localhost';
  await app.listen(port, host);

  console.log('🎲 Character Forger API démarrée !');
  console.log(`🚀 Serveur en cours d'exécution sur http://${host}:${port}`);
  console.log('📚 Documentation des endpoints :');
  console.log(`   GET  http://${host}:${port}/ - Page d'accueil`);
  console.log(`   GET  http://${host}:${port}/health - Statut de santé`);
  console.log(`   GET  http://${host}:${port}/api/characters - Liste des personnages`);
  console.log(`   POST http://${host}:${port}/api/characters - Créer un personnage`);
  console.log(`   GET  http://${host}:${port}/api/characters/search?q=nom - Rechercher`);
  console.log('');
  console.log('💡 Exemple de création de personnage :');
  console.log(`   curl -X POST http://${host}:${port}/api/characters \\`);
  console.log('   -H "Content-Type: application/json" \\');
  console.log('   -d \'{"name": "Aragorn", "gameSystem": "D&D 5e"}\'');
}

bootstrap();

