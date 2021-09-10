import type { ReactElement } from "react";
import type Player from "./Player";

export interface AvatarProps {
  player: Player;
}

export default function Avatar({ player }: AvatarProps): ReactElement {
  return (
    <div>
      {player.title ? player.title + " " : undefined}
      {player.name}: {player.role}
    </div>
  );
}
