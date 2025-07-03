import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import { errorHandler } from './middleware/errorHandler';
import { createCharacterRoutes } from './routes/characterRoutes';

export function createApp(): Koa {
  const app = new Koa();

  // Middleware de gestion d'erreurs (doit être en premier)
  app.use(errorHandler);

  // Middleware pour parser le body des requêtes
  app.use(bodyParser({
    enableTypes: ['json'],
    jsonLimit: '10mb'
  }));

  // Middleware pour logger les requêtes
  app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ctx.status} - ${ms}ms`);
  });

  // Middleware CORS basique
  app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    ctx.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    if (ctx.method === 'OPTIONS') {
      ctx.status = 200;
      return;
    }
    
    await next();
  });

  // Routes
  const characterRoutes = createCharacterRoutes();
  app.use(characterRoutes.routes());
  app.use(characterRoutes.allowedMethods());

  // Route par défaut
  app.use(async (ctx) => {
    if (ctx.path === '/') {
      ctx.body = {
        success: true,
        message: '🎲 Character Forger API',
        version: '1.0.0',
        endpoints: {
          characters: '/api/characters',
          search: '/api/characters/search',
          health: '/health'
        }
      };
    } else if (ctx.path === '/health') {
      ctx.body = {
        success: true,
        status: 'healthy',
        timestamp: new Date().toISOString()
      };
    } else {
      ctx.status = 404;
      ctx.body = {
        success: false,
        error: 'Route non trouvée'
      };
    }
  });

  return app;
} 