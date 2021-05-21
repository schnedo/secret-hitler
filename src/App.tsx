import React, { ReactElement, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "./components";
import Footer from "./Footer";
import { Avatar } from "./game";
import { startGame } from "./game/actions";
import { RootState } from "./store";

export default function App(): ReactElement {
  const { players, presidentId, gameIsStarted } = useSelector(
    (state: RootState) => ({
      players: state.playersState.players,
      presidentId: state.playersState.presidentId,
      gameIsStarted: state.gameState.isStarted,
    }),
  );
  const dispatch = useDispatch();

  return (
    <>
      {players.map((player, id) => (
        <Fragment key={id}>
          {id === presidentId ? "president" : undefined}
          <Avatar player={player} />
        </Fragment>
      ))}
      {gameIsStarted ? (
        <></>
      ) : (
        <Button onClick={() => dispatch(startGame())}>Start</Button>
      )}
      <Footer />
    </>
  );
}
