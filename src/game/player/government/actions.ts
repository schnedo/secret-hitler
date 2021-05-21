import { createAction } from "@reduxjs/toolkit";
import Government from "./Government";

export const nominateChancellor = createAction<Government>(
  "government/nominateChancellor",
);
