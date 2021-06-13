import React, { Fragment, ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChancellorNomination from "./ChancellorNomination";
import { Button, President } from "./components";
import Voting from "./components/Voting";
import Footer from "./Footer";
import { Avatar, nominateChancellor, startGame } from "./game";
import { RootState } from "./store";

export default function App(): ReactElement {
  const { players, phase, presidentialCandidate } = useSelector(
    (state: RootState) => state.gameState,
  );
  const dispatch = useDispatch();

  return (
    <>
      <div>{phase}</div>
      {players.map((player, id) => (
        <Fragment key={id}>
          {id === presidentialCandidate ? <President /> : <></>}
          <Avatar player={player} />
          <Voting playerId={id} />
        </Fragment>
      ))}
      {phase === "nominate" ? (
        <ChancellorNomination
          electablePlayers={players.filter(({ isElectable }) => isElectable)}
          onNominated={(player) =>
            dispatch(
              nominateChancellor(players.findIndex((pl) => pl === player)),
            )
          }
        />
      ) : (
        <></>
      )}
      {phase !== null ? (
        <></>
      ) : (
        <Button onClick={() => dispatch(startGame())}>Start</Button>
      )}
      <Footer />
    </>
  );
}
