import type { ReactElement } from "react";
import Modal from "./Modal";

export interface LicenseProps {
  open: boolean;
  onClose: () => void;
}

export default function License({ open, onClose }: LicenseProps): ReactElement {
  if (!open) {
    return <></>;
  }
  return (
    <Modal withBackdrop open={open} onClose={onClose}>
      <div>
        Secret Hitler is a game developed by Goat, Wolf, & Cabbage, licensed
        under the{" "}
        <a href={"https://creativecommons.org/licenses/by-nc-sa/4.0/deed.en"}>
          CC BY-NC-SA 4.0
        </a>
      </div>
    </Modal>
  );
}
