import type { ReactElement } from "react";
import type { PlayerId } from "../../player";
import type { PlayerVotes } from "../index";
import type Vote from "../Vote";

export interface VotingProps {
  playerId: PlayerId;
  onVote: (vote: Vote) => void;
  playerVotes: PlayerVotes;
}

export default function Voting({
  playerId,
  onVote,
  playerVotes,
}: VotingProps): ReactElement {
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
