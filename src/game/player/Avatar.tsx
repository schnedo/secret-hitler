import { FunctionComponent } from "react";
import { Player } from "./Player";

export interface AvatarProps {
  player: Player;
}

const Avatar: FunctionComponent<AvatarProps> = ({ player }) => {
  return <div>{player.toString()}</div>;
};

export default Avatar;
