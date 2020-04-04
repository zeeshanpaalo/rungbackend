const deck = ["d1", "d2", "d3", "h1", "h2", "h3", "s1", "s2", "s3", "c1", "c2", "c3"]

// const cardDistributor = (cardsDeck) => {
//   //logic to randomly generate the distributed array
//   const returnDeck = { firstPlayer: [cardsDeck[0], cardsDeck[5], cardsDeck[7]], secondPlayer: [cardsDeck[2], cardsDeck[5]] }
//   console.log(returnDeck);
//   return returnDeck;
// }

// function calculator(a, b, operation) {
//   let result;
//   switch (operation) {
//     case "add": {
//       result = a + b;
//       break;
//     };
//     case "minus": {
//       result = a - b;
//       break;
//     }
//     case "multiply": {
//       result = a * b;
//       break;
//     }
//     case "divide": {
//       result = a / b;
//       break;
//     }
//   }
//   return result;
// }

// const answer = calculator(15, 4, "divide");
// console.log(answer);
// answer = calculator(15, 4, "add");
// console.log(answer);


// function cardDistributor_v2(cardsDeck) {
//   //logic to randomly generate the distributed array
//   const returnDeck = { firstPlayer: [cardsDeck[0], cardsDeck[5], cardsDeck[7]], secondPlayer: [cardsDeck[2], cardsDeck[5]] }
//   console.log(returnDeck);
//   return returnDeck;
// }
// cardDistributor_v2(deck);

// function friendChanger(friends, newFriend, index) {
//   friends[index] = newFriend;
//   return friends
// };

// const faheemsFriend = { first: "boqo", second: "nasir" }
// const changedFriends = friendChanger(faheemsFriend, "zahidto", "second");
// console.log(changedFriends);

// const arr = [11, 2, 3];
// arr.push = () => {
//   console.log("new push");
// }
// arr.push(5);
// console.log(typeof arr.push);


// class Car {
//   constructor(model, company) {
//     this.model = model;
//     this.company = company
//   }
//   getModel() {
//     return this.model
//   };
//   getCompany() {
//     return this.company
//   }
// }

// const car1 = new Car("1967", "BMW");
// const car2 = new Car("2000", "TESLA");
// const company = car1.getCompany();
// const company1 = car2.getCompany();
// console.log(company, company1)


// class Array {
//   constructor(a, b, c) {
//     this.a = a;
//     this.b = b;
//     this.c = c;
//   }
//   getValueAtIndex(index) {
//     return this[index];
//   }
// }

// const arr = new Array("a", "b", "c");
// console.log(arr.getValueAtIndex("a"))