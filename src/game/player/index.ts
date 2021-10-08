import { shuffleArray } from "../../utils";
import createRoleAssigner from "./createRoleAssigner";
import createRolesBagCreator from "./createRolesBagCreator";

export const assignRoles = createRoleAssigner(
  createRolesBagCreator(shuffleArray),
);
export type { default as Role } from "./Role";
export { Avatar } from "./components";
export type { default as Player, PlayerId } from "./Player";
