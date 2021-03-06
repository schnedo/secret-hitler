import type Role from "./Role";

export type PlayerId = number;

export default interface Player {
  readonly name: string;
  role: Role | null;
  title: "president" | "chancellor" | null;
}
