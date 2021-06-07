import React, { Fragment, ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "./components";
import Footer from "./Footer";
import { Avatar, nominateChancellor, startGame } from "./game";
import ChancellorNomination from "./ChancellorNomination";
import { RootState } from "./store";

export default function App(): ReactElement {
  const { players, phase } = useSelector((state: RootState) => state.gameState);
  const dispatch = useDispatch();

  return (
    <>
      {players.map((player, id) => (
        <Fragment key={id}>
          <Avatar player={player} />
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
