export enum ItemType {
  weapon = 'weapon',
  armor = 'armor',
  tool = 'tool',
  other = 'other',
}

export enum ItemAction {
  action = 'action',
  bonusAction = 'bonusAction',
  reaction = 'reaction',
  other = 'other',
}

export interface Item {
  _id: string;
  name: string;
  description: string;
  type: ItemType;
  action: ItemAction;
  weight: number;
  value: number;
  damage?: string;
  range?: number;
  weaponProperties?: string[];
  armorClass?: number;
  armorType?: string;
  stealthDisadvantage?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateItemRequest {
  name: string;
  description: string;
  type: ItemType;
  action: ItemAction;
  weight: number;
  value: number;
  damage?: string;
  range?: number;
  weaponProperties?: string[];
  armorClass?: number;
  armorType?: string;
  stealthDisadvantage?: boolean;
  collectionName: string;
}

export interface UpdateItemRequest {
  name?: string;
  description?: string;
  type?: ItemType;
  action?: ItemAction;
  weight?: number;
  value?: number;
  damage?: string;
  range?: number;
  weaponProperties?: string[];
  armorClass?: number;
  armorType?: string;
  stealthDisadvantage?: boolean;
}