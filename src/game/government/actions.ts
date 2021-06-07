import { createAction } from "@reduxjs/toolkit";
import { PlayerId } from "../player";

export const nominateChancellor = createAction<PlayerId>(
  "government/nominateChancellor",
);
