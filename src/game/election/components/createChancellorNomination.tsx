import type { ComponentType, ReactElement } from "react";
import styled from "styled-components";
import type { ModalProps } from "../../../components";
import type { Player, PlayerId } from "../../player";
import type { AvatarProps } from "../../player/components";
import type Government from "../Government";

const NominationRow = styled.div`
  display: flex;
`;

export interface NominationValidator {
  (
    numPlayers: number,
    lastGovernment: Government | null,
    nomination: Government,
  ): boolean;
}

export interface ChancellorNominationProps {
  onNomination: (playerId: PlayerId) => void;
  nominationValidator: NominationValidator;
  players: Player[];
  presidentialCandidate: number | null;
  government: Government | null;
}

export default function createChancellorNomination(
  Modal: ComponentType<ModalProps>,
  Avatar: ComponentType<AvatarProps>,
) {
  return function ChancellorNomination({
    onNomination,
    nominationValidator,
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
      <Modal open>
        <div>Please nominate your chancellor candidate.</div>
        {electablePlayers.map((player) => (
          <NominationRow>
            <button
              onClick={() =>
                onNomination(players.findIndex((pl) => pl === player))
              }
            >
              Nominate {player.name}
            </button>
            <Avatar player={player} />
          </NominationRow>
        ))}
      </Modal>
    );
  };
}
