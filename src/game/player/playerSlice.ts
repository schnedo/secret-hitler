import { createSlice } from "@reduxjs/toolkit";
import { Player } from "./index";
import { assignRoles as assignRolesToPlayers } from "./roleAssignment";

export type PlayersState = Player[];
function getInitialState(): PlayersState {
  return [
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
  ];
}
const slice = createSlice({
  name: "players",
  initialState: getInitialState(),
  reducers: {
    assignRoles: assignRolesToPlayers,
  },
});

export const { assignRoles } = slice.actions;
export const playerReducer = slice.reducer;
