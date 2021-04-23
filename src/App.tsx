import React, { ReactElement, useState } from "react";
import Button from "./components/Button";
import Footer from "./Footer";
import { Game } from "./game/Game";
import Avatar from "./game/player/Avatar";
import { Player } from "./game/player/Player";

const players: Player[] = [
  new Player("John"),
  new Player("Martha"),
  new Player("Bob"),
  new Player("Alice"),
  new Player("Mohammed"),
];

export default function App(): ReactElement {
  const [game, setGame] = useState<Game | null>(null);

  if (game == null) {
    return (
      <>
        {players.map((player) => (
          <Avatar player={player} />
        ))}
        <Button onClick={() => setGame(new Game(players))}>Start</Button>
        <Footer />
      </>
    );
  } else {
    return (
      <>
        {game.players.map((player) => (
          <Avatar player={player} />
        ))}
      </>
    );
  }
}
