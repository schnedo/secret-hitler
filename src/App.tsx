import React, { Fragment, ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Chancellor, Footer, President } from "./components";
import {
  acceptElection,
  Avatar,
  ChancellorNomination,
  declineElection,
  DiscardPolicy,
  ElectionEvaluation,
  FailedElectionCounter,
  isValidNomination,
  nominateChancellor,
  PolicyCardFields,
  startGame,
  vote as voteAction,
  Voting,
} from "./game";
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
          <Voting playerId={id} onVote={(vote) => dispatch(voteAction(vote))} />
        </Fragment>
      ))}
      <ChancellorNomination
        onNomination={(playerId) => dispatch(nominateChancellor(playerId))}
        nominationValidator={isValidNomination}
      />
      {phase === "electionEvaluation" ? (
        <ElectionEvaluation
          onElectionAccepted={() => dispatch(acceptElection())}
          onElectionDeclined={() => dispatch(declineElection())}
        />
      ) : (
        <></>
      )}
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
