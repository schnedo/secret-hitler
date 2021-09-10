import type Government from "./Government";

export default function isValidNomination(
  numPlayers: number,
  lastGovernment: Government | null,
  nomination: Government,
): boolean {
  return (
    nomination.chancellor !== nomination.president &&
    nomination.chancellor !== lastGovernment?.chancellor &&
    (nomination.chancellor !== lastGovernment?.president || numPlayers === 5)
  );
}
