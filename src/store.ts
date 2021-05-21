import { configureStore } from "@reduxjs/toolkit";
import { playersReducer } from "./game";

const store = configureStore({
  reducer: {
    playersState: playersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
