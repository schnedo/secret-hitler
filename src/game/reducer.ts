import { createReducer } from "@reduxjs/toolkit";
import {
  acceptElection,
  declineElection,
  nominateChancellor,
  startGame,
  vote,
} from "./actions";
import {
  ElectionRound,
  Government,
  isValidNomination,
  nextPresidentialCandidate,
} from "./election";
import { discardPolicy, playPolicy } from "./legislation";
import { assignRoles, Player, PlayerId } from "./player";

export type Phase =
  | "nominate"
  | "vote"
  | "electionEvaluation"
  | "presidentSelectsPolicies"
  | "chancellorSelectsPolicies"
  | "executiveAction";

export type PlayerVotes = Record<PlayerId, boolean>;

export interface GameState {
  phase: Phase | null;
  players: Player[];
  government: Government | null;
  nominatedGovernment: Government | null;
  presidentialCandidate: PlayerId | null;
  playerVotes: PlayerVotes;
  electionRound: ElectionRound;
}

const playerNames = ["John", "Martha", "Bob", "Alice", "Mohammed"];

function getInitialState(): GameState {
  return {
    phase: null,
    players: playerNames.map((name) => ({
      name,
      role: null,
      title: null,
    })),
    government: null,
    nominatedGovernment: null,
    presidentialCandidate: null,
    playerVotes: {},
    electionRound: 0,
  };
}

export default createReducer(getInitialState(), (builder) => {
  builder
    .addCase(startGame, (state) => {
      state.phase = "nominate";
      state.players = assignRoles(state.players);
      state.presidentialCandidate = nextPresidentialCandidate(
        state.presidentialCandidate,
        state.players,
      );
    })
    .addCase(nominateChancellor, (state, { payload: nominatedPlayer }) => {
      if (state.presidentialCandidate === null) {
        // this should never happen as chancellor nomination should always only be possible when presidential candidate is chosen
        throw Error(
          `cannot nominate chancellor without presidential candidate`,
        );
      }
      if (
        isValidNomination(state.players.length, state.government, {
          chancellor: nominatedPlayer,
          president: state.presidentialCandidate,
        })
      ) {
        state.nominatedGovernment = {
          president: state.presidentialCandidate,
          chancellor: nominatedPlayer,
        };
        state.phase = "vote";
      } else {
        throw Error(`Election of ${nominatedPlayer} is not valid`);
      }
    })
    .addCase(vote, (state, { payload: { agreed, playerId } }) => {
      if (state.playerVotes[playerId]) {
        throw Error(`player ${playerId} already voted`);
      }
      state.playerVotes[playerId] = agreed;
      if (Object.keys(state.playerVotes).length === state.players.length) {
        state.phase = "electionEvaluation";
      }
    })
    .addCase(acceptElection, (state) => {
      state.electionRound = 0;
      state.playerVotes = {};
      state.government = state.nominatedGovernment;
      state.nominatedGovernment = null;
      state.phase = "presidentSelectsPolicies";
    })
    .addCase(declineElection, (state) => {
      if (state.electionRound === 3) {
        throw Error("failed election NYI");
      }
      if (state.presidentialCandidate === null) {
        // this should never happen as chancellor nomination should always only be possible when presidential candidate is chosen
        throw Error(
          `cannot nominate chancellor without presidential candidate`,
        );
      }

      state.electionRound += 1;
      state.playerVotes = {};
      state.nominatedGovernment = null;
      state.presidentialCandidate = nextPresidentialCandidate(
        state.presidentialCandidate,
        state.players,
      );
      state.phase = "nominate";
    })
    .addCase(discardPolicy, (state) => {
      if (state.phase === "presidentSelectsPolicies") {
        state.phase = "chancellorSelectsPolicies";
      }
    })
    .addCase(playPolicy, (state) => {
      state.phase = "executiveAction";
    });
});
