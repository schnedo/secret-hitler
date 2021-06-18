import { ReactElement } from "react";
import { useSelector } from "react-redux";
import { RootState } from "./store";

export default function PolicyCardFields(): ReactElement {
  const policyDeck = useSelector((state: RootState) => state.policyDeck);
  return (
    <div>
      <div>size draw pile: {policyDeck.drawingPile.length}</div>
      <div>size discard pile: {policyDeck.discardPile.length}</div>
      <div>liberal policies enacted: {policyDeck.nLiberalsPlayed}</div>
      <div>fascist policies enacted: {policyDeck.nFascistsPlayed}</div>
    </div>
  );
}
