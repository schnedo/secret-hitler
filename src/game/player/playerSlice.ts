import { createSlice } from "@reduxjs/toolkit";
import getInitialState from "./initialState";
import { assignRoles as assignRolesToPlayers } from "./roleAssignment";

const slice = createSlice({
  name: "players",
  initialState: getInitialState(),
  reducers: {
    assignRoles: assignRolesToPlayers,
  },
});

export const { assignRoles } = slice.actions;
export const gameReducer = slice.reducer;
