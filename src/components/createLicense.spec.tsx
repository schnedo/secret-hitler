import { render } from "@testing-library/react";
import { MockComponent } from "../testUtils";
import createLicense from "./createLicense";

const License = createLicense(MockComponent);

it("should render correctly", async () => {
  expect.hasAssertions();

  const { container } = render(
    <License open={true} onClose={() => undefined} />,
  );

  expect(container).toMatchSnapshot();
});
