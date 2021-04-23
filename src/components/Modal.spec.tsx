import { render } from "@testing-library/react";
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

    const { container, getByTestId } = render(
      <Modal open={true}>
        <div data-testid={"id"}>foo</div>
      </Modal>,
    );

    expect(container).toContainElement(getByTestId("id"));
  });

  it("should call onClose when clicked on background", async () => {
    expect.hasAssertions();

    const onClose = jest.fn();

    const { container } = render(
      <Modal open={true} onClose={onClose}>
        <div>foo</div>
      </Modal>,
    );

    userEvent.click(container.firstElementChild!);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("should not call onClose when clicked on child element", async () => {
    expect.hasAssertions();

    const onClose = jest.fn();

    const { getByTestId } = render(
      <Modal open={true} onClose={onClose}>
        <div data-testid={"id"}>foo</div>
      </Modal>,
    );

    userEvent.click(getByTestId("id"));
    expect(onClose).not.toHaveBeenCalled();
  });

  it("should have backdrop filter when set", async () => {
    expect.hasAssertions();
    const { container } = render(<Modal withBackdrop open={true} />);
    expect(container.firstChild).toHaveStyleRule(
      "backdrop-filter",
      "brightness(40%)",
    );
  });

  it("should not have backdrop filter when not set", async () => {
    expect.hasAssertions();
    const { container } = render(<Modal open={true} />);
    expect(container.firstChild).toHaveStyleRule("backdrop-filter", undefined);
  });
});
