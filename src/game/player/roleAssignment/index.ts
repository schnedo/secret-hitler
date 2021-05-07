import createRoleAssigner from "./createRoleAssigner";
import createRolesBagCreator from "./createRolesBagCreator";
import { shuffleArray } from "./shuffleArray";

export const assignRoles = createRoleAssigner(
  createRolesBagCreator(shuffleArray),
);
