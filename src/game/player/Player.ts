import type { Role } from "./roleAssignment";

export type PlayerId = number;

export default interface Player {
  readonly name: string;
  role: Role | null;
  title: "president" | "chancellor" | null;
}
