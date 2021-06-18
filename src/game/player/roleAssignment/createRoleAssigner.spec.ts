import { Player } from "../index";
import createRoleAssigner, { RolesBagCreator } from "./createRoleAssigner";
import { getUnshuffledRolesBag, RolesBag } from "./createRolesBagCreator";

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

function createInitialState(nPlayers: number): Player[] {
  return names.slice(0, nPlayers).map((name) => ({
    name,
    role: null,
    title: null,
  }));
}

[5, 6, 7, 8, 9, 10].forEach((nPlayers) => {
  it(`should assign roles to ${nPlayers} players`, async () => {
    expect.hasAssertions();
    const assignRoles = createRoleAssigner(getUnshuffledRolesBag);

    const players = assignRoles(createInitialState(nPlayers));
    for (const player of players) {
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

  const players = assignRoles(createInitialState(roles.length));
  expect(players.map((player) => player.role)).toStrictEqual(roles);
});

it("should throw an error if roles cannot be assigned", async () => {
  expect.hasAssertions();

  const rolesBagCreator: RolesBagCreator = (_) => [];
  const assignRoles = createRoleAssigner(rolesBagCreator);

  expect(() => assignRoles(createInitialState(5))).toThrowError(
    "Assigning Roles Failed",
  );
});
