/* 1.
I want to validate a password string by the following rules:
1. IF there are numberrs, they MUST be at the end.
2. Letters CAN be lowercase or uppercase
3. The password MUST be at least 2-characters long, AND when it is only 2-characters long, it must not contain a number. 
*/

// let numberTest = /\d*$/; // Only numbers can end the string [0 or more]
// let bothCaseLetters = /^[a-zA-Z]{2, }/; // Only Alphabets of any case can start the string
// // let minTwoCahract = /{2,}/; // Minimum of two characters

// let pass = "JackOfAllTrades";

// console.log(bothCaseLetters.test(pass));

/*
I want to validate a password string by the following rules:
1. It must be a maximum 0f 5 characters long
2. it can contain any number of characters of NON-Digit characters
3. It must contain max of 2 digit characters.
*/

let myRegEx = /(?=\w){5}(?=\D*\d{2})/;

let sand = " This SandWhich is Good     ";

let stone = sand.replace(/\s+/g, "");

console.log(sand.length);
console.log(stone.length);
console.log(sand);
console.log(stone);
