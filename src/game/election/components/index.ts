import { Modal } from "../../../components";
import createElectionEvaluation from "./createElectionEvaluation";

export { default as ChancellorNomination } from "./ChancellorNomination";
export { default as FailedElectionCounter } from "./FailedElectionCounter";
export { default as Voting } from "./Voting";
export type { VotingProps } from "./Voting";

export const ElectionEvaluation = createElectionEvaluation(Modal);
