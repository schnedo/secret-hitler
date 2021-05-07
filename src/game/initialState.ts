import { Player } from "./player";

export interface GameState {
  players: Player[];
}

export default function getInitialState(): GameState {
  return {
    players: [
      {
        name: "John",
        role: null,
      },
      {
        name: "Martha",
        role: null,
      },
      {
        name: "Bob",
        role: null,
      },
      {
        name: "Alice",
        role: null,
      },
      {
        name: "Mohammed",
        role: null,
      },
    ] as Player[],
  };
}
