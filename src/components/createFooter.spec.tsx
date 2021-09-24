import { render } from "@testing-library/react";
import { MockComponent } from "../testUtils";
import createFooter from "./createFooter";

it("should render correctly", async () => {
  expect.hasAssertions();

  const Footer = createFooter(MockComponent, MockComponent);
  const { container } = render(<Footer />);

  expect(container).toMatchSnapshot();
});
