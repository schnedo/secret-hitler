import { ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Modal } from "./components";
import { Avatar, nominateChancellor } from "./game";
import { RootState } from "./store";

const NominationRow = styled.div`
  display: flex;
`;

export default function ChancellorNomination(): ReactElement {
  const { phase, players } = useSelector((state: RootState) => state.gameState);
  const dispatch = useDispatch();

  const electablePlayers = players.filter(({ isElectable }) => isElectable);

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
