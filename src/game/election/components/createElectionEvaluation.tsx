import type { ComponentType, ReactElement } from "react";
import type { ModalProps } from "../../../components";
import type PlayerVotes from "../../PlayerVotes";
import type Phase from "../../Phase";
import type { Player } from "../../player";

export interface ElectionEvaluationProps {
  onElectionAccepted: () => void;
  onElectionDeclined: () => void;
  phase: Phase;
  playerVotes: PlayerVotes;
  players: Player[];
}

export default function createElectionEvaluation(
  Modal: ComponentType<ModalProps>,
) {
  return function ElectionEvaluation({
    onElectionAccepted,
    onElectionDeclined,
    phase,
    playerVotes,
    players,
  }: ElectionEvaluationProps): ReactElement {
    if (phase !== "electionEvaluation") {
      return <></>;
    }
    const electionAccepted =
      Object.values(playerVotes).filter(Boolean).length > players.length / 2;
    const continueAction = electionAccepted
      ? onElectionAccepted
      : onElectionDeclined;

    return (
      <Modal open>
        <div>Election {electionAccepted ? "" : "not"} accepted</div>
        {Object.entries(playerVotes).map(([playerId, accepted]) => (
          <div key={playerId}>
            {players[parseInt(playerId)].name}: {accepted ? "Yes" : "No"}
          </div>
        ))}
        <button onClick={continueAction}>continue</button>
      </Modal>
    );
  };
}
