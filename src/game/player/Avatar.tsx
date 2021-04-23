import { ReactElement } from "react";
import { Player } from "./Player";

export interface AvatarProps {
  player: Player;
}

export default function Avatar({ player }: AvatarProps): ReactElement {
  return (
    <div>
      {player.name}: {player.role}
    </div>
  );
}
