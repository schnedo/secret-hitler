import type { ReactElement } from "react";
import type { ElectionRound } from "..";

export interface FailedElectionCounterProps {
  electionCounter: ElectionRound;
}

export default function FailedElectionCounter({
  electionCounter,
}: FailedElectionCounterProps): ReactElement {
  return <div>electionRound {electionCounter}/3</div>;
}
