import { render } from "@testing-library/react";
import { MockComponent } from "../testUtils";
import createFooter from "./createFooter";

it("should render correctly", async () => {
  expect.hasAssertions();

  // @ts-expect-error probably some type inference issue. can be ignored here, as it is a mock component
  const Footer = createFooter(MockComponent, MockComponent);
  const { container } = render(<Footer />);

  expect(container).toMatchSnapshot();
});
