import createRoleAssigner, { RolesBagCreator } from "./createRoleAssigner";
import { getUnshuffledRolesBag, RolesBag } from "./createRolesBagCreator";
import getInitialState, { GameState } from "./initialState";
import { Player } from "./player";

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
    const assignRoles = createRoleAssigner(getUnshuffledRolesBag);

    const newState = assignRoles(createInitialState(nPlayers));
    for (const player of newState.players) {
      expect(player.role).toBeTruthy();
    }
  });
});

it("should create new RolesBag every time it is called", async () => {
  expect.hasAssertions();
  const roles: RolesBag = [
    "fascist",
    "liberal",
    "hitler",
    "liberal",
    "liberal",
  ];
  const shuffle = jest.fn().mockImplementation((_) => [...roles]);
  const assignRoles = createRoleAssigner(shuffle);

  expect(shuffle).not.toHaveBeenCalled();
  assignRoles(createInitialState(5));
  expect(shuffle).toHaveBeenCalledTimes(1);
  assignRoles(createInitialState(5));
  expect(shuffle).toHaveBeenCalledTimes(2);
});

it("should assign roles according to RolesBag", async () => {
  expect.hasAssertions();
  const roles: RolesBag = [
    "fascist",
    "liberal",
    "hitler",
    "liberal",
    "liberal",
  ];
  const rolesBagCreator: RolesBagCreator = (_) => [...roles].reverse();
  const assignRoles = createRoleAssigner(rolesBagCreator);

  const newState = assignRoles(createInitialState(roles.length));
  expect(newState.players.map((player) => player.role)).toStrictEqual(roles);
});

it("should throw an error if roles cannot be assigned", async () => {
  expect.hasAssertions();

  const rolesBagCreator: RolesBagCreator = (_) => [];
  const assignRoles = createRoleAssigner(rolesBagCreator);

  expect(() => assignRoles(createInitialState(5))).toThrowError(
    "Assigning Roles Failed",
  );
});
