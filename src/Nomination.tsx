import { ReactElement } from "react";
import { Modal } from "./components";
import { Avatar, Player } from "./game";

export interface NominationProps {
  electablePlayers: Player[];
  onElected: (player: Player) => void;
}

export default function Nomination({
  electablePlayers,
}: NominationProps): ReactElement {
  return (
    <Modal open>
      {electablePlayers.map((player) => (
        <Avatar player={player} />
      ))}
    </Modal>
  );
}
