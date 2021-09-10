import type PolicyDeck from "./PolicyDeck";
import type { PolicyDeckShuffler } from "./PolicyDeckShuffler";

const nLiberalPolicies = 6;
const nFascistPolicies = 11;

export default function createPolicyDeckCreator(
  shuffle: PolicyDeckShuffler,
): () => PolicyDeck {
  return () => {
    let stack: PolicyDeck = [];
    for (let i = 0; i < nLiberalPolicies; i++) {
      stack.push("liberal");
    }
    for (let i = 0; i < nFascistPolicies; i++) {
      stack.push("fascist");
    }
    return shuffle(stack);
  };
}
