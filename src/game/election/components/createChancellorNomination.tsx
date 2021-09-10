import type { ComponentType, ReactElement } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import type { ModalProps } from "../../../components/Modal";
import type { RootState } from "../../../store";
import type { Player, PlayerId } from "../../player";
import type Government from "../Government";

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
  avatarComponent: (player: Player) => ReactElement;
}

export default function createChancellorNomination(
  Modal: ComponentType<ModalProps>,
) {
  return function ChancellorNomination({
    onNomination,
    nominationValidator,
    avatarComponent,
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
            {avatarComponent(player)}
          </NominationRow>
        ))}
      </Modal>
    );
  };
}
