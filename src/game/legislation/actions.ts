import { createAction } from "@reduxjs/toolkit";

export const discardPolicy = createAction<number>("policy/draw");
export const playPolicy = createAction("policy/play");
