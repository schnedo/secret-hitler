import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type Vote from "../Vote";
import Voting from "./Voting";

it("should render correctly", async () => {
  expect.hasAssertions();

  const { container } = render(
    <Voting playerId={0} onVote={() => undefined} playerVotes={[]} />,
  );

  expect(container).toMatchSnapshot();
});

it("should call onVote with correct Vote", async () => {
  expect.hasAssertions();

  const playerId = 0;
  const handleVote = jest.fn();
  render(<Voting playerId={playerId} onVote={handleVote} playerVotes={[]} />);
  expect(handleVote).not.toHaveBeenCalled();

  await userEvent.click(screen.getByRole("button", { name: "Yes" }));
  expect(handleVote).toHaveBeenCalledTimes(1);
  let expectedVote: Vote = {
    playerId,
    agreed: true,
  };
  expect(handleVote).toHaveBeenLastCalledWith(expectedVote);

  await userEvent.click(screen.getByRole("button", { name: "No" }));
  expect(handleVote).toHaveBeenCalledTimes(2);
  expectedVote = {
    playerId,
    agreed: false,
  };
  expect(handleVote).toHaveBeenLastCalledWith(expectedVote);
});

it("should show the vote of the player if he has already voted", async () => {
  expect.hasAssertions();

  const playerId = 0;
  const { rerender } = render(
    <Voting
      playerId={playerId}
      onVote={() => undefined}
      playerVotes={[true]}
    />,
  );
  expect(screen.getByText("Yes")).toBeInTheDocument();
  expect(screen.queryByText("No")).not.toBeInTheDocument();

  rerender(
    <Voting
      playerId={playerId}
      onVote={() => undefined}
      playerVotes={[false]}
    />,
  );
  expect(screen.queryByText("Yes")).not.toBeInTheDocument();
  expect(screen.getByText("No")).toBeInTheDocument();
});
