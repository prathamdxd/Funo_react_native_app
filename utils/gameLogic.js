import { CARD_TYPES } from "../constants/game";

export const canPlayCard = (topCard, newCard, currColor) => {
  if (newCard.color === "black") return true;
  if (newCard.color === currColor) return true;
  if (newCard.color === topCard.color) return true;
  if (newCard.type !== CARD_TYPES.NUMBER && newCard.type === topCard.type) {
    return true;
  }
  if (
    newCard.type === CARD_TYPES.NUMBER &&
    topCard.type === CARD_TYPES.NUMBER &&
    newCard.value === topCard.value
  ) {
    return true;
  }
  return false;
};

export const startGame = (pCount, pNames) => {
  let newDeck = shuffleDeck(generateDeck());
  const hands = dealCards(pCount, newDeck);
  let firstCard = newDeck.pop();

  while (firstCard.color === "black" || firstCard.type !== CARD_TYPES.NUMBER) {
    newDeck.unshift(firstCard);
    firstCard = newDeck.pop();
  }

  const initialState = {
    deck: newDeck,
    discard: [firstCard],
    pHands: hands,
    currColor: firstCard.color,
    gameStarted: true,
    scores: Array(pCount).fill(0),
    activePIdx: firstCard.type === CARD_TYPES.SKIP ? 1 % pCount : 0,
    dir: firstCard.type === CARD_TYPES.REVERSE ? -1 : 1,
    currPlayer: firstCard.type === CARD_TYPES.SKIP ? 1 % pCount : 0,
  };

  if (firstCard.type === CARD_TYPES.REVERSE) {
    initialState.message = "Direction reversed! Dealer starts, play goes right";
  }

  if (firstCard.type === CARD_TYPES.SKIP) {
    initialState.message = "First player skipped! Next player starts";
  }

  return initialState;
};

export const startNewRound = (pCount, rounds, scores) => {
  const newRounds = rounds + 1;
  if (scores?.some((score) => score >= 500)) {
    return { gameOver: true };
  }

  let newDeck = shuffleDeck(generateDeck());
  const hands = dealCards(pCount, newDeck);
  let firstCard = newDeck.pop();

  while (firstCard.color === "black" || firstCard.type !== CARD_TYPES.NUMBER) {
    newDeck.unshift(firstCard);
    firstCard = newDeck.pop();
  }

  return {
    deck: newDeck,
    discard: [firstCard],
    pHands: hands,
    currColor: firstCard.color,
    currPlayer: (newRounds + 1) % pCount,
    dir: 1,
    calledFUno: false,
    selCardIdx: null,
    needCode: true,
    activePIdx: (newRounds + 1) % pCount,
    rounds: newRounds,
    message: `New round! First card: ${firstCard.color} ${getCardLabel(
      firstCard
    )}`,
    ...(firstCard.type === CARD_TYPES.REVERSE && {
      dir: -1,
      message: "Direction reversed!",
    }),
    ...(firstCard.type === CARD_TYPES.SKIP && {
      currPlayer: (newRounds + 2) % pCount,
      activePIdx: (newRounds + 2) % pCount,
      message: "First player skipped! Next player starts",
    }),
  };
};
