import test from "node:test";
import assert from "node:assert/strict";
import rankHand from "./index.js";

test("rank-hand with invalid hands", () => {
  assert.throws(() => rankHand(), TypeError, "no hand");
  assert.throws(() => rankHand([]), TypeError, "empty hand");
  assert.throws(() => rankHand([[]]), TypeError, "empty card");
});

test("rank-hand with standard hands", () => {
  assert.equal(rankHand(["Ks", "Qs", "Js", "Ts", "9s"]), 1, "straight flush");
  assert.equal(rankHand(["As", "Ah", "Ad", "Ac", "Ks"]), 2, "four of a kind");
  assert.equal(rankHand(["As", "Ah", "Ad", "Ks", "Kh"]), 3, "full house");
  assert.equal(rankHand(["As", "Qs", "Js", "Ts", "9s"]), 4, "flush");
  assert.equal(rankHand(["Ks", "Qh", "Jd", "Tc", "9s"]), 5, "straight");
  assert.equal(rankHand(["As", "Ah", "Ad", "Ks", "Qs"]), 6, "three of a kind");
  assert.equal(rankHand(["As", "Ah", "Ks", "Kh", "Qs"]), 7, "two pairs");
  assert.equal(rankHand(["As", "Ah", "Ks", "Qs", "Js"]), 8, "one pair");
  assert.equal(rankHand(["As", "Qh", "Js", "Ts", "9s"]), 9, "high card");
});

test("rank-hand with specially named hands", () => {
  assert.equal(rankHand(["As", "Ks", "Qs", "Js", "Ts"]), 1, "royal flush");
  assert.equal(rankHand(["5s", "4s", "3s", "2s", "As"]), 1, "steel wheel");
  assert.equal(rankHand(["5s", "4h", "3d", "2c", "As"]), 5, "baby straight");
});

test("rank-hand with tuples", () => {
  assert.equal(
    rankHand([
      ["K", "s"],
      ["Q", "s"],
      ["J", "s"],
      ["T", "s"],
      ["9", "s"],
    ]),
    1,
    "straight flush",
  );
  assert.equal(
    rankHand([
      ["A", "s"],
      ["A", "h"],
      ["A", "d"],
      ["A", "c"],
      ["K", "s"],
    ]),
    2,
    "four of a kind",
  );
  assert.equal(
    rankHand([
      ["A", "s"],
      ["A", "h"],
      ["A", "d"],
      ["K", "s"],
      ["K", "h"],
    ]),
    3,
    "full house",
  );
  assert.equal(
    rankHand([
      ["A", "s"],
      ["Q", "s"],
      ["J", "s"],
      ["T", "s"],
      ["9", "s"],
    ]),
    4,
    "flush",
  );
  assert.equal(
    rankHand([
      ["K", "s"],
      ["Q", "h"],
      ["J", "d"],
      ["T", "c"],
      ["9", "s"],
    ]),
    5,
    "straight",
  );
  assert.equal(
    rankHand([
      ["A", "s"],
      ["A", "h"],
      ["A", "d"],
      ["K", "s"],
      ["Q", "s"],
    ]),
    6,
    "three of a kind",
  );
  assert.equal(
    rankHand([
      ["A", "s"],
      ["A", "h"],
      ["K", "s"],
      ["K", "h"],
      ["Q", "s"],
    ]),
    7,
    "two pairs",
  );
  assert.equal(
    rankHand([
      ["A", "s"],
      ["A", "h"],
      ["K", "s"],
      ["Q", "s"],
      ["J", "s"],
    ]),
    8,
    "one pair",
  );
  assert.equal(
    rankHand([
      ["A", "s"],
      ["Q", "h"],
      ["J", "s"],
      ["T", "s"],
      ["9", "s"],
    ]),
    9,
    "high card",
  );
});
