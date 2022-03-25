import { shuffleArray } from "../../utils";
import createPlayersSlice from "./createPlayersSlice";
import createRoleAssigner from "./createRoleAssigner";
import createRolesBagCreator from "./createRolesBagCreator";

const assignRoles = createRoleAssigner(createRolesBagCreator(shuffleArray));
const playersSlice = createPlayersSlice({ assignRoles });
export const players = playersSlice.reducer;

export type { default as Role } from "./Role";
export { Avatar } from "./components";
export type { default as Player, PlayerId } from "./Player";
