import { createSlice } from "@reduxjs/toolkit";
import { Player } from "./player/Player";
import { Role } from "./roles";

// https://stackoverflow.com/a/12646864
function shuffleArray<T>(array: T[]): void {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

const slice = createSlice({
  name: "game",
  initialState: {
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
  },
  reducers: {
    assignRoles: (state) => {
      const rolesBag: Role[] = [
        "hitler",
        "fascist",
        "liberal",
        "liberal",
        "liberal",
      ];
      shuffleArray(rolesBag);
      for (const player of state.players) {
        const maybeRole = rolesBag.pop();
        if (maybeRole === undefined) {
          throw Error("Assigning Roles Failed");
        }
        player.role = maybeRole;
      }
    },
  },
});

export const { assignRoles } = slice.actions;
export default slice.reducer;
