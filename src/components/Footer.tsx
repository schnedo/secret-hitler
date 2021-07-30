import React, { ReactElement, useState } from "react";
import Button from "./Button";
import License from "./License";

export default function Footer(): ReactElement {
  const [isOpen, setOpen] = useState(false);

  return (
    <footer>
      <Button onClick={() => setOpen(true)}>License</Button>
      <License open={isOpen} onClose={() => setOpen(false)} />
    </footer>
  );
}
