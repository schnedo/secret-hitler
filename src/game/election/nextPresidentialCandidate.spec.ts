import type { Player } from "../player";
import nextPresidentialCandidate from "./nextPresidentialCandidate";

const somePlayers: Player[] = [
  {
    name: "John",
    role: "fascist",
    title: null,
  },
  {
    name: "Martha",
    role: "hitler",
    title: null,
  },
  {
    name: "Bob",
    role: "liberal",
    title: null,
  },
  {
    name: "Alice",
    role: "liberal",
    title: null,
  },
  {
    name: "Mohammed",
    role: "liberal",
    title: null,
  },
];

it.each`
  currentCandidate | expected
  ${0}             | ${1}
  ${1}             | ${2}
  ${2}             | ${3}
  ${3}             | ${4}
  ${4}             | ${0}
`(
  "should choose $expected the next president if $currentCandidate is current candidate",
  async ({ currentCandidate, expected }) => {
    expect.hasAssertions();

    expect(
      nextPresidentialCandidate(currentCandidate, somePlayers),
    ).toStrictEqual(expected);
  },
);

it("should choose a valid person when no presidentialCandidate was chosen before", async () => {
  expect.hasAssertions();

  const actual = nextPresidentialCandidate(null, somePlayers);
  expect(actual).toBeGreaterThanOrEqual(0);
  expect(actual).toBeLessThan(somePlayers.length);
});
