import { configureStore } from "@reduxjs/toolkit";
import { gameReducer, players, policyDeckReducer } from "./game";

const store = configureStore({
  reducer: {
    gameState: gameReducer,
    policyDeck: policyDeckReducer,
    players,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
