import Role from "./roleAssignment/Role";

export default interface Player {
  readonly name: string;
  role: Role | null;
  title: "president" | "chancellor" | null;
  isElectable: boolean;
}
