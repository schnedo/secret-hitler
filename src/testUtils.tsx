export function MockComponent(props: unknown): JSX.Element {
  return <div>{JSON.stringify(props)}</div>;
}
