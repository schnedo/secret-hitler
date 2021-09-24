import type Player from "./Player";
import type { RolesBag } from "./createRolesBagCreator";

export interface RolesBagCreator {
  (nPlayers: number): RolesBag;
}

export default function createRoleAssigner(
  createRolesBag: RolesBagCreator,
): (players: Player[]) => Player[] {
  return (players) => {
    const shuffledBag = createRolesBag(players.length);
    for (const player of players) {
      const maybeRole = shuffledBag.pop();
      if (maybeRole === undefined) {
        throw Error("Assigning Roles Failed");
      }
      player.role = maybeRole;
    }
    return players;
  };
}
