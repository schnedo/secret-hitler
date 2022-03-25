import { Modal } from "../../../components";
import { Avatar } from "../../player";
import createChancellorNomination, {
  connectNominationValidator,
} from "./createChancellorNomination";
import createElectionEvaluation from "./createElectionEvaluation";

export { default as FailedElectionCounter } from "./FailedElectionCounter";
export { default as Voting } from "./Voting";
export type { VotingProps } from "./Voting";

export const ElectionEvaluation = createElectionEvaluation(Modal);
export const ChancellorNomination = connectNominationValidator(
  createChancellorNomination(Modal, Avatar),
);
