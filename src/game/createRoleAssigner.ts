import { GameState } from "./initialState";
import { Role } from "./player";

export interface RolesShuffler {
  (array: Role[]): Role[];
}

export default function createRoleAssigner(
  shuffle: RolesShuffler,
): (gameState: GameState) => GameState {
  return (state) => {
    const rolesBag: Role[] = [
      "hitler",
      "fascist",
      "liberal",
      "liberal",
      "liberal",
    ];
    shuffle(rolesBag);
    for (const player of state.players) {
      const maybeRole = rolesBag.pop();
      if (maybeRole === undefined) {
        throw Error("Assigning Roles Failed");
      }
      player.role = maybeRole;
    }
    return state;
  };
}
