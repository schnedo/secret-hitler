import { FunctionComponent, MouseEventHandler } from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    minWidth: "100vw",
    backdropFilter: "brightness(40%)",
    position: "fixed",
    top: "0",
  },
});

export interface ModalProps {
  open: boolean;
  onClose?: () => void;
}

const Modal: FunctionComponent<ModalProps> = ({ open, onClose, children }) => {
  const { container } = useStyles();
  const closeContainer: MouseEventHandler = (event) => {
    if (onClose && event.target === event.currentTarget) {
      onClose();
    }
  };

  if (!open) {
    return <></>;
  }
  return (
    <div className={container} onClick={closeContainer}>
      <dialog open={open}>{children}</dialog>
    </div>
  );
};

export default Modal;
