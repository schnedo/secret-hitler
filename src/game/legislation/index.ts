import { shuffleArray } from "../../utils";
import createPolicyDeckCreator from "./createPolicyDeckCreator";
import createPolicyDeckSlice from "./createPolicyDeckSlice";

export * from "./components";
export type { default as Policy } from "./Policy";

const policyDeckReducer = createPolicyDeckSlice({
  shuffle: shuffleArray,
  createPolicyDeck: createPolicyDeckCreator(shuffleArray),
});
export const policyDeck = policyDeckReducer.reducer;
export const { playPolicy, discardPolicy } = policyDeckReducer.actions;
