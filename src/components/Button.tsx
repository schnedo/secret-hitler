import type { MouseEventHandler, ReactElement, ReactText } from "react";

interface ButtonProps {
  onClick?: MouseEventHandler;
  children: ReactText;
}

export default function Button({
  onClick,
  children,
}: ButtonProps): ReactElement {
  return <button onClick={onClick}>{children}</button>;
}
