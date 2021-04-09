import React, { ReactElement, useState } from "react";
import License from "./License";

export default function Footer(): ReactElement {
  const [isOpen, setOpen] = useState(false);

  return (
    <footer>
      <button onClick={() => setOpen((old) => !old)}>License</button>
      <License open={isOpen} onClose={() => setOpen(false)} />
    </footer>
  );
}
