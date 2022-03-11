import {
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload,
  createReducer,
} from "@reduxjs/toolkit";
import type { ElectionRound, Government, Vote, PlayerVotes } from "./election";
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
  acceptElection: ActionCreatorWithoutPayload;
  declineElection: ActionCreatorWithoutPayload;
  isValidNomination: NominationValidator;
  nextPresidentialCandidate: NextPresidentialCandidateSelector;
  nominateChancellor: ActionCreatorWithPayload<number>;
  vote: ActionCreatorWithPayload<Vote>;
  discardPolicy: ActionCreatorWithPayload<number>;
  playPolicy: ActionCreatorWithoutPayload;
}

export default function createGameReducer({
  startGame,
  nominateChancellor,
  isValidNomination,
  nextPresidentialCandidate,
  vote,
  acceptElection,
  declineElection,
  discardPolicy,
  playPolicy,
}: CreateGameReducerOptions) {
  return createReducer(getInitialState(), (builder) => {
    builder
      .addCase(startGame, (state) => {
        state.phase = "nominate";
        // Fixme: move into election feature slice
        // state.presidentialCandidate = nextPresidentialCandidate(
        //   state.presidentialCandidate,
        //   state.players,
        // );
      })
      .addCase(nominateChancellor, (state, { payload: nominatedPlayer }) => {
        if (state.presidentialCandidate === null) {
          // this should never happen as chancellor nomination should always only be possible when presidential candidate is chosen
          throw Error(
            `cannot nominate chancellor without presidential candidate`,
          );
        }
        // Fixme: move into feature slice
        // if (
        //   isValidNomination(state.players.length, state.government, {
        //     chancellor: nominatedPlayer,
        //     president: state.presidentialCandidate,
        //   })
        // ) {
        //   state.nominatedGovernment = {
        //     president: state.presidentialCandidate,
        //     chancellor: nominatedPlayer,
        //   };
        //   state.phase = "vote";
        // } else {
        //   throw Error(`Election of ${nominatedPlayer} is not valid`);
        // }
      })
      .addCase(vote, (state, { payload: { agreed, playerId } }) => {
        if (state.playerVotes[playerId]) {
          throw Error(`player ${playerId} already voted`);
        }
        state.playerVotes[playerId] = agreed;
        // Fixme: move into feature slice
        // if (Object.keys(state.playerVotes).length === state.players.length) {
        //   state.phase = "electionEvaluation";
        // }
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
        // fixme: move into feature slice
        // state.presidentialCandidate = nextPresidentialCandidate(
        //   state.presidentialCandidate,
        //   state.players,
        // );
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
}
