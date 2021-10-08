import { render } from "@testing-library/react";
import President from "./President";

it("should render correctly", async () => {
  expect.hasAssertions();

  const { container } = render(<President />);

  expect(container).toMatchSnapshot();
});
