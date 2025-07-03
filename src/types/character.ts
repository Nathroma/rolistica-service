// Types pour les personnages et l'API

export interface CharacterStats {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
}

export interface Character {
  id: string;
  name: string;
  level: number;
  stats: CharacterStats;
  gameSystem: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateCharacterRequest {
  name: string;
  gameSystem?: string;
  level?: number;
}

export interface UpdateCharacterRequest {
  name?: string;
  level?: number;
  stats?: Partial<CharacterStats>;
  gameSystem?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
} 