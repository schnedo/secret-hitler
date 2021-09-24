import type { ReactElement } from "react";
import type PolicyDeck from "../PolicyDeck";

export interface PolicyCardFieldsProps {
  drawingPile: PolicyDeck;
  discardPile: PolicyDeck;
  nLiberalsPlayed: number;
  nFascistsPlayed: number;
}

export default function PolicyCardFields({
  drawingPile,
  discardPile,
  nLiberalsPlayed,
  nFascistsPlayed,
}: PolicyCardFieldsProps): ReactElement {
  return (
    <div>
      <div>size draw pile: {drawingPile.length}</div>
      <div>size discard pile: {discardPile.length}</div>
      <div>liberal policies enacted: {nLiberalsPlayed}</div>
      <div>fascist policies enacted: {nFascistsPlayed}</div>
    </div>
  );
}
