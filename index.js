/**
 * Inspired by https://www.codeproject.com/Articles/569271/A-Poker-hand-analyzer-in-JavaScript-using-bit-math
 */

const cardRanks = {
  A: 14,
  K: 13,
  Q: 12,
  J: 11,
  T: 10,
  9: 9,
  8: 8,
  7: 7,
  6: 6,
  5: 5,
  4: 4,
  3: 3,
  2: 2,
};

const suitFlags = { c: 1, d: 2, h: 4, s: 8 };

export default function (cards) {
  // The histogram of each rank as bits 51 to 0, with one nibble for each rank
  // E.g., fours over twos (4,4,4,2,2) is 0b011100000011 (0x703)
  let countBits = 0;

  // The 13 card ranks as bits 15 to 2 sorted by rank order
  // E.g., a five-high straight (5,4,3,2,A) is 0b0100000000111100 (0x403C)
  let rankBits = 0;

  // The suits as bits 3 to 0
  // E.g., a flush is 0b0001 (0x1), 0b0010 (0x2), 0b0100 (0x4) or 0b1000 (0x8)
  let suitBits = 0;

  for (let i = 0; i < 5; i += 1) {
    // The card rank, where A is 14, K is 13, Q is 12, J is 11, T is 10, 2 is 2
    const cardRank = cardRanks[cards[i][0]];

    // The card suit flag, where c is 1, d is 2, h is 4, and s is 8
    const suitFlag = suitFlags[cards[i][1]];

    // The nibble offset to store the 4 bits with the counts of each card rank
    const nibbleOffset = 2 ** (cardRank * 4);

    countBits += nibbleOffset * (((countBits / nibbleOffset) & 15) + 1);
    rankBits |= 1 << cardRank;
    suitBits |= suitFlag;
  }

  // The index of the hand ranks is the card rank count bits % 15 - 1:
  // full house is 9, e.g., 0b011100010001 % 15 - 1 = 9
  // three of a kind is 8, e.g., 0b011100010001 % 15 - 1 = 8
  // two pair is 6, e.g., 0b001100110001 % 15 - 1 = 6
  // one pair is 5, e.g., 0b0011000100010001 % 15 - 1 = 5
  // high card is 4, e.g., 0b00010001000100010001 % 15 - 1 = 4
  // flush is 3, i.e., the index of high card - 1
  // straight is 2, i.e., the index of high card - 2
  // straight flush is 1, i.e., the index of straight - 1 (or high card - 3)
  // four of a kind is 0, e.g., 0b011100010001 % 15 - 1 = 0 (like 16 % 15 - 1)
  const handRankIndex =
    // Index the hand rank by the card rank histogram
    (countBits % 15) -
    // Check straight (any five consecutive 1s) and five-high straight (0x403c)
    (rankBits / (rankBits & -rankBits) === 31 || rankBits === 0x403c ? 3 : 1) -
    // Check flush (only 1 suit, i.e., a power of two)
    ((suitBits & -suitBits) === suitBits);

  return [2, 1, 5, 4, 9, 8, 7, 0, 6, 3][handRankIndex];
}
