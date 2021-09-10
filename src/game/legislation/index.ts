import { shuffleArray } from "../../utils";
import { discardPolicy, playPolicy } from "./actions";
import createPolicyDeck from "./createPolicyDeck";
import createPolicyDeckReducer from "./createPolicyDeckReducer";

export * from "./actions";
export * from "./components";
export type { default as Policy } from "./Policy";

export const policyDeckReducer = createPolicyDeckReducer({
  shuffle: shuffleArray,
  createPolicyDeck: createPolicyDeck,
  discardPolicyActionCreator: discardPolicy,
  playPolicyActionCreator: playPolicy,
});
