import createPolicyDeckCreator from "./createPolicyDeckCreator";

it("should shuffle the deck", async () => {
  expect.hasAssertions();
  const expected = ["foo"];
  const shuffle = jest.fn().mockImplementation(() => expected);
  const createPolicyDeck = createPolicyDeckCreator(shuffle);

  expect(createPolicyDeck()).toStrictEqual(expected);
  expect(shuffle).toHaveBeenCalledTimes(1);
});
