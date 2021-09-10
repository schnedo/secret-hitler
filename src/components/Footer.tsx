import { ComponentType, ReactElement, useState } from "react";
import type { ButtonProps } from "./Button";
import type { LicenseProps } from "./License";

export default function createFooter(
  Button: ComponentType<ButtonProps>,
  License: ComponentType<LicenseProps>,
) {
  return function Footer(): ReactElement {
    const [isOpen, setOpen] = useState(false);

    return (
      <footer>
        <Button onClick={() => setOpen(true)}>License</Button>
        <License open={isOpen} onClose={() => setOpen(false)} />
      </footer>
    );
  };
}
