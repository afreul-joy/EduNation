// Problem 2 - Match Finder
// function matchFinder(string1, string2) {
//     if (typeof string1 !== "string" || typeof string2 !== "string") {
//       console.log("Both inputs should be strings.");
//       return;
//     }
  
//     const isMatch = string1.includes(string2);
//     console.log(isMatch);
//   }
  
//   matchFinder("John Doe", "ohn");
//   matchFinder("JavaScript", "Code");
//   matchFinder(109, 'hello');
  
//   // Problem 3 - Sort Maker
//   function sortMaker(arr) {
//     if (arr.some((num) => typeof num !== "number" || num < 0)) {
//       console.log("Invalid");
//       return;
//     }
  
//     const firstNum = arr[0];
//     const secondNum = arr[1];
  
//     if (firstNum === secondNum) {
//       console.log("equal");
//     } else if (secondNum > 0) {
//       const sortedArr = arr.slice().sort((a, b) => b - a);
//       console.log(sortedArr);
//     }
//   }
  
//   sortMaker([2, 3]);
//   sortMaker([4, 2]);
//   sortMaker([4, 4]);
  
//   // Problem 4 - Find Address
//   function findAddress(addressObj) {
//     const street = addressObj.street || "__";
//     const house = addressObj.house || "__";
//     const society = addressObj.society || "__";
  
//     console.log(street, house, society);
//   }
  
//   findAddress({ street: 10, house: "15A", society: "Earth Perfect" });
//   findAddress({ street: 10, society: "Earth Perfect" });