import { FunctionComponent, MouseEventHandler, ReactText } from "react";

interface ButtonProps {
  onClick?: MouseEventHandler;
  children: ReactText;
}

const Button: FunctionComponent<ButtonProps> = ({ onClick, children }) => {
  return <button onClick={onClick}>{children}</button>;
};

export default Button;
