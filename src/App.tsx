import React, { Fragment, ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "./components";
import Footer from "./Footer";
import { Avatar, startGame } from "./game";
import Nomination from "./Nomination";
import { RootState } from "./store";

export default function App(): ReactElement {
  const { players, phase } = useSelector((state: RootState) => ({
    players: state.playersState.players,
    phase: state.gameState.phase,
    presidentialCandidate: state.playersState.presidentialCandidate,
    government: state.playersState.government,
  }));
  const dispatch = useDispatch();

  return (
    <>
      {players.map((player, id) => (
        <Fragment key={id}>
          <Avatar player={player} />
        </Fragment>
      ))}
      {phase === "nominate" ? (
        <Nomination
          electablePlayers={players.filter(({ isElectable }) => isElectable)}
          onElected={() => undefined}
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
