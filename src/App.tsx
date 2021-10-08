import React, { Fragment, ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Chancellor, Footer, President } from "./components";
import {
  acceptElection,
  Avatar,
  ChancellorNomination,
  declineElection,
  discardPolicy,
  ElectionEvaluation,
  FailedElectionCounter,
  isValidNomination,
  nominateChancellor,
  Phase,
  playPolicy,
  PolicyCardFields,
  PolicyDiscard,
  startGame,
  vote as voteAction,
  Voting,
} from "./game";
import type { RootState } from "./store";

export default function App(): ReactElement {
  const {
    gameState: {
      players,
      playerVotes,
      phase,
      presidentialCandidate,
      electionRound,
      government,
    },
    policyDeck: { drawingPile, discardPile, nFascistsPlayed, nLiberalsPlayed },
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  const phaseComponentMap: Record<Phase, ReactElement> = {
    nominate: (
      <ChancellorNomination
        onNomination={(playerId) => dispatch(nominateChancellor(playerId))}
        nominationValidator={isValidNomination}
        presidentialCandidate={presidentialCandidate}
        players={players}
        government={government}
      />
    ),
    electionEvaluation: (
      <ElectionEvaluation
        onElectionAccepted={() => dispatch(acceptElection())}
        onElectionDeclined={() => dispatch(declineElection())}
        playerVotes={playerVotes}
        players={players}
      />
    ),
    presidentSelectsPolicies: (
      <PolicyDiscard
        onDiscard={(index) => dispatch(discardPolicy(index))}
        onPlay={() => dispatch(playPolicy)}
        isChancellorDiscard={phase === "chancellorSelectsPolicies"}
        drawingPile={drawingPile}
      />
    ),
    chancellorSelectsPolicies: (
      <PolicyDiscard
        onDiscard={(index) => dispatch(discardPolicy(index))}
        onPlay={() => dispatch(playPolicy)}
        isChancellorDiscard={phase === "chancellorSelectsPolicies"}
        drawingPile={drawingPile}
      />
    ),
    executiveAction: <></>,
    vote: <></>,
  };

  return (
    <>
      <div>{phase}</div>
      <PolicyCardFields
        discardPile={discardPile}
        drawingPile={drawingPile}
        nFascistsPlayed={nFascistsPlayed}
        nLiberalsPlayed={nLiberalsPlayed}
      />
      <FailedElectionCounter electionCounter={electionRound} />
      {players.map((player, id) => (
        <Fragment key={id}>
          {id === presidentialCandidate ? <President /> : <></>}
          {id === government?.chancellor ? <Chancellor /> : <></>}
          <Avatar player={player} />
          {phase === "vote" ? (
            <Voting
              playerId={id}
              onVote={(vote) => dispatch(voteAction(vote))}
              playerVotes={playerVotes}
            />
          ) : (
            <></>
          )}
        </Fragment>
      ))}
      {phase ? (
        phaseComponentMap[phase]
      ) : (
        <Button onClick={() => dispatch(startGame())}>Start</Button>
      )}
      <Footer />
    </>
  );
}
