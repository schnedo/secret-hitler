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
          <Voting
            playerId={id}
            onVote={(vote) => dispatch(voteAction(vote))}
            phase={phase}
            playerVotes={playerVotes}
          />
        </Fragment>
      ))}
      <ChancellorNomination
        onNomination={(playerId) => dispatch(nominateChancellor(playerId))}
        nominationValidator={isValidNomination}
        presidentialCandidate={presidentialCandidate}
        phase={phase}
        players={players}
        government={government}
        avatarComponent={(player) => <Avatar player={player} />}
      />
      {phase === "electionEvaluation" ? (
        <ElectionEvaluation
          onElectionAccepted={() => dispatch(acceptElection())}
          onElectionDeclined={() => dispatch(declineElection())}
          playerVotes={playerVotes}
          players={players}
          phase={phase}
        />
      ) : (
        <></>
      )}
      <DiscardPolicy
        onDiscard={(index) => dispatch(discardPolicy(index))}
        onPlay={() => dispatch(playPolicy)}
        phase={phase}
        drawingPile={drawingPile}
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
