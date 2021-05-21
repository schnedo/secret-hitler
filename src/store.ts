import { configureStore } from "@reduxjs/toolkit";
import { gameReducer, playersReducer } from "./game";

const store = configureStore({
  reducer: {
    gameState: gameReducer,
    playersState: playersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
