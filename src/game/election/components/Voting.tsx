import { ReactElement } from "react";
import { useSelector } from "react-redux";
import { PlayerId } from "../../player";
import { RootState } from "../../../store";
import Vote from "../Vote";

export interface VotingProps {
  playerId: PlayerId;
  onVote: (vote: Vote) => void;
}

export default function Voting({
  playerId,
  onVote,
}: VotingProps): ReactElement {
  const { phase, playerVotes } = useSelector(
    (state: RootState) => state.gameState,
  );

  if (phase !== "vote") {
    return <></>;
  }

  if (playerVotes[playerId] !== undefined) {
    return <div>{playerVotes[playerId] ? "Yes" : "No"}</div>;
  }
  return (
    <div>
      <button onClick={() => onVote({ playerId, agreed: true })}>Yes</button>
      <button onClick={() => onVote({ playerId, agreed: false })}>No</button>
    </div>
  );
}
