import { Role } from "../roles";

export interface Player {
  readonly name: string;
  role: Role | null;
}
