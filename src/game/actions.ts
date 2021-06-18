import { createAction } from "@reduxjs/toolkit";
import { Vote } from "./government";
import { PlayerId } from "./player";

export const startGame = createAction("game/start");
export const nominateChancellor = createAction<PlayerId>(
  "game/nominateChancellor",
);
export const vote = createAction<Vote>("game/vote");
export const acceptElection = createAction("game/acceptElection");
export const declineElection = createAction("game/declineElection");
