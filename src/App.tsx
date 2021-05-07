import React, { ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "./components";
import Footer from "./Footer";
import { assignRoles, Player, Avatar } from "./game";

export default function App(): ReactElement {
  const players = useSelector(
    (state: { game: { players: Player[] } }) => state.game.players,
  );
  const dispatch = useDispatch();

  if (!players[0]?.role) {
    return (
      <>
        {players.map((player) => (
          <Avatar player={player} />
        ))}
        <Button onClick={() => dispatch(assignRoles())}>Start</Button>
        <Footer />
      </>
    );
  } else {
    return (
      <>
        {players.map((player) => (
          <Avatar player={player} />
        ))}
      </>
    );
  }
}
