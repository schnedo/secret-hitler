import { ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Modal } from "./components";
import { Avatar, isValidNomination, nominateChancellor } from "./game";
import { RootState } from "./store";

const NominationRow = styled.div`
  display: flex;
`;

export default function ChancellorNomination(): ReactElement {
  const { phase, players, presidentialCandidate, government } = useSelector(
    (state: RootState) => state.gameState,
  );
  const dispatch = useDispatch();

  const electablePlayers =
    presidentialCandidate === null
      ? []
      : players.filter((player, id) =>
          isValidNomination(players.length, government, {
            president: presidentialCandidate,
            chancellor: id,
          }),
        );

  return (
    <Modal open={phase === "nominate"}>
      <div>Please nominate your chancellor candidate.</div>
      {electablePlayers.map((player) => (
        <NominationRow>
          <button
            onClick={() =>
              dispatch(
                nominateChancellor(players.findIndex((pl) => pl === player)),
              )
            }
          >
            Nominate
          </button>
          <Avatar player={player} />
        </NominationRow>
      ))}
    </Modal>
  );
}
