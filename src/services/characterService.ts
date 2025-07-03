import { Character, CreateCharacterRequest, UpdateCharacterRequest } from '../types/character';

export class CharacterService {
  private characters: Character[] = [];

  /**
   * Crée un nouveau personnage avec des statistiques générées automatiquement
   */
  createCharacter(request: CreateCharacterRequest): Character {
    const character: Character = {
      id: this.generateId(),
      name: request.name,
      level: request.level || 1,
      stats: this.generateStats(),
      gameSystem: request.gameSystem || 'D&D 5e',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.characters.push(character);
    return character;
  }

  /**
   * Récupère tous les personnages avec pagination optionnelle
   */
  getAllCharacters(page: number = 1, limit: number = 10): { characters: Character[], total: number } {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedCharacters = this.characters.slice(startIndex, endIndex);
    
    return {
      characters: paginatedCharacters,
      total: this.characters.length
    };
  }

  /**
   * Récupère un personnage par son ID
   */
  getCharacterById(id: string): Character | undefined {
    return this.characters.find(char => char.id === id);
  }

  /**
   * Met à jour un personnage
   */
  updateCharacter(id: string, request: UpdateCharacterRequest): Character | null {
    const characterIndex = this.characters.findIndex(char => char.id === id);
    
    if (characterIndex === -1) {
      return null;
    }

    const character = this.characters[characterIndex]!; // Assertion de non-nullité
    
    // Mise à jour des propriétés
    if (request.name !== undefined) character.name = request.name;
    if (request.level !== undefined) character.level = request.level;
    if (request.gameSystem !== undefined) character.gameSystem = request.gameSystem;
    if (request.stats !== undefined) {
      character.stats = { ...character.stats, ...request.stats };
    }
    
    character.updatedAt = new Date();
    
    this.characters[characterIndex] = character;
    return character;
  }

  /**
   * Supprime un personnage par son ID
   */
  deleteCharacter(id: string): boolean {
    const index = this.characters.findIndex(char => char.id === id);
    if (index !== -1) {
      this.characters.splice(index, 1);
      return true;
    }
    return false;
  }

  /**
   * Recherche des personnages par nom
   */
  searchCharacters(query: string): Character[] {
    const lowercaseQuery = query.toLowerCase();
    return this.characters.filter(char => 
      char.name.toLowerCase().includes(lowercaseQuery)
    );
  }

  /**
   * Génère des statistiques aléatoires pour un personnage
   */
  private generateStats() {
    return {
      strength: this.rollStat(),
      dexterity: this.rollStat(),
      constitution: this.rollStat(),
      intelligence: this.rollStat(),
      wisdom: this.rollStat(),
      charisma: this.rollStat()
    };
  }

  /**
   * Lance 4d6 et garde les 3 meilleurs résultats (méthode D&D)
   */
  private rollStat(): number {
    const rolls: number[] = [];
    for (let i = 0; i < 4; i++) {
      rolls.push(Math.floor(Math.random() * 6) + 1);
    }
    
    // Trier et garder les 3 meilleurs
    rolls.sort((a, b) => b - a);
    return rolls.slice(0, 3).reduce((sum, roll) => sum + roll, 0);
  }

  /**
   * Génère un ID unique pour un personnage
   */
  private generateId(): string {
    return `char_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
} 