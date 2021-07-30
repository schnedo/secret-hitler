import { PlayerId } from "../player";

export default interface Vote {
  playerId: PlayerId;
  agreed: boolean;
}
