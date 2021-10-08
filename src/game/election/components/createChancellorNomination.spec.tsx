import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MockComponent } from "../../../testUtils";
import type { Player } from "../../player";
import type Government from "../Government";
import createChancellorNomination, {
  NominationValidator,
} from "./createChancellorNomination";

const ChancellorNomination = createChancellorNomination(
  MockComponent,
  MockComponent,
);
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
const presidentialCandidate = 1;
const government: Government = { chancellor: 3, president: 4 };

it("should render correctly", async () => {
  expect.hasAssertions();

  const { container } = render(
    <ChancellorNomination
      onNomination={() => undefined}
      nominationValidator={() => true}
      players={somePlayers}
      presidentialCandidate={presidentialCandidate}
      government={government}
    />,
  );

  expect(container).toMatchSnapshot();
});

it("should call onNomination with correct player id", async () => {
  expect.hasAssertions();

  const handleNomination = jest.fn();
  const { getByRole } = render(
    <ChancellorNomination
      onNomination={handleNomination}
      nominationValidator={() => true}
      players={somePlayers}
      presidentialCandidate={presidentialCandidate}
      government={government}
    />,
  );

  somePlayers.forEach(({ name }, index) => {
    userEvent.click(getByRole("button", { name: `Nominate ${name}` }));
    expect(handleNomination).toHaveBeenLastCalledWith(index);
  });
});

it("should only show players that are electable for nomination", async () => {
  expect.hasAssertions();

  const handleNomination = jest.fn();
  const validPlayers = [0, 2];
  const validateNomination = jest
    .fn<ReturnType<NominationValidator>, Parameters<NominationValidator>>()
    .mockImplementation((numPlayers, lastGovernment, nomination) =>
      validPlayers.includes(nomination.chancellor),
    );
  const { getAllByRole } = render(
    <ChancellorNomination
      onNomination={handleNomination}
      nominationValidator={validateNomination}
      players={somePlayers}
      presidentialCandidate={presidentialCandidate}
      government={government}
    />,
  );

  const allNominationButtons = getAllByRole("button");
  expect(allNominationButtons).toHaveLength(validPlayers.length);
  allNominationButtons.forEach((nominationButton, index) => {
    expect(nominationButton).toHaveTextContent(
      somePlayers[validPlayers[index]].name,
    );
  });
});

it("should not show presidentialCandidate as an option", async () => {
  expect.hasAssertions();

  const { queryByRole } = render(
    <ChancellorNomination
      onNomination={() => true}
      nominationValidator={() => true}
      players={somePlayers}
      presidentialCandidate={presidentialCandidate}
      government={government}
    />,
  );

  expect(
    queryByRole("button", { name: somePlayers[presidentialCandidate].name }),
  ).not.toBeInTheDocument();
});
