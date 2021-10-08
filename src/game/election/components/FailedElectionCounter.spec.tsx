import { render } from "@testing-library/react";
import FailedElectionCounter from "./FailedElectionCounter";

it("should render correctly", async () => {
  expect.hasAssertions();

  const { container } = render(<FailedElectionCounter electionCounter={1} />);

  expect(container).toMatchSnapshot();
});
