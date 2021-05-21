import Player from "./Player";
import { PlayerId } from "./reducer";

// see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#getting_a_random_integer_between_two_values
function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

export default function chooseFirstPresident(players: Player[]): PlayerId {
  return getRandomInt(0, players.length);
}
