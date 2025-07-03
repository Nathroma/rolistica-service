import { Context, Next } from 'koa';

export async function errorHandler(ctx: Context, next: Next): Promise<void> {
  try {
    await next();
  } catch (err: any) {
    // Log de l'erreur
    console.error('Erreur API:', err);

    // Définition du statut HTTP
    ctx.status = err.status || err.statusCode || 500;

    // Réponse d'erreur formatée
    ctx.body = {
      success: false,
      error: err.message || 'Erreur interne du serveur',
      ...(process.env.NODE_ENV === 'development' && {
        stack: err.stack,
        details: err
      })
    };

    // Headers CORS si nécessaire
    ctx.set('Content-Type', 'application/json');
  }
} 