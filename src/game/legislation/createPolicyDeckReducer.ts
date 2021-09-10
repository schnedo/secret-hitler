import {
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload,
  createReducer,
} from "@reduxjs/toolkit";
import PolicyDeck from "./PolicyDeck";
import { PolicyDeckShuffler } from "./PolicyDeckShuffler";

export interface PolicyDeckReducer {
  drawingPile: PolicyDeck;
  discardPile: PolicyDeck;
  nLiberalsPlayed: number;
  nFascistsPlayed: number;
}

export interface PolicyDeckCreator {
  (): PolicyDeck;
}

function getInitialState(
  createPolicyDeck: PolicyDeckCreator,
): PolicyDeckReducer {
  return {
    drawingPile: createPolicyDeck(),
    discardPile: [],
    nLiberalsPlayed: 0,
    nFascistsPlayed: 0,
  };
}
export interface CreatePolicyDeckReducerOptions {
  shuffle: PolicyDeckShuffler;
  createPolicyDeck: PolicyDeckCreator;
  discardPolicyActionCreator: ActionCreatorWithPayload<number, string>;
  playPolicyActionCreator: ActionCreatorWithoutPayload<"policy/play">;
}

export default function createPolicyDeckReducer({
  shuffle,
  createPolicyDeck,
  discardPolicyActionCreator,
  playPolicyActionCreator,
}: CreatePolicyDeckReducerOptions) {
  return createReducer(getInitialState(createPolicyDeck), (builder) => {
    builder
      .addCase(discardPolicyActionCreator, (state, { payload }) => {
        state.discardPile.push(state.drawingPile[payload]);
        state.drawingPile.splice(payload, 1);
      })
      .addCase(playPolicyActionCreator, (state) => {
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
      });
  });
}
