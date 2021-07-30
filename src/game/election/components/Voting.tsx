import { ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import { vote } from "../../index";
import { PlayerId } from "../../player";
import { RootState } from "../../../store";

export interface VotingProps {
  playerId: PlayerId;
}

export default function Voting({ playerId }: VotingProps): ReactElement {
  const { phase, playerVotes } = useSelector(
    (state: RootState) => state.gameState,
  );
  const dispatch = useDispatch();

  if (phase !== "vote") {
    return <></>;
  }

  if (playerVotes[playerId] !== undefined) {
    return <div>{playerVotes[playerId] ? "Yes" : "No"}</div>;
  }
  return (
    <div>
      <button onClick={() => dispatch(vote({ playerId, agreed: true }))}>
        Yes
      </button>
      <button onClick={() => dispatch(vote({ playerId, agreed: false }))}>
        No
      </button>
    </div>
  );
}
