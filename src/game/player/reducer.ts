import { createReducer } from "@reduxjs/toolkit";
import { startGame } from "../actions";
import { Player } from "./index";
import { assignRoles } from "./roleAssignment";

export interface PlayersState {
  players: Player[];
  activePlayerId: number | null;
}

function getInitialState(): PlayersState {
  return {
    players: [
      {
        name: "John",
        role: null,
      },
      {
        name: "Martha",
        role: null,
      },
      {
        name: "Bob",
        role: null,
      },
      {
        name: "Alice",
        role: null,
      },
      {
        name: "Mohammed",
        role: null,
      },
    ],
    activePlayerId: null,
  };
}

export default createReducer(getInitialState(), (builder) => {
  builder.addCase(startGame, (state) => {
    state.players = assignRoles(state.players);
  });
});
