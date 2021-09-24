import { render } from "@testing-library/react";
import Chancellor from "./Chancellor";

it("should render correctly", async () => {
  expect.hasAssertions();

  const { container } = render(<Chancellor />);

  expect(container).toMatchSnapshot();
});
