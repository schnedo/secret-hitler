import { configureStore } from "@reduxjs/toolkit";
import { playerReducer } from "./game";

const store = configureStore({
  reducer: {
    players: playerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
