import { render } from "@testing-library/react";
import { MockComponent } from "../../../testUtils";
import type { Player } from "../../player";
import type Government from "../Government";
import createChancellorNomination from "./createChancellorNomination";

const ChancellorNomination = createChancellorNomination(
  MockComponent,
  MockComponent,
);
const somePlayers: Player[] = [
  {
    name: "name",
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
