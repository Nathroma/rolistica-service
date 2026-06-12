export enum SpellType {
    cantrip = 'cantrip',
    levelOne = 'levelOne',
    levelTwo = 'levelTwo',
    levelThree = 'levelThree',
    levelFour = 'levelFour',
    levelFive = 'levelFive',
    levelSix = 'levelSix',
    levelSeven = 'levelSeven',
    levelEight = 'levelEight',
    levelNine = 'levelNine',
}

export enum SpellSchool {
    abjuration = 'abjuration',
    conjuration = 'conjuration',
    divination = 'divination',
    enchantment = 'enchantment',
    illusion = 'illusion',
    necromancy = 'necromancy',
    transmutation = 'transmutation',
}

export enum SpellCastingType {
    action = 'action',
    bonusAction = 'bonusAction',
    reaction = 'reaction',
    other = 'other',
}

export enum SpellRange {
    self = 'self',
    touch = 'touch',
    sight = 'sight',
    distance = 'distance',
    other = 'other',
}

export enum SpellDuration {
    instant = 'instant',
    concentration = 'concentration',
    round = 'round',
    minutes = 'minutes',
    hours = 'hours',
    days = 'days',
    other = 'other',
}

export interface Spell {
    _id: string;
    name: string;
    description: string;
    type: SpellType;
    level: number;
    school: string;
    castingTime: string;
    range: string;
    duration: string;
    concentration: boolean;
    ritual: boolean;
    components: string[];
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateSpellRequest {
    name: string;
    description: string;
    type: SpellType;
    level: number;
    school: string;
    castingTime: string;
    range: string;
    duration: string;
    concentration: boolean;
    ritual: boolean;
    components: string[];
    collectionName: string;
}
