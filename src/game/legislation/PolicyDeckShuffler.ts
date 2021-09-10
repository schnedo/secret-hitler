import type PolicyDeck from "./PolicyDeck";

export interface PolicyDeckShuffler {
  (policyDeck: PolicyDeck): PolicyDeck;
}
