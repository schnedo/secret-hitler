import createElectionSlice from "./createElectionSlice";
import isValidNomination from "./isValidNomination";
import nextPresidentialCandidate from "./nextPresidentialCandidate";

const electionSlice = createElectionSlice({
  isValidNomination,
  nextPresidentialCandidate,
});
export const election = electionSlice.reducer;
export const { vote, declineElection, acceptElection, nominateChancellor } =
  electionSlice.actions;

export { default as isValidNomination } from "./isValidNomination";
export type { default as Government } from "./Government";
export type { default as Vote } from "./Vote";
export type { default as ElectionRound } from "./ElectionRound";
export type { default as PlayerVotes } from "./PlayerVotes";
export * from "./components";
