import type { ComponentType, ReactElement } from "react";
import { useSelector } from "react-redux";
import type { ModalProps } from "../../../components/Modal";
import type { RootState } from "../../../store";

export interface ElectionEvaluationProps {
  onElectionAccepted: () => void;
  onElectionDeclined: () => void;
}

export default function createElectionEvaluation(
  Modal: ComponentType<ModalProps>,
) {
  return function ElectionEvaluation({
    onElectionAccepted,
    onElectionDeclined,
  }: ElectionEvaluationProps): ReactElement {
    const { phase, playerVotes, players } = useSelector(
      (state: RootState) => state.gameState,
    );

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
