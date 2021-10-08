import { render } from "@testing-library/react";
import Avatar from "./Avatar";
import type Player from "./Player";

it("should render correctly", async () => {
  expect.hasAssertions();

  const player: Player = {
    name: "John",
    role: "fascist",
    title: null,
  };
  const { container } = render(<Avatar player={player} />);

  expect(container).toMatchSnapshot();
});
