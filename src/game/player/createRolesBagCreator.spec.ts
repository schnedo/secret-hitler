// see /Secret_Hitler_Rules.pdf page 2
import createRolesBagCreator, { RolesShuffler } from "./createRolesBagCreator";

const roleRules = [
  {
    players: 5,
    liberals: 3,
    fascists: 1,
    hitlers: 1,
  },
  {
    players: 6,
    liberals: 4,
    fascists: 1,
    hitlers: 1,
  },
  {
    players: 7,
    liberals: 4,
    fascists: 2,
    hitlers: 1,
  },
  {
    players: 8,
    liberals: 5,
    fascists: 2,
    hitlers: 1,
  },
  {
    players: 9,
    liberals: 5,
    fascists: 3,
    hitlers: 1,
  },
  {
    players: 10,
    liberals: 6,
    fascists: 3,
    hitlers: 1,
  },
];

for (const { players, fascists, hitlers, liberals } of roleRules) {
  it(`should have ${liberals} liberals, ${fascists} fascists and ${hitlers} hitlers when playing with ${players} players`, async () => {
    expect.hasAssertions();
    const shuffle: RolesShuffler = (rolesBag) => rolesBag;
    const createRolesBag = createRolesBagCreator(shuffle);

    const rolesBag = createRolesBag(players);
    const liberalsInBag = rolesBag.filter((role) => role === "liberal");
    expect(liberalsInBag.length).toBe(liberals);
    const fascistsInBag = rolesBag.filter((role) => role === "fascist");
    expect(fascistsInBag.length).toBe(fascists);
    const hitlersInBag = rolesBag.filter((role) => role === "hitler");
    expect(hitlersInBag.length).toBe(hitlers);
  });
}

it("should call provided shuffle function", async () => {
  expect.hasAssertions();
  const shuffle = jest.fn();
  const createRolesBag = createRolesBagCreator(shuffle);

  expect(shuffle).not.toHaveBeenCalled();
  createRolesBag(5);
  expect(shuffle).toHaveBeenCalledTimes(1);
  createRolesBag(5);
  expect(shuffle).toHaveBeenCalledTimes(2);
});
