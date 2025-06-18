export const COLORS = ["red", "blue", "green", "yellow", "black"];

export const CARD_TYPES = {
  NUMBER: "num",
  SKIP: "Skip\n⨂",
  REVERSE: "Rev\n⟳",
  DRAW_TWO: "+2",
  WILD: "wild",
  WILD_DRAW_FOUR: "+4",
};

export const INITIAL_GAME_STATE = {
  pCount: 2,
  pNames: [],
  pCodes: [],
  deck: [],
  discard: [],
  pHands: [],
  currPlayer: 0,
  currColor: "",
  dir: 1,
  gameStarted: false,
  scores: [],
  rounds: 0,
  gameOver: false,
  calledFUno: false,
  needCode: true,
  codeInput: "",
  selCardIdx: null,
  activePIdx: null,
  showColorPicker: false,
  lastAction: {
    player: null,
    card: null,
    action: null,
  },
};
