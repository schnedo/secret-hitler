import { startGame } from "./actions";
import createGameReducer from "./createGameReducer";

export * from "./actions";
export {
  acceptElection,
  ChancellorNomination,
  declineElection,
  ElectionEvaluation,
  FailedElectionCounter,
  isValidNomination,
  nominateChancellor,
  vote,
  Voting,
} from "./election";
export type { ElectionRound, Government, VotingProps } from "./election";
export {
  discardPolicy,
  PolicyDiscard,
  playPolicy,
  PolicyCardFields,
  policyDeck,
} from "./legislation";
export type { Policy } from "./legislation";
export type { default as Phase } from "./Phase";
export { Avatar, players } from "./player";
export type { Player } from "./player";

export const gameReducer = createGameReducer({
  startGame,
});
