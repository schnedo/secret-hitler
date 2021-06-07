import { createAction } from "@reduxjs/toolkit";
import { PlayerId } from "../Player";

export const nominateChancellor = createAction<PlayerId>(
  "government/nominateChancellor",
);
