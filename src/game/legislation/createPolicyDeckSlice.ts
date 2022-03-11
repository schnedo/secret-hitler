import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type PolicyDeck from "./PolicyDeck";
import type { PolicyDeckShuffler } from "./PolicyDeckShuffler";

interface PolicyDeckCreator {
  (): PolicyDeck;
}

interface PolicyDeckState {
  drawingPile: PolicyDeck;
  discardPile: PolicyDeck;
  nLiberalsPlayed: number;
  nFascistsPlayed: number;
}

function getInitialState(createPolicyDeck: PolicyDeckCreator): PolicyDeckState {
  return {
    drawingPile: createPolicyDeck(),
    discardPile: [],
    nLiberalsPlayed: 0,
    nFascistsPlayed: 0,
  };
}

interface CreatePolicyDeckSliceOptions {
  shuffle: PolicyDeckShuffler;
  createPolicyDeck: PolicyDeckCreator;
}

export default function createPolicyDeckSlice({
  shuffle,
  createPolicyDeck,
}: CreatePolicyDeckSliceOptions) {
  return createSlice({
    name: "policydeck",
    initialState: getInitialState(createPolicyDeck),
    reducers: {
      discardPolicy(state, { payload }: PayloadAction<number>) {
        state.discardPile.push(state.drawingPile[payload]);
        state.drawingPile.splice(payload, 1);
      },
      playPolicy(state) {
        const cardToPlay = state.drawingPile[0];
        if (cardToPlay === "liberal") {
          state.nLiberalsPlayed += 1;
        } else {
          state.nFascistsPlayed += 1;
        }
        state.drawingPile.splice(0, 1);
        if (state.drawingPile.length < 3) {
          state.drawingPile = shuffle([
            ...state.drawingPile,
            ...state.discardPile,
          ]);
          state.discardPile = [];
        }
      },
    },
  });
}
