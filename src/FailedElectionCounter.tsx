import { ReactElement } from "react";
import { ElectionRound } from "./game";

export interface FailedElectionCounterProps {
  electionCounter: ElectionRound;
}

export default function FailedElectionCounter({
  electionCounter,
}: FailedElectionCounterProps): ReactElement {
  return <div>electionRound {electionCounter}/3</div>;
}
