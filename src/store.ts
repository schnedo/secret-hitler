import { configureStore } from "@reduxjs/toolkit";
import gameSlice from "./game/gameSlice";

export default configureStore({
  reducer: {
    game: gameSlice,
  },
});
