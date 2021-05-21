import { createReducer } from "@reduxjs/toolkit";
import { startGame } from "./actions";

export type Phase = "nominate";

export interface GameState {
  phase: Phase | null;
}

function getInitialState(): GameState {
  return {
    phase: null,
  };
}

export default createReducer(getInitialState(), (builder) => {
  builder.addCase(startGame, (state) => {
    state.phase = "nominate";
  });
});
