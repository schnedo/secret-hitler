import { FunctionComponent, MouseEventHandler } from "react";
import styled, { createGlobalStyle } from "styled-components";

const Global = createGlobalStyle`
  body {
    overflow: hidden;
  }
`;

interface ContainerProps {
  withBackdrop?: boolean;
}

const Container = styled.div<ContainerProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  min-width: 100vw;
  position: fixed;
  top: 0;
  backdrop-filter: ${({ withBackdrop }) => withBackdrop && "brightness(40%)"};
`;

export interface ModalProps extends ContainerProps {
  open: boolean;
  onClose?: () => void;
}

const Modal: FunctionComponent<ModalProps> = ({
  open,
  onClose,
  children,
  withBackdrop,
}) => {
  const closeContainer: MouseEventHandler = (event) => {
    if (onClose && event.target === event.currentTarget) {
      onClose();
    }
  };

  if (!open) {
    return <></>;
  }
  return (
    <Container withBackdrop={withBackdrop} onClick={closeContainer}>
      <Global />
      <dialog open={open}>{children}</dialog>
    </Container>
  );
};

export default Modal;
