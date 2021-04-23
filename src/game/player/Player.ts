import { Role } from "../roles";

export class Player {
  readonly name: string;
  #role: Role | null;

  constructor(name: string) {
    this.name = name;
    this.#role = null;
  }

  set role(role: Role) {
    this.#role = role;
  }

  toString() {
    return `${this.name}: ${this.#role?.constructor}`;
  }
}
