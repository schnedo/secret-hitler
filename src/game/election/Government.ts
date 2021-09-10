import type { PlayerId } from "../player";

export default interface Government {
  president: PlayerId;
  chancellor: PlayerId;
}
