# rank-hand

Ranks a poker hand.

## Installing

```bash
npm install rank-hand
```

## API

### `rankHand(cards)`

Return the rank of a hand given an array of 5 cards.

`cards` is an array of 5 pairs of [`rank`, `suit`], where `rank` is `"A"|"K"|"Q"|"J"|"T"|"9"|"8"|"7"|"6"|"5"|"4"|"3"|"2"` and `suit` is `"c"|"d"|"h"|"s"`, or alternatively, an array of 5 strings in standard poker hand notation, e.g., `["Ac", "Ad", "Kd", "Qh", "2s"]`.

Returns the rank of the hand, from 1 (straight flush) to 9 (high card).

Throws `TypeError` if the hand is invalid.

```js
import rankHand from "rank-hand";

// Straight flush
rankHand(["As", "Ks", "Qs", "Js", "Ts"]);
// => 1

// Four of a kind
rankHand(["As", "Ah", "Ad", "Ac", "Ks"]);
// => 2

// Full house
rankHand(["As", "Ah", "Ad", "Ks", "Kh"]);
// => 3

// Flush
rankHand(["As", "Qs", "Js", "Ts", "9s"]);
// => 4

// Straight
rankHand(["As", "Kh", "Qd", "Jc", "Ts"]);
// => 5

// Three of a kind
rankHand(["As", "Ah", "Ad", "Ks", "Qs"]);
// => 6

// Two pair
rankHand(["As", "Ah", "Ks", "Kh", "Qs"]);
// => 7

// One pair
rankHand(["As", "Ah", "Ks", "Qs", "Js"]);
// => 8

// High card
rankHand(["As", "Qh", "Js", "Ts", "9s"]);
// => 9
```
