import { expect, test } from "vite-plus/test";
import rankHand from "../src/index.ts";

// Allows testing calls that violate the type signature
const rankAnyHand = rankHand as (cards?: unknown) => number;

test("rank-hand with invalid hands", () => {
  expect(() => rankAnyHand(), "no hand").toThrow(TypeError);
  expect(() => rankAnyHand([]), "empty hand").toThrow(TypeError);
  expect(() => rankAnyHand([[]]), "empty card").toThrow(TypeError);
});

test("rank-hand with standard hands", () => {
  expect(rankHand(["Ks", "Qs", "Js", "Ts", "9s"]), "straight flush").toBe(1);
  expect(rankHand(["As", "Ah", "Ad", "Ac", "Ks"]), "four of a kind").toBe(2);
  expect(rankHand(["As", "Ah", "Ad", "Ks", "Kh"]), "full house").toBe(3);
  expect(rankHand(["As", "Qs", "Js", "Ts", "9s"]), "flush").toBe(4);
  expect(rankHand(["Ks", "Qh", "Jd", "Tc", "9s"]), "straight").toBe(5);
  expect(rankHand(["As", "Ah", "Ad", "Ks", "Qs"]), "three of a kind").toBe(6);
  expect(rankHand(["As", "Ah", "Ks", "Kh", "Qs"]), "two pairs").toBe(7);
  expect(rankHand(["As", "Ah", "Ks", "Qs", "Js"]), "one pair").toBe(8);
  expect(rankHand(["As", "Qh", "Js", "Ts", "9s"]), "high card").toBe(9);
});

test("rank-hand with specially named hands", () => {
  expect(rankHand(["As", "Ks", "Qs", "Js", "Ts"]), "royal flush").toBe(1);
  expect(rankHand(["5s", "4s", "3s", "2s", "As"]), "steel wheel").toBe(1);
  expect(rankHand(["5s", "4h", "3d", "2c", "As"]), "baby straight").toBe(5);
});

test("rank-hand with tuples", () => {
  expect(
    rankHand([
      ["K", "s"],
      ["Q", "s"],
      ["J", "s"],
      ["T", "s"],
      ["9", "s"],
    ]),
    "straight flush",
  ).toBe(1);
  expect(
    rankHand([
      ["A", "s"],
      ["A", "h"],
      ["A", "d"],
      ["A", "c"],
      ["K", "s"],
    ]),
    "four of a kind",
  ).toBe(2);
  expect(
    rankHand([
      ["A", "s"],
      ["A", "h"],
      ["A", "d"],
      ["K", "s"],
      ["K", "h"],
    ]),
    "full house",
  ).toBe(3);
  expect(
    rankHand([
      ["A", "s"],
      ["Q", "s"],
      ["J", "s"],
      ["T", "s"],
      ["9", "s"],
    ]),
    "flush",
  ).toBe(4);
  expect(
    rankHand([
      ["K", "s"],
      ["Q", "h"],
      ["J", "d"],
      ["T", "c"],
      ["9", "s"],
    ]),
    "straight",
  ).toBe(5);
  expect(
    rankHand([
      ["A", "s"],
      ["A", "h"],
      ["A", "d"],
      ["K", "s"],
      ["Q", "s"],
    ]),
    "three of a kind",
  ).toBe(6);
  expect(
    rankHand([
      ["A", "s"],
      ["A", "h"],
      ["K", "s"],
      ["K", "h"],
      ["Q", "s"],
    ]),
    "two pairs",
  ).toBe(7);
  expect(
    rankHand([
      ["A", "s"],
      ["A", "h"],
      ["K", "s"],
      ["Q", "s"],
      ["J", "s"],
    ]),
    "one pair",
  ).toBe(8);
  expect(
    rankHand([
      ["A", "s"],
      ["Q", "h"],
      ["J", "s"],
      ["T", "s"],
      ["9", "s"],
    ]),
    "high card",
  ).toBe(9);
});
