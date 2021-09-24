import type { ComponentType, ReactElement } from "react";
import type { ModalProps } from "../../../components";
import type { Phase } from "../..";
import type PolicyDeck from "../PolicyDeck";

export interface DiscardPolicyProps {
  onDiscard: (index: number) => void;
  onPlay: () => void;
  phase: Phase | null;
  drawingPile: PolicyDeck;
}

export default function createDiscardPolicy(Modal: ComponentType<ModalProps>) {
  return function DiscardPolicy({
    onDiscard,
    onPlay,
    phase,
    drawingPile,
  }: DiscardPolicyProps): ReactElement {
    if (
      phase !== "presidentSelectsPolicies" &&
      phase !== "chancellorSelectsPolicies"
    ) {
      return <></>;
    }

    const isChancellorDiscard = phase === "chancellorSelectsPolicies";

    const nCardsToDraw = isChancellorDiscard ? 2 : 3;
    const handleClick = (index: number) => {
      onDiscard(index);
      if (isChancellorDiscard) {
        onPlay();
      }
    };

    return (
      <Modal open>
        <div>select a policy to discard</div>
        {drawingPile.slice(0, nCardsToDraw).map((policy, index) => (
          <button key={index} onClick={() => handleClick(index)}>
            {policy}
          </button>
        ))}
      </Modal>
    );
  };
}
