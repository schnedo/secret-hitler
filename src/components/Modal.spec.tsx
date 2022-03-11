import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Modal from "./Modal";

describe("Modal", () => {
  it("should render nothing when closed", async () => {
    expect.hasAssertions();

    const { container } = render(
      <Modal open={false}>
        <div>foo</div>
      </Modal>,
    );

    expect(container).toBeEmptyDOMElement();
  });

  it("should render child when opened", async () => {
    expect.hasAssertions();

    const { container } = render(
      <Modal open={true}>
        <div data-testid={"id"}>foo</div>
      </Modal>,
    );

    expect(container).toContainElement(screen.getByTestId("id"));
  });

  it("should call onClose when clicked on background", async () => {
    expect.hasAssertions();

    const onClose = jest.fn();

    render(
      <Modal open={true} onClose={onClose}>
        <div>foo</div>
      </Modal>,
    );

    userEvent.click(screen.getByTestId("background"));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("should not call onClose when clicked on child element", async () => {
    expect.hasAssertions();

    const onClose = jest.fn();

    render(
      <Modal open={true} onClose={onClose}>
        <div data-testid={"id"}>foo</div>
      </Modal>,
    );

    userEvent.click(screen.getByTestId("id"));
    expect(onClose).not.toHaveBeenCalled();
  });

  it("should have backdrop filter when set", async () => {
    expect.hasAssertions();
    render(<Modal withBackdrop open={true} />);
    expect(screen.getByTestId("background")).toHaveStyleRule(
      "backdrop-filter",
      "brightness(40%)",
    );
  });

  it("should not have backdrop filter when not set", async () => {
    expect.hasAssertions();
    render(<Modal open={true} />);
    expect(screen.getByTestId("background")).toHaveStyleRule(
      "backdrop-filter",
      undefined,
    );
  });
});
