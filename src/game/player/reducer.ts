import { createReducer } from "@reduxjs/toolkit";
import { startGame } from "../actions";
import chooseFirstPresident from "./chooseFirstPresident";
import { Player } from "./index";
import { assignRoles } from "./roleAssignment";

export type PlayerId = number;
export interface PlayersState {
  players: Player[];
  presidentId: PlayerId | null;
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
    presidentId: null,
  };
}

export default createReducer(getInitialState(), (builder) => {
  builder.addCase(startGame, (state) => {
    state.players = assignRoles(state.players);
    state.presidentId = chooseFirstPresident(state.players);
  });
});
