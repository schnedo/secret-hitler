import { configureStore } from "@reduxjs/toolkit";
import { gameReducer, policyDeckReducer } from "./game";

const store = configureStore({
  reducer: {
    gameState: gameReducer,
    policyDeck: policyDeckReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
