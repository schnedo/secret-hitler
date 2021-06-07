import { ReactElement } from "react";
import styled from "styled-components";
import { Modal } from "./components";
import { Avatar, Player } from "./game";

const NominationRow = styled.div`
  display: flex;
`;

export interface ChancellorNominationProps {
  electablePlayers: Player[];
  onNominated: (player: Player) => void;
}

export default function ChancellorNomination({
  electablePlayers,
  onNominated,
}: ChancellorNominationProps): ReactElement {
  return (
    <Modal open>
      <div>Please nominate your chancellor candidate.</div>
      {electablePlayers.map((player) => (
        <NominationRow>
          <button onClick={() => onNominated(player)}>Nominate</button>
          <Avatar player={player} />
        </NominationRow>
      ))}
    </Modal>
  );
}
