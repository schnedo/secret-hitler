import createRoleAssigner, { RolesShuffler } from "./createRoleAssigner";
import getInitialState, { GameState } from "./initialState";
import { Player, Role } from "./player";

const names = [
  "martha",
  "peter",
  "john",
  "alice",
  "bob",
  "carl",
  "sean",
  "jenny",
  "nina",
  "oyo",
];

function createInitialState(nPlayers: number): GameState {
  const players: Player[] = names.slice(0, nPlayers).map((name) => ({
    name,
    role: null,
  }));
  return {
    ...getInitialState(),
    players,
  };
}

[5, 6, 7, 8, 9, 10].forEach((nPlayers) => {
  it(`should assign roles to ${nPlayers} players`, async () => {
    expect.hasAssertions();
    const shuffle: RolesShuffler = (roles) => roles;
    const assignRoles = createRoleAssigner(shuffle);

    const newState = assignRoles(createInitialState(nPlayers));
    for (const player of newState.players) {
      expect(player.role).toBeTruthy();
    }
  });
});

it("should reshuffle every time it is called", async () => {
  expect.hasAssertions();
  const roles: Role[] = ["fascist", "liberal", "hitler", "liberal", "liberal"];
  const shuffle = jest.fn().mockImplementation((_) => [...roles]);
  const assignRoles = createRoleAssigner(shuffle);

  expect(shuffle).not.toHaveBeenCalled();
  assignRoles(createInitialState(5));
  expect(shuffle).toHaveBeenCalledTimes(1);
  assignRoles(createInitialState(5));
  expect(shuffle).toHaveBeenCalledTimes(2);
});

it("should assign roles according to shuffled roles", async () => {
  expect.hasAssertions();
  const roles: Role[] = ["fascist", "liberal", "hitler", "liberal", "liberal"];
  const shuffle: RolesShuffler = (_) => [...roles].reverse();
  const assignRoles = createRoleAssigner(shuffle);

  const newState = assignRoles(createInitialState(roles.length));
  expect(newState.players.map((player) => player.role)).toStrictEqual(roles);
});

it("should throw an error if roles cannot be assigned", async () => {
  expect.hasAssertions();

  const shuffle: RolesShuffler = (_) => [];
  const assignRoles = createRoleAssigner(shuffle);

  expect(() => assignRoles(createInitialState(5))).toThrowError(
    "Assigning Roles Failed",
  );
});
