import { createReducer } from "@reduxjs/toolkit";
import { startGame } from "./actions";

export interface GameState {
  isStarted: boolean;
}

function getInitialState(): GameState {
  return {
    isStarted: false,
  };
}

export default createReducer(getInitialState(), (builder) => {
  builder.addCase(startGame, (state) => {
    state.isStarted = true;
  });
});
