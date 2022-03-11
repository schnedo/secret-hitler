import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "./Button";

it("should render correctly", async () => {
  expect.hasAssertions();

  const { container } = render(<Button>some Label</Button>);

  expect(container).toMatchSnapshot();
});

it("should call onClick when clicked", async () => {
  expect.hasAssertions();

  const onClick = jest.fn();
  render(<Button onClick={onClick}>{"labelText"}</Button>);

  expect(onClick).not.toHaveBeenCalled();
  userEvent.click(screen.getByRole("button"));
  expect(onClick).toHaveBeenCalledTimes(1);
});
