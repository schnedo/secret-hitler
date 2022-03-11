import { ActionCreatorWithoutPayload, createReducer } from "@reduxjs/toolkit";
import type { ElectionRound, Government, PlayerVotes } from "./election";
import type Phase from "./Phase";
import type { Player, PlayerId } from "./player";

export interface GameState {
  phase: Phase | null;
  government: Government | null;
  nominatedGovernment: Government | null;
  presidentialCandidate: PlayerId | null;
  playerVotes: PlayerVotes;
  electionRound: ElectionRound;
}

function getInitialState(): GameState {
  return {
    phase: null,
    government: null,
    nominatedGovernment: null,
    presidentialCandidate: null,
    playerVotes: {},
    electionRound: 0,
  };
}

export interface NominationValidator {
  (
    numPlayers: number,
    lastGovernment: Government | null,
    nomination: Government,
  ): boolean;
}

export interface NextPresidentialCandidateSelector {
  (currentCandidate: PlayerId | null, players: Player[]): PlayerId;
}

export interface RolesAssigner {
  (players: Player[]): Player[];
}

export interface CreateGameReducerOptions {
  startGame: ActionCreatorWithoutPayload;
}

export default function createGameReducer({
  startGame,
}: CreateGameReducerOptions) {
  return createReducer(getInitialState(), (builder) => {
    builder.addCase(startGame, (state) => {
      state.phase = "nominate";
      // Fixme: move into election feature slice
      // state.presidentialCandidate = nextPresidentialCandidate(
      //   state.presidentialCandidate,
      //   state.players,
      // );
    });
  });
}
