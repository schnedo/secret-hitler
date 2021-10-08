import type { PropsWithChildren } from "react";

export function MockComponent({
  children,
  ...props
}: PropsWithChildren<unknown>): JSX.Element {
  return (
    <div>
      {JSON.stringify(props)} {children}
    </div>
  );
}
