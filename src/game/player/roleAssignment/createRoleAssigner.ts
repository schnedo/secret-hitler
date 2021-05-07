import { RolesBag } from "./createRolesBagCreator";
import { GameState } from "../initialState";

export interface RolesBagCreator {
  (nPlayers: number): RolesBag;
}

export default function createRoleAssigner(
  createRolesBag: RolesBagCreator,
): (gameState: GameState) => GameState {
  return (state) => {
    const shuffledBag = createRolesBag(state.players.length);
    for (const player of state.players) {
      const maybeRole = shuffledBag.pop();
      if (maybeRole === undefined) {
        throw Error("Assigning Roles Failed");
      }
      player.role = maybeRole;
    }
    return state;
  };
}
