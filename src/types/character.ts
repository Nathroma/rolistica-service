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
  _id: string;
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
  stats: CharacterStats;
  userId: string;
  collectionName: string;
}

export interface UpdateCharacterRequest {
  name?: string;
  level?: number;
  stats?: Partial<CharacterStats>;
  gameSystem?: string;
  userId?: string;
  collectionName?: string;
}