import { ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "../../../components";
import { RootState } from "../../../store";
import { discardPolicy, playPolicy } from "../actions";

export default function DiscardPolicy(): ReactElement {
  const {
    gameState: { phase },
    policyDeck: { drawingPile },
  } = useSelector(({ gameState, policyDeck }: RootState) => ({
    gameState,
    policyDeck,
  }));
  const dispatch = useDispatch();

  if (
    phase !== "presidentSelectsPolicies" &&
    phase !== "chancellorSelectsPolicies"
  ) {
    return <></>;
  }

  const isChancellorDiscard = phase === "chancellorSelectsPolicies";

  const nCardsToDraw = isChancellorDiscard ? 2 : 3;
  const handleClick = (index: number) => {
    dispatch(discardPolicy(index));
    if (isChancellorDiscard) {
      dispatch(playPolicy());
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
}
