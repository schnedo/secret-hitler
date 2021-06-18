import createRoleAssigner from "./createRoleAssigner";
import createRolesBagCreator from "./createRolesBagCreator";
import { shuffleArray } from "../../../utils";
export type { default as Role } from "./Role";

export const assignRoles = createRoleAssigner(
  createRolesBagCreator(shuffleArray),
);
