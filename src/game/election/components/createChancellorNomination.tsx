import type { ComponentType, ReactElement } from "react";
import styled from "styled-components";
import type { ModalProps } from "../../../components/Modal";
import type Phase from "../../Phase";
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
  phase: Phase | null;
  players: Player[];
  presidentialCandidate: number | null;
  government: Government | null;
}

export default function createChancellorNomination(
  Modal: ComponentType<ModalProps>,
) {
  return function ChancellorNomination({
    onNomination,
    nominationValidator,
    avatarComponent,
    phase,
    players,
    presidentialCandidate,
    government,
  }: ChancellorNominationProps): ReactElement {
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
