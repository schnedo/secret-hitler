import { configureStore } from "@reduxjs/toolkit";
import { gameReducer, players, policyDeck } from "./game";

const store = configureStore({
  reducer: {
    gameState: gameReducer,
    policyDeck,
    players,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
