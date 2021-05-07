import Role from "./Role";

export default interface Player {
  readonly name: string;
  role: Role | null;
}
