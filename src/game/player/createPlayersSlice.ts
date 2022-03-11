import { createSlice } from "@reduxjs/toolkit";
import { startGame } from "../actions";
import type Player from "./Player";

const playerNames = ["John", "Martha", "Bob", "Alice", "Mohammed"];

type PlayersState = Record<Player["id"], Player>;

const initialState: PlayersState = Object.fromEntries(
  playerNames.map((name, id) => [
    id,
    {
      id,
      name,
      role: null,
      title: null,
    },
  ]),
);

interface RolesAssigner {
  (players: Player[]): Player[];
}

interface CreatePlayersSliceOptions {
  assignRoles: RolesAssigner;
}

export default function createPlayersSlice({
  assignRoles,
}: CreatePlayersSliceOptions) {
  return createSlice({
    name: "players",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(startGame, (state) => {
        const players = Object.values(state);
        const playersWithRoles = assignRoles(players);
        const playersWithRolesById = playersWithRoles.map((player) => [
          player.id,
          player,
        ]);
        state = Object.fromEntries(playersWithRolesById);
      });
    },
  });
}
