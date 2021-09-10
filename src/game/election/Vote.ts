import type { PlayerId } from "../player";

export default interface Vote {
  playerId: PlayerId;
  agreed: boolean;
}
