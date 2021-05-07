import { Role } from "../index";

export type RolesBag = Role[];

export interface RolesShuffler {
  (array: RolesBag): RolesBag;
}

const fullRolesBag: RolesBag = [
  "hitler",
  "fascist",
  "liberal",
  "liberal",
  "liberal",
  "liberal",
  "fascist",
  "liberal",
  "fascist",
  "liberal",
];

export function getUnshuffledRolesBag(nPlayers: number): RolesBag {
  return fullRolesBag.slice(0, nPlayers);
}

export default function createRolesBagCreator(
  shuffle: RolesShuffler,
): (nPlayers: number) => RolesBag {
  return (nPlayers) => shuffle(getUnshuffledRolesBag(nPlayers));
}
