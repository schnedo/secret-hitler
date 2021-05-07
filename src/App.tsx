import React, { ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "./components";
import Footer from "./Footer";
import { assignRoles, Avatar } from "./game";
import { RootState } from "./store";

export default function App(): ReactElement {
  const players = useSelector((state: RootState) => state.players);
  const dispatch = useDispatch();

  if (!players.some((player) => !!player.role)) {
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
