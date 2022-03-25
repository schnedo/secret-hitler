import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Player, PlayerId } from "../player";
import type ElectionRound from "./ElectionRound";
import type Government from "./Government";
import type PlayerVotes from "./PlayerVotes";
import type Vote from "./Vote";

interface ElectionState {
  government: Government | null;
  nominatedGovernment: Government | null;
  presidentialCandidate: PlayerId | null;
  playerVotes: PlayerVotes;
  electionRound: ElectionRound;
}

const initialState: ElectionState = {
  government: null,
  nominatedGovernment: null,
  presidentialCandidate: null,
  playerVotes: {},
  electionRound: 0,
};

interface NominationValidator {
  (
    numPlayers: number,
    lastGovernment: Government | null,
    nomination: Government,
  ): boolean;
}

interface NextPresidentialCandidateSelector {
  (currentCandidate: PlayerId | null, players: Player[]): PlayerId;
}

interface CreateElectionSliceOptions {
  isValidNomination: NominationValidator;
  nextPresidentialCandidate: NextPresidentialCandidateSelector;
}

export default function createElectionSlice({
  isValidNomination,
  nextPresidentialCandidate,
}: CreateElectionSliceOptions) {
  return createSlice({
    name: "election",
    initialState,
    reducers: {
      vote(state, { payload: { agreed, playerId } }: PayloadAction<Vote>) {
        if (state.playerVotes[playerId]) {
          throw Error(`player ${playerId} already voted`);
        }
        state.playerVotes[playerId] = agreed;
        // ToDo: advance to next phase when all players have voted
      },
      nominateChancellor(state, { payload }: PayloadAction<PlayerId>) {
        if (state.presidentialCandidate === null) {
          // this should never happen as chancellor nomination should always only be possible when presidential candidate is chosen
          throw Error(
            `cannot nominate chancellor without presidential candidate`,
          );
        }
        // Fixme: make something like this happen
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
      },
      acceptElection(state) {
        state.electionRound = 0;
        state.playerVotes = {};
        state.government = state.nominatedGovernment;
        state.nominatedGovernment = null;
        // fixme: transition phase
        // state.phase = "presidentSelectsPolicies";
      },
      declineElection(state) {
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
        // fixme: make this happen
        // state.presidentialCandidate = nextPresidentialCandidate(
        //   state.presidentialCandidate,
        //   state.players,
        // );
        // state.phase = "nominate";
      },
    },
  });
}
