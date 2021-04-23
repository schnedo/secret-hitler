import { Player } from "./player/Player";
import { Fascist, Hitler, Liberal } from "./roles";

// https://stackoverflow.com/a/12646864
function shuffleArray<T extends object>(array: T[]): void {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

export class Game {
  readonly players: Player[];

  constructor(players: Player[]) {
    this.players = players;
    const rolesBag = [
      new Hitler(),
      new Fascist(),
      new Liberal(),
      new Liberal(),
      new Liberal(),
    ];
    shuffleArray(rolesBag);
    for (const player of players) {
      const maybeRole = rolesBag.pop();
      if (maybeRole === undefined) {
        throw Error("Assigning Roles Failed");
      }
      player.role = maybeRole;
    }
  }
}
