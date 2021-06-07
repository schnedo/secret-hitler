import { configureStore } from "@reduxjs/toolkit";
import { gameReducer } from "./game";

const store = configureStore({
  reducer: {
    gameState: gameReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
