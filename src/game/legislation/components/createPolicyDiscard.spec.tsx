import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MockComponent } from "../../../testUtils";
import type PolicyDeck from "../PolicyDeck";
import createPolicyDiscard from "./createPolicyDiscard";

const PolicyDiscard = createPolicyDiscard(MockComponent);

const drawingPile: PolicyDeck = ["fascist", "liberal", "fascist"];

it("should render correctly", async () => {
  expect.hasAssertions();

  const { container } = render(
    <PolicyDiscard
      onDiscard={() => undefined}
      onPlay={() => undefined}
      drawingPile={drawingPile}
    />,
  );

  expect(container).toMatchSnapshot();
});

it("should draw 3 cards for president discard", async () => {
  expect.hasAssertions();

  render(
    <PolicyDiscard
      onDiscard={() => undefined}
      onPlay={() => undefined}
      drawingPile={drawingPile}
    />,
  );

  const allCards = screen.getAllByRole("button");
  expect(allCards).toHaveLength(3);
  const cardTypes = allCards.map((card) => card.textContent);
  expect(cardTypes).toStrictEqual(drawingPile.slice(0, 3));
});

it("should draw 2 cards for chancellor discard", async () => {
  expect.hasAssertions();

  render(
    <PolicyDiscard
      onDiscard={() => undefined}
      onPlay={() => undefined}
      drawingPile={drawingPile}
      isChancellorDiscard
    />,
  );

  const allCards = screen.getAllByRole("button");
  expect(allCards).toHaveLength(2);
  const cardTypes = allCards.map((card) => card.textContent);
  expect(cardTypes).toStrictEqual(drawingPile.slice(0, 2));
});

it("should call onDiscard when card is discarded", async () => {
  expect.hasAssertions();

  const handleDiscard = jest.fn();
  render(
    <PolicyDiscard
      onDiscard={handleDiscard}
      onPlay={() => undefined}
      drawingPile={drawingPile}
    />,
  );

  expect(handleDiscard).not.toHaveBeenCalled();
  await userEvent.click(screen.getByRole("button", { name: "liberal" }));
  expect(handleDiscard).toHaveBeenCalledTimes(1);
  expect(handleDiscard).toHaveBeenLastCalledWith(1);
});

it("should call onPlay when card is discarded by chancellor", async () => {
  expect.hasAssertions();

  const handlePlay = jest.fn();
  render(
    <PolicyDiscard
      onDiscard={() => undefined}
      onPlay={handlePlay}
      drawingPile={drawingPile}
      isChancellorDiscard
    />,
  );

  expect(handlePlay).not.toHaveBeenCalled();
  await userEvent.click(screen.getAllByRole("button").pop()!);
  expect(handlePlay).toHaveBeenCalledTimes(1);
});
