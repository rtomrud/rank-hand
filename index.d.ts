/**
 * The card rank.
 */
export type rank =
  | "A"
  | "K"
  | "Q"
  | "J"
  | "T"
  | "9"
  | "8"
  | "7"
  | "6"
  | "5"
  | "4"
  | "3"
  | "2";

/**
 * The card suit, where c is clubs, d is diamonds, h is hearts and s is spades.
 */
export type suit = "c" | "d" | "h" | "s";

/**
 * Return the rank of a hand given an array of 5 cards.
 *
 * @param cards - An array of 5 pairs of [`rank`, `suit`], where
 * `rank` is `"A"|"K"|"Q"|"J"|"T"|"9"|"8"|"7"|"6"|"5"|"4"|"3"|"2"` and
 * `suit` is `"c"|"d"|"h"|"s"`,
 * or alternatively, an array of 5 strings in standard poker hand notation,
 * e.g., `["Ac", "Ad", "Kd", "Qh", "2s"]`.
 * @returns The rank of the hand, from 1 (straight flush) to 9 (high card).
 * @throws {TypeError} The hand is invalid.
 */
export default function rankHand(
  cards: [
    "A" | "K" | "Q" | "J" | "T" | "9" | "8" | "7" | "6" | "5" | "4" | "3" | "2",
    "c" | "d" | "h" | "s",
  ][],
): number;
