import React, { Fragment, ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Chancellor, President } from "./components";
import Voting from "./components/Voting";
import FailedElectionCounter from "./FailedElectionCounter";
import Footer from "./Footer";
import {
  Avatar,
  ChancellorNomination,
  ElectionEvaluation,
  startGame,
} from "./game";
import PolicyCardFields from "./PolicyCardFields";
import DiscardPolicy from "./DiscardPolicy";
import { RootState } from "./store";

export default function App(): ReactElement {
  const { players, phase, presidentialCandidate, electionRound, government } =
    useSelector((state: RootState) => state.gameState);
  const dispatch = useDispatch();

  return (
    <>
      <div>{phase}</div>
      <PolicyCardFields />
      <FailedElectionCounter electionCounter={electionRound} />
      {players.map((player, id) => (
        <Fragment key={id}>
          {id === presidentialCandidate ? <President /> : <></>}
          {id === government?.chancellor ? <Chancellor /> : <></>}
          <Avatar player={player} />
          <Voting playerId={id} />
        </Fragment>
      ))}
      <ChancellorNomination />
      <ElectionEvaluation />
      <DiscardPolicy />
      {phase !== null ? (
        <></>
      ) : (
        <Button onClick={() => dispatch(startGame())}>Start</Button>
      )}
      <Footer />
    </>
  );
}
