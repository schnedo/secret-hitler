import { shuffleArray } from "../../utils";
import PolicyDeck from "./PolicyDeck";

const nLiberalPolicies = 6;
const nFascistPolicies = 11;

export default function createPolicyDeck(): PolicyDeck {
  let stack: PolicyDeck = [];
  for (let i = 0; i < nLiberalPolicies; i++) {
    stack.push("liberal");
  }
  for (let i = 0; i < nFascistPolicies; i++) {
    stack.push("fascist");
  }
  return shuffleArray(stack);
}
