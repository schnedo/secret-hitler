import { createSlice } from "@reduxjs/toolkit";
import getInitialState from "./initialState";
import createRoleAssigner from "./createRoleAssigner";
import { shuffleArray } from "./shuffleArray";

const slice = createSlice({
  name: "game",
  initialState: getInitialState(),
  reducers: {
    assignRoles: createRoleAssigner(shuffleArray),
  },
});

export const { assignRoles } = slice.actions;
export const gameReducer = slice.reducer;
