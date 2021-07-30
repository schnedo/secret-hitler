import React, { Fragment, ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Chancellor, Footer, President } from "./components";
import {
  acceptElection,
  Avatar,
  ChancellorNomination,
  declineElection,
  discardPolicy,
  DiscardPolicy,
  ElectionEvaluation,
  FailedElectionCounter,
  isValidNomination,
  nominateChancellor,
  playPolicy,
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
        avatarComponent={(player) => <Avatar player={player} />}
      />
      {phase === "electionEvaluation" ? (
        <ElectionEvaluation
          onElectionAccepted={() => dispatch(acceptElection())}
          onElectionDeclined={() => dispatch(declineElection())}
        />
      ) : (
        <></>
      )}
      <DiscardPolicy
        onDiscard={(index) => dispatch(discardPolicy(index))}
        onPlay={() => dispatch(playPolicy)}
      />
      {phase !== null ? (
        <></>
      ) : (
        <Button onClick={() => dispatch(startGame())}>Start</Button>
      )}
      <Footer />
    </>
  );
}
