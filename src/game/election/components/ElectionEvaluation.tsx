import { ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "../../../components";
import { acceptElection, declineElection } from "../actions";
import { RootState } from "../../../store";

export default function ElectionEvaluation(): ReactElement {
  const { phase, playerVotes, players } = useSelector(
    (state: RootState) => state.gameState,
  );
  const dispatch = useDispatch();

  if (phase !== "electionEvaluation") {
    return <></>;
  }
  const electionAccepted =
    Object.values(playerVotes).filter(Boolean).length > players.length / 2;
  const continueAction = () =>
    dispatch(electionAccepted ? acceptElection() : declineElection());

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
}
