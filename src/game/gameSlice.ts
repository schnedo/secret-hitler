import { createSlice } from "@reduxjs/toolkit";
import createRoleAssigner from "./createRoleAssigner";
import createRolesBagCreator from "./createRolesBagCreator";
import getInitialState from "./initialState";
import { shuffleArray } from "./shuffleArray";

const slice = createSlice({
  name: "game",
  initialState: getInitialState(),
  reducers: {
    assignRoles: createRoleAssigner(createRolesBagCreator(shuffleArray)),
  },
});

export const { assignRoles } = slice.actions;
export const gameReducer = slice.reducer;
