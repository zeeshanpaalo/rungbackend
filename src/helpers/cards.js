const suits = ["H", "S", "C", "D"];
const numbers = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
];

const deck = [
  "HA",
  "H2",
  "H3",
  "H4",
  "H5",
  "H6",
  "H7",
  "H8",
  "H9",
  "H10",
  "HJ",
  "HQ",
  "HK",
  "SA",
  "S2",
  "S3",
  "S4",
  "S5",
  "S6",
  "S7",
  "S8",
  "S9",
  "S10",
  "SJ",
  "SQ",
  "SK",
  "CA",
  "C2",
  "C3",
  "C4",
  "C5",
  "C6",
  "C7",
  "C8",
  "C9",
  "C10",
  "CJ",
  "CQ",
  "CK",
  "DA",
  "D2",
  "D3",
  "D4",
  "D5",
  "D6",
  "D7",
  "D8",
  "D9",
  "D10",
  "DJ",
  "DQ",
  "DK",
];

//   The Fisher Yates Method

//   The most popular correct method, is called the Fisher Yates shuffle, and was introduced in data science as early as 1938!

//   In JavaScript the method can be translated to this:

for (i = deck.length - 1; i > 0; i--) {
  j = Math.floor(Math.random() * i);
  k = deck[i];
  deck[i] = deck[j];
  deck[j] = k;
}

console.log(deck);

const firstPlayer = deck.slice(0, 13);
const secondPlayer = deck.slice(13, 26);
const thirdPlayer = deck.slice(26, 39);
const fourthPlayer = deck.slice(39, 52);

console.log(firstPlayer, secondPlayer, thirdPlayer, fourthPlayer);
