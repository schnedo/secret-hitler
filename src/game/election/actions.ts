import { createAction } from "@reduxjs/toolkit";
import type { PlayerId } from "../player";
import Vote from "./Vote";

export const vote = createAction<Vote>("game/vote");
export const nominateChancellor = createAction<PlayerId>(
  "game/nominateChancellor",
);
export const acceptElection = createAction("game/acceptElection");
export const declineElection = createAction("game/declineElection");
