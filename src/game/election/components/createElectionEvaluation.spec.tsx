import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MockComponent } from "../../../testUtils";
import type { Player } from "../../player";
import type PlayerVotes from "../PlayerVotes";
import createElectionEvaluation from "./createElectionEvaluation";

const ElectionEvaluation = createElectionEvaluation(MockComponent);

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
const allYesVotes: PlayerVotes = somePlayers.map(() => true);

it("should render correctly", async () => {
  expect.hasAssertions();

  const { container } = render(
    <ElectionEvaluation
      onElectionAccepted={() => undefined}
      onElectionDeclined={() => undefined}
      playerVotes={allYesVotes}
      players={somePlayers}
    />,
  );

  expect(container).toMatchSnapshot();
});

it("should call onElectionAccepted when election got accepted", async () => {
  expect.hasAssertions();

  const handleElectionAccepted = jest.fn();
  render(
    <ElectionEvaluation
      onElectionAccepted={handleElectionAccepted}
      onElectionDeclined={() => undefined}
      playerVotes={allYesVotes}
      players={somePlayers}
    />,
  );

  expect(handleElectionAccepted).not.toHaveBeenCalled();
  await userEvent.click(screen.getByRole("button"));
  expect(handleElectionAccepted).toHaveBeenCalledTimes(1);
});

it("should call onElectionDeclined when election got accepted", async () => {
  expect.hasAssertions();

  const allNoVotes = somePlayers.map(() => false);
  const handleElectionDeclined = jest.fn();
  render(
    <ElectionEvaluation
      onElectionAccepted={() => undefined}
      onElectionDeclined={handleElectionDeclined}
      playerVotes={allNoVotes}
      players={somePlayers}
    />,
  );

  expect(handleElectionDeclined).not.toHaveBeenCalled();
  await userEvent.click(screen.getByRole("button"));
  expect(handleElectionDeclined).toHaveBeenCalledTimes(1);
});
