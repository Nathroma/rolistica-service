import Router from '@koa/router';
import { CharacterController } from '../controllers/characterController';

export function createCharacterRoutes(): Router {
  const router = new Router({
    prefix: '/api/characters'
  });

  const characterController = new CharacterController();

  // GET /api/characters - Récupère tous les personnages
  router.get('/', (ctx) => characterController.getAllCharacters(ctx));

  // GET /api/characters/search - Recherche des personnages
  router.get('/search', (ctx) => characterController.searchCharacters(ctx));

  // GET /api/characters/:id - Récupère un personnage par ID
  router.get('/:id', (ctx) => characterController.getCharacterById(ctx));

  // POST /api/characters - Crée un nouveau personnage
  router.post('/', (ctx) => characterController.createCharacter(ctx));

  // PUT /api/characters/:id - Met à jour un personnage
  router.put('/:id', (ctx) => characterController.updateCharacter(ctx));

  // DELETE /api/characters/:id - Supprime un personnage
  router.delete('/:id', (ctx) => characterController.deleteCharacter(ctx));

  return router;
} 