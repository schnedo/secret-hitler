import { ReactElement } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Modal } from "../../../components";
import { RootState } from "../../../store";
import { Avatar, PlayerId } from "../../player";
import Government from "../Government";

const NominationRow = styled.div`
  display: flex;
`;

export interface ChancellorNominationProps {
  onNomination: (playerId: PlayerId) => void;
  nominationValidator: (
    numPlayers: number,
    lastGovernment: Government | null,
    nomination: Government,
  ) => boolean;
}

export default function ChancellorNomination({
  onNomination,
  nominationValidator,
}: ChancellorNominationProps): ReactElement {
  const { phase, players, presidentialCandidate, government } = useSelector(
    (state: RootState) => state.gameState,
  );

  const electablePlayers =
    presidentialCandidate === null
      ? []
      : players.filter((player, id) =>
          nominationValidator(players.length, government, {
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
              onNomination(players.findIndex((pl) => pl === player))
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
