export interface Card {
  pack_code: string;
  pack_name: string;
  type_code: Type;
  type_name: TypeName;
  faction_code: Faction;
  faction_name: FactionName;
  position: number;
  exceptional: boolean;
  myriad: boolean;
  code: string;
  name: string;
  real_name: string;
  subname?: string;
  text?: string;
  real_text?: string;
  quantity: number;
  skill_willpower?: number;
  skill_intellect?: number;
  skill_combat?: number;
  skill_agility?: number;
  health?: number;
  health_per_investigator: boolean;
  sanity?: number;
  deck_limit?: number;
  real_slot?: Slot;
  traits?: string;
  real_traits?: string;
  deck_requirements?: DeckRequirements;
  deck_options?: DeckOption[];
  flavor?: string;
  illustrator?: string;
  is_unique: boolean;
  permanent: boolean;
  double_sided: boolean;
  back_text?: string;
  back_flavor?: string;
  octgn_id?: string;
  url: string;
  imagesrc?: string;
  backimagesrc?: string;
  duplicated_by?: string[];
  alternated_by?: string[];
  cost?: number;
  xp?: number;
  slot?: Slot;
  subtype_code?: SubtypeCode;
  subtype_name?: SubtypeName;
  errata_date?: ErrataDate;
  skill_wild?: number;
  restrictions?: Restrictions;
  tags?: Tags;
  victory?: number;
  enemy_damage?: number;
  enemy_horror?: number;
  enemy_fight?: number;
  enemy_evade?: number;
  hidden?: boolean;
  exile?: boolean;
  linked_to_code?: string;
  linked_to_name?: string;
  linked_card?: LinkedCard;
  faction2_code?: Faction;
  faction2_name?: FactionName;
  bonded_cards?: CardBondedCard[];
  bonded_to?: string;
  bonded_count?: number;
  shroud?: number;
  clues?: number;
  alternate_of_code?: string;
  alternate_of_name?: string;
  duplicate_of_code?: string;
  duplicate_of_name?: string;
  faction3_code?: Faction;
  faction3_name?: FactionName;
  customization_text?: string;
  customization_change?: string;
  customization_options?: CustomizationOption[];
}

export interface CardBondedCard {
  count: number;
  code: string;
}

export interface CustomizationOption {
  xp: number;
  real_traits?: string;
  real_slot?: Slot;
  text_change?: TextChange;
  health?: number;
  sanity?: number;
  cost?: number;
  real_text?: string;
  tags?: Tags;
  position?: number;
  choice?: string;
  quantity?: number;
  card?: CardClass;
  deck_limit?: number;
}

export interface CardClass {
  type: Type[];
  trait: string[];
}

export enum Type {
  Asset = "asset",
  Enemy = "enemy",
  Event = "event",
  Investigator = "investigator",
  Location = "location",
  Skill = "skill",
  Story = "story",
  Treachery = "treachery",
}

export enum Slot {
  Accessory = "Accessory",
  Ally = "Ally",
  AllyArcane = "Ally. Arcane",
  Arcane = "Arcane",
  ArcaneX2 = "Arcane x2",
  Body = "Body",
  BodyArcane = "Body. Arcane",
  BodyHandX2 = "Body. Hand x2",
  Empty = "",
  Hand = "Hand",
  HandArcane = "Hand. Arcane",
  HandX2 = "Hand x2",
  HandX2Arcane = "Hand x2. Arcane",
  Tarot = "Tarot",
}

export enum Tags {
  Empty = "",
  HD = "hd.",
  HDHh = "hd.hh.",
  Hh = "hh.",
  Pa = "pa.",
  SE = "se.",
}

export enum TextChange {
  Append = "append",
  Insert = "insert",
  Replace = "replace",
  Trait = "trait",
}

export interface DeckOption {
  faction?: Faction[];
  level?: Level;
  limit?: number;
  error?: string;
  not?: boolean;
  trait?: string[];
  tag?: string[];
  atleast?: Atleast;
  uses?: string[];
  text?: string[];
  name?: string;
  faction_select?: Faction[];
  type?: Type[];
  deck_size_select?: string[];
  slot?: Slot[];
  option_select?: OptionSelect[];
  id?: string;
  permanent?: boolean;
  base_level?: Level;
}

export interface Atleast {
  factions: number;
  min: number;
}

export interface Level {
  min: number;
  max: number;
}

export enum Faction {
  Guardian = "guardian",
  Seeker = "seeker",
  Rogue = "rogue",
  Mystic = "mystic",
  Survivor = "survivor",
  Neutral = "neutral",
}

export const FactionColors: Record<Faction, string> = {
  [Faction.Guardian]: "#27437A",
  [Faction.Seeker]: "#D6A538",
  [Faction.Rogue]: "#107D46",
  [Faction.Mystic]: "#573E78",
  [Faction.Survivor]: "#A62A2A",
  [Faction.Neutral]: "#B2B2B2",
};

export interface OptionSelect {
  id: string;
  name: string;
  trait: string[];
  level: Level;
  size?: number;
}

export interface DeckRequirements {
  size: number;
  card: { [key: string]: { [key: string]: string } };
  random: Random[];
}

export interface Random {
  target: Target;
  value: SubtypeCode;
}

export enum Target {
  Subtype = "subtype",
}

export enum SubtypeCode {
  Basicweakness = "basicweakness",
  Weakness = "weakness",
}

export interface ErrataDate {
  date: Date;
  timezone_type: number;
  timezone: Timezone;
}

export enum Timezone {
  UTC = "UTC",
}

export enum FactionName {
  Guardian = "Guardian",
  Mystic = "Mystic",
  Neutral = "Neutral",
  Rogue = "Rogue",
  Seeker = "Seeker",
  Survivor = "Survivor",
}

export interface LinkedCard {
  pack_code: string;
  pack_name: string;
  type_code: Type;
  type_name: TypeName;
  subtype_code?: SubtypeCode;
  subtype_name?: SubtypeName;
  faction_code: Faction;
  faction_name: FactionName;
  id: number;
  position: number;
  exceptional: boolean;
  myriad: boolean;
  encounter_position: null;
  code: string;
  name: string;
  real_name: string;
  subname: null | string;
  bonded_to: null | string;
  bonded_count: number | null;
  cost: null;
  text: string;
  customization_text: null;
  customization_change: null;
  real_text: string;
  quantity: number;
  skill_willpower: null;
  skill_intellect: null;
  skill_combat: null;
  skill_agility: null;
  skill_wild: null;
  xp: null;
  shroud: number | null;
  clues: number | null;
  clues_fixed: boolean;
  doom: null;
  health: null;
  health_per_investigator: boolean;
  sanity: null;
  enemy_damage: null;
  enemy_horror: null;
  enemy_fight: null;
  enemy_evade: null;
  victory: null;
  vengeance: null;
  deck_limit: number | null;
  slot: null;
  real_slot: null | string;
  stage: null;
  traits: null | string;
  real_traits: null | string;
  tags: null;
  deck_requirements: null;
  deck_options: null;
  customization_options: null;
  restrictions: Restrictions | null;
  flavor: string;
  illustrator: null | string;
  is_unique: boolean;
  exile: boolean;
  hidden: boolean;
  permanent: boolean;
  double_sided: boolean;
  back_text: null;
  back_flavor: null;
  back_name: null;
  octgn_id: null;
  url: string;
  imagesrc: null | string;
  bonded_cards?: BondedCard[];
}

export interface BondedCard {
  count: number;
  code: string;
}

export interface Restrictions {
  investigator: { [key: string]: string };
}

export enum SubtypeName {
  BasicWeakness = "Basic Weakness",
  Weakness = "Weakness",
}

export enum TypeName {
  Asset = "Asset",
  Enemy = "Enemy",
  Event = "Event",
  Investigator = "Investigator",
  Location = "Location",
  Skill = "Skill",
  Story = "Story",
  Treachery = "Treachery",
}

export interface Pack {
  name: string;
  code: string;
  position: number;
  cycle_position: number;
  available: Date;
  known: number;
  total: number;
  url: string;
  id: number;
}
