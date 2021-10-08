import { render } from "@testing-library/react";
import PolicyCardFields from "./PolicyCardFields";

it("should render correctly", async () => {
  expect.hasAssertions();

  const { container } = render(
    <PolicyCardFields
      drawingPile={[]}
      discardPile={[]}
      nLiberalsPlayed={1}
      nFascistsPlayed={3}
    />,
  );

  expect(container).toMatchSnapshot();
});
