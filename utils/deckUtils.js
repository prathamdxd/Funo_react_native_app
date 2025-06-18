import { COLORS, CARD_TYPES } from "../constants/game";

export const generateDeck = () => {
  let deck = [];
  COLORS.forEach((color) => {
    if (color === "black") {
      for (let i = 0; i < 4; i++) {
        deck.push({ color, type: CARD_TYPES.WILD });
        deck.push({ color, type: CARD_TYPES.WILD_DRAW_FOUR });
      }
      return;
    }

    deck.push({ color, type: CARD_TYPES.NUMBER, value: 0 });

    for (let i = 1; i <= 9; i++) {
      deck.push({ color, type: CARD_TYPES.NUMBER, value: i });
      deck.push({ color, type: CARD_TYPES.NUMBER, value: i });
    }

    deck.push({ color, type: CARD_TYPES.SKIP });
    deck.push({ color, type: CARD_TYPES.SKIP });
    deck.push({ color, type: CARD_TYPES.REVERSE });
    deck.push({ color, type: CARD_TYPES.REVERSE });
    deck.push({ color, type: CARD_TYPES.DRAW_TWO });
    deck.push({ color, type: CARD_TYPES.DRAW_TWO });
  });
  return deck;
};

export const shuffleDeck = (deck) => {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
};

export const dealCards = (players, deck, cards = 7) => {
  const hands = Array(players)
    .fill()
    .map(() => []);
  for (let i = 0; i < cards; i++) {
    for (let j = 0; j < players; j++) {
      if (deck.length > 0) hands[j].push(deck.pop());
    }
  }
  return hands;
};

export const getCardLabel = (card) => {
  if (card.type === CARD_TYPES.NUMBER) return card.value.toString();
  if (card.type === CARD_TYPES.WILD) return "WILD";
  if (card.type === CARD_TYPES.WILD_DRAW_FOUR) return "+4";
  return card.type;
};

export const getCardPoints = (card) => {
  if (card.type === CARD_TYPES.NUMBER) return card.value;
  if (card.type === CARD_TYPES.WILD || card.type === CARD_TYPES.WILD_DRAW_FOUR)
    return 50;
  if (
    card.type === CARD_TYPES.SKIP ||
    card.type === CARD_TYPES.REVERSE ||
    card.type === CARD_TYPES.DRAW_TWO
  )
    return 20;
  return 0;
};
