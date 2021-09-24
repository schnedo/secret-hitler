import { shuffleArray } from "../../utils";
import createRoleAssigner from "./createRoleAssigner";
import createRolesBagCreator from "./createRolesBagCreator";

export const assignRoles = createRoleAssigner(
  createRolesBagCreator(shuffleArray),
);
export type { default as Role } from "./Role";
export { default as Avatar } from "./Avatar";
export type { default as Player, PlayerId } from "./Player";
