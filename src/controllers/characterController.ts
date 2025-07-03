import { Context } from 'koa';
import { CharacterService } from '../services/characterService';
import { ApiResponse, PaginatedResponse, CreateCharacterRequest, UpdateCharacterRequest } from '../types/character';

export class CharacterController {
  private characterService: CharacterService;

  constructor() {
    this.characterService = new CharacterService();
  }

  /**
   * GET /api/characters - Récupère tous les personnages
   */
  async getAllCharacters(ctx: Context): Promise<void> {
    try {
      const page = parseInt(ctx.query.page as string) || 1;
      const limit = parseInt(ctx.query.limit as string) || 10;
      
      const { characters, total } = this.characterService.getAllCharacters(page, limit);
      const totalPages = Math.ceil(total / limit);

      const response: PaginatedResponse<any> = {
        success: true,
        data: characters,
        pagination: {
          page,
          limit,
          total,
          totalPages
        }
      };

      ctx.body = response;
      ctx.status = 200;
    } catch (error) {
      ctx.body = {
        success: false,
        error: 'Erreur lors de la récupération des personnages'
      };
      ctx.status = 500;
    }
  }

  /**
   * GET /api/characters/:id - Récupère un personnage par ID
   */
  async getCharacterById(ctx: Context): Promise<void> {
    try {
      const { id } = ctx.params;
      const character = this.characterService.getCharacterById(id);

      if (!character) {
        ctx.body = {
          success: false,
          error: 'Personnage non trouvé'
        };
        ctx.status = 404;
        return;
      }

      const response: ApiResponse<any> = {
        success: true,
        data: character
      };

      ctx.body = response;
      ctx.status = 200;
    } catch (error) {
      ctx.body = {
        success: false,
        error: 'Erreur lors de la récupération du personnage'
      };
      ctx.status = 500;
    }
  }

  /**
   * POST /api/characters - Crée un nouveau personnage
   */
  async createCharacter(ctx: Context): Promise<void> {
    try {
      const request: CreateCharacterRequest = ctx.request.body as CreateCharacterRequest;

      // Validation basique
      if (!request.name || request.name.trim().length === 0) {
        ctx.body = {
          success: false,
          error: 'Le nom du personnage est requis'
        };
        ctx.status = 400;
        return;
      }

      const character = this.characterService.createCharacter(request);

      const response: ApiResponse<any> = {
        success: true,
        data: character,
        message: 'Personnage créé avec succès'
      };

      ctx.body = response;
      ctx.status = 201;
    } catch (error) {
      ctx.body = {
        success: false,
        error: 'Erreur lors de la création du personnage'
      };
      ctx.status = 500;
    }
  }

  /**
   * PUT /api/characters/:id - Met à jour un personnage
   */
  async updateCharacter(ctx: Context): Promise<void> {
    try {
      const { id } = ctx.params;
      const request: UpdateCharacterRequest = ctx.request.body as UpdateCharacterRequest;

      const updatedCharacter = this.characterService.updateCharacter(id, request);

      if (!updatedCharacter) {
        ctx.body = {
          success: false,
          error: 'Personnage non trouvé'
        };
        ctx.status = 404;
        return;
      }

      const response: ApiResponse<any> = {
        success: true,
        data: updatedCharacter,
        message: 'Personnage mis à jour avec succès'
      };

      ctx.body = response;
      ctx.status = 200;
    } catch (error) {
      ctx.body = {
        success: false,
        error: 'Erreur lors de la mise à jour du personnage'
      };
      ctx.status = 500;
    }
  }

  /**
   * DELETE /api/characters/:id - Supprime un personnage
   */
  async deleteCharacter(ctx: Context): Promise<void> {
    try {
      const { id } = ctx.params;
      const deleted = this.characterService.deleteCharacter(id);

      if (!deleted) {
        ctx.body = {
          success: false,
          error: 'Personnage non trouvé'
        };
        ctx.status = 404;
        return;
      }

      const response: ApiResponse<null> = {
        success: true,
        message: 'Personnage supprimé avec succès'
      };

      ctx.body = response;
      ctx.status = 200;
    } catch (error) {
      ctx.body = {
        success: false,
        error: 'Erreur lors de la suppression du personnage'
      };
      ctx.status = 500;
    }
  }

  /**
   * GET /api/characters/search?q=query - Recherche des personnages
   */
  async searchCharacters(ctx: Context): Promise<void> {
    try {
      const query = ctx.query.q as string;

      if (!query || query.trim().length === 0) {
        ctx.body = {
          success: false,
          error: 'Le paramètre de recherche est requis'
        };
        ctx.status = 400;
        return;
      }

      const characters = this.characterService.searchCharacters(query);

      const response: ApiResponse<any[]> = {
        success: true,
        data: characters
      };

      ctx.body = response;
      ctx.status = 200;
    } catch (error) {
      ctx.body = {
        success: false,
        error: 'Erreur lors de la recherche'
      };
      ctx.status = 500;
    }
  }
} 