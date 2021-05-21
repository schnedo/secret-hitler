import { createReducer } from "@reduxjs/toolkit";
import { startGame } from "../actions";
import { Government, nominateChancellor } from "./government";
import isValidNomination from "./government/isValidNomination";
import { Player } from "./index";
import nextPresidentialCandidadate from "./nextPresidentialCandidadate";
import { assignRoles } from "./roleAssignment";

export type PlayerId = number;

export interface PlayersState {
  players: Player[];
  government: Government | null;
  presidentialCandidate: PlayerId | null;
}

const playerNames = ["John", "Martha", "Bob", "Alice", "Mohammed"];

function getInitialState(): PlayersState {
  return {
    players: playerNames.map((name) => ({
      name,
      role: null,
      title: null,
      isElectable: true,
    })),
    government: null,
    presidentialCandidate: null,
  };
}

export default createReducer(getInitialState(), (builder) => {
  builder
    .addCase(startGame, (state) => {
      state.players = assignRoles(state.players);
      state.presidentialCandidate = nextPresidentialCandidadate(
        state.presidentialCandidate,
        state.players,
      );
      state.players[state.presidentialCandidate].isElectable = false;
    })
    .addCase(nominateChancellor, (state, { payload: nomination }) => {
      if (
        isValidNomination(state.players.length, state.government, nomination)
      ) {
        if (state.government) {
          state.players[state.government.president].title = null;
          state.players[state.government.chancellor].title = null;
        }
        state.government = nomination;
        state.players[nomination.chancellor].title = "chancellor";
        state.players[nomination.president].title = "president";
      }
    });
});
