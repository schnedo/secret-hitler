import { Modal } from "../../../components";
import createChancellorNomination from "./createChancellorNomination";
import createElectionEvaluation from "./createElectionEvaluation";

export { default as FailedElectionCounter } from "./FailedElectionCounter";
export { default as Voting } from "./Voting";
export type { VotingProps } from "./Voting";

export const ElectionEvaluation = createElectionEvaluation(Modal);
export const ChancellorNomination = createChancellorNomination(Modal);
