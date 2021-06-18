import { shuffleArray } from "../../utils";
import Policy from "./Policy";

const nLiberalPolicies = 6;
const nFascistPolicies = 11;

export default function createPolicyStack(): Policy[] {
  let stack: Policy[] = [];
  for (let i = 0; i < nLiberalPolicies; i++) {
    stack.push("liberal");
  }
  for (let i = 0; i < nFascistPolicies; i++) {
    stack.push("fascist");
  }
  return shuffleArray(stack);
}
