import { Card, Faction, Type } from "../types/api";
import { create } from "zustand/react";

interface FilterState {
  textFilter: string;
  setTextFilter: (text: string) => void;
  textFilterType: string;
  setTextFilterType: (titlesOnly: string) => void;
  showAllResults: boolean;
  setShowAllResults: (showAllResults: boolean) => void;
  factionFilter: Faction[];
  setFactionFilter: (factions: Faction[]) => void;
  xpFilter: [number, number];
  setxpFilter: (xpCost: [number, number]) => void;
  resourceFilter: [number, number];
  setResourceFilter: (resourceCost: [number, number]) => void;
  typeFilter: Type[];
  setTypeFilter: (types: Type[]) => void;
  traitFilter: string[];
  setTraitFilter: (traits: string[]) => void;
  packFilter: string[];
  setPackFilter: (packs: string[]) => void;
  investigatorFilter: Card | null;
  setInvestigatorFilter: (card: Card | null) => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  textFilter: "",
  setTextFilter: (text) => set({ textFilter: text }),
  textFilterType: "all",
  setTextFilterType: (titlesOnly) => set({ textFilterType: titlesOnly }),
  showAllResults: false,
  setShowAllResults: (showAllResults) => set({ showAllResults: showAllResults }),
  factionFilter: [],
  setFactionFilter: (factions) => set({ factionFilter: factions }),
  xpFilter: [0, 10],
  setxpFilter: (xpCost) => set({ xpFilter: xpCost }),
  resourceFilter: [-2, 12],
  setResourceFilter: (resourceCost) => set({ resourceFilter: resourceCost }),
  typeFilter: [],
  setTypeFilter: (types) => set({ typeFilter: types }),
  traitFilter: [],
  setTraitFilter: (traits) => set({ traitFilter: traits }),
  packFilter: [],
  setPackFilter: (packs) => set({ packFilter: packs }),
  investigatorFilter: null,
  setInvestigatorFilter: (card) => set({ investigatorFilter: card }),
}));

function textFilter(cards: Card[], filter: FilterState) {
  if (filter.textFilter === "") {
    return cards;
  }

  return cards.filter((card) => {
    const searchText = filter.textFilter.toLowerCase();
    const titleMatch = card.name.toLowerCase().includes(searchText);
    const textMatch = card.text?.toLowerCase().includes(searchText);

    if (filter.textFilterType === "title") {
      return titleMatch;
    }

    if (filter.textFilterType === "text") {
      return textMatch;
    }

    return titleMatch || textMatch;
  });
}

function traitFilter(cards: Card[], filter: FilterState) {
  if (filter.traitFilter.length === 0) {
    return cards;
  }

  return cards.filter((card) => {
    if (!card.traits) return false;
    const cardTraits = card.traits
      .split(".")
      .map((trait) => trait.trim())
      .filter((trait) => trait !== "");
    return filter.traitFilter.every((filterTrait) =>
      cardTraits.some((cardTrait) => cardTrait.toLowerCase().includes(filterTrait.toLowerCase()))
    );
  });
}

function packFilter(cards: Card[], filter: FilterState) {
  if (filter.packFilter.length === 0) {
    return cards;
  }

  return cards.filter((card) => filter.packFilter.includes(card.pack_code));
}

function factionFilter(cards: Card[], filter: FilterState) {
  if (filter.factionFilter.length === 0) {
    return cards;
  }

  return cards.filter((card) =>
    filter.factionFilter.some((faction) => card.faction_code.includes(faction))
  );
}

function xpFilter(cards: Card[], filter: FilterState) {
  return cards.filter((card) => {
    if (filter.xpFilter[0] === 0 && filter.xpFilter[1] === 10) {
      return true;
    }

    if (!card.hasOwnProperty("xp") || card.xp === undefined) {
      return false;
    }

    const xpCost = card.exceptional ? card.xp * 2 : card.xp;

    return xpCost >= filter.xpFilter[0] && xpCost <= filter.xpFilter[1];
  });
}

function resourceFilter(cards: Card[], filter: FilterState) {
  return cards.filter((card) => {
    if (filter.resourceFilter[0] === -2 && filter.resourceFilter[1] === 12) {
      return true;
    }

    if (!card.hasOwnProperty("cost") || card.cost === undefined) {
      return false;
    }

    return card.cost >= filter.resourceFilter[0] && card.cost <= filter.resourceFilter[1];
  });
}

function typeFilter(cards: Card[], filter: FilterState) {
  return cards.filter((card) => {
    if (filter.typeFilter.length === 0) {
      return true;
    }

    return filter.typeFilter.includes(card.type_code);
  });
}

function investigatorFilter(cards: Card[], filter: FilterState) {
  if (!filter.investigatorFilter) {
    return cards;
  }

  const deckOptions = filter.investigatorFilter.deck_options;

  if (!deckOptions) {
    return cards;
  }

  return cards.filter((card) => {
    if (
      card.type_code === Type.Enemy ||
      card.type_code === Type.Investigator ||
      card.type_code === Type.Treachery ||
      card.subtype_code
    ) {
      return false;
    }

    let isRestricted = false;

    return (
      deckOptions.some((deckOption) => {
        let isValid = true;

        if (deckOption.faction) {
          const factions = deckOption.faction;
          isValid =
            isValid &&
            factions.some(
              (faction) =>
                card.faction_code === faction ||
                card.faction2_code === faction ||
                card.faction3_code === faction
            );
        }

        if (deckOption.level) {
          let cardCost = card.xp ?? 0;
          isValid = isValid && cardCost >= deckOption.level.min && cardCost <= deckOption.level.max;
        }

        if (deckOption.trait) {
          const cardTraits = card.traits?.split(".").map((t) => t.trim().toLowerCase());
          isValid =
            isValid &&
            deckOption.trait.some((trait) => cardTraits?.some((cardTrait) => trait === cardTrait));
        }

        if (deckOption.tag) {
          const cardTags = card.tags?.split(".").map((t) => t.trim().toLowerCase());

          isValid =
            isValid && deckOption.tag.some((tag) => cardTags?.some((cardTag) => tag === cardTag));
        }

        if (deckOption.type) {
          isValid = isValid && deckOption.type.some((type) => card.type_code === type);
        }

        if (deckOption.uses) {
          isValid =
            isValid &&
            deckOption.uses.some((use) => card.text?.toLowerCase().includes(use.toLowerCase()));
        }

        if (isValid && deckOption.not) {
          isRestricted = true;
        }

        return isValid;
      }) && !isRestricted
    );
  });
}

export function filterCards(cards: Card[], filter: FilterState): Card[] {
  const filters = [
    textFilter,
    factionFilter,
    xpFilter,
    resourceFilter,
    typeFilter,
    traitFilter,
    packFilter,
    investigatorFilter,
  ];

  return filters.reduce((filteredCards, filterFn) => {
    return filterFn(filteredCards, filter);
  }, cards);
}
