import { render } from "@testing-library/react";
import type Player from "../Player";
import Avatar from "./Avatar";

it("should render correctly", async () => {
  expect.hasAssertions();

  const player: Player = {
    id: 0,
    name: "John",
    role: "fascist",
    title: null,
  };
  const { container } = render(<Avatar player={player} />);

  expect(container).toMatchSnapshot();
});
