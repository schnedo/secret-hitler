import { ComponentType, ReactElement } from "react";
import { useSelector } from "react-redux";
import { ModalProps } from "../../../components/Modal";
import { RootState } from "../../../store";

export interface DiscardPolicyProps {
  onDiscard: (index: number) => void;
  onPlay: () => void;
}

export default function createDiscardPolicy(Modal: ComponentType<ModalProps>) {
  return function DiscardPolicy({
    onDiscard,
    onPlay,
  }: DiscardPolicyProps): ReactElement {
    const {
      gameState: { phase },
      policyDeck: { drawingPile },
    } = useSelector(({ gameState, policyDeck }: RootState) => ({
      gameState,
      policyDeck,
    }));

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
