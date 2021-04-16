import { FunctionComponent, MouseEventHandler } from "react";
import styled, { createGlobalStyle } from "styled-components";

const Global = createGlobalStyle`
  body {
    overflow: hidden;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  min-width: 100vw;
  backdrop-filter: brightness(40%);
  position: fixed;
  top: 0;
`;

export interface ModalProps {
  open: boolean;
  onClose?: () => void;
}

const Modal: FunctionComponent<ModalProps> = ({ open, onClose, children }) => {
  const closeContainer: MouseEventHandler = (event) => {
    if (onClose && event.target === event.currentTarget) {
      onClose();
    }
  };

  if (!open) {
    return <></>;
  }
  return (
    <Container onClick={closeContainer}>
      <Global />
      <dialog open={open}>{children}</dialog>
    </Container>
  );
};

export default Modal;
