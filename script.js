/* 
length of array = length that uses chooses:
var password = new Array(#)

for (var i = 0; i < password.length; i++) {
  password[i] = (random char);
}
*/
/* 
at least TWO layers of RNG:
- characters
- types of characters

COMBINE the characters that are allowed?
*/

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// character sets for password
var symbols = "!@#$%^&*(){}[]=<>/.";
var upperCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var lowerCaseLetters = "abcdefghijklmnopqrstuvwxyz";
var numbers = "0123456789";

// variables that randomly select from respective characters
/* var symbolsSelect = symbols.charAt(Math.floor(Math.random() * (((symbols.length - 1) - 0 + 1) + 0)));
var upperSelect = upperCaseLetters.charAt(Math.floor(Math.random() * (((upperCaseLetters.length - 1) - 0 + 1) + 0)));
var lowerSelect = lowerCaseLetters.charAt(Math.floor(Math.random() * (((lowerCaseLetters.length - 1) - 0 + 1) + 0)));
var numberSelect = numbers.charAt(Math.floor(Math.random() * (((numbers.length - 1) - 0 + 1) + 0))); */

/* console.log(symbolsSelect);
console.log(upperSelect);
console.log(lowerSelect);
console.log(numberSelect); */

// object that stores PW char set conditions
var pwConditions = 
{
  specialChar: true,
  upperCase: true,
  lowerCase: true,
  numbers: true,
};

// asks how many characters
// if length is between 8 - 128, accept. Otherwise, "Password length should be between 8-128 characters"
function howManyChars() {
  var pwPrompt = prompt("How many characters? Choose a number between 8-128.");
  
  // if user cancels the prompt, end early & return nothing
  if (pwPrompt === null) {
    return null;
  }

  // if user doesn't cancel, convert user answer to number
  pwPrompt = parseInt(pwPrompt);

  // while user prompt is less than 8, more than 128, not a number, or left blank...continue asking for number
  while (pwPrompt < 8 || pwPrompt > 128 || typeof parseInt(pwPrompt) !== "number" || !pwPrompt) {
    pwPrompt = prompt("Please select a number between 8-128.");
    if (pwPrompt === null) { // same "end early by hitting cancel" statement as above
      return null;
    }
    pwPrompt = parseInt(pwPrompt);
  }
  return parseInt(pwPrompt);
}

// asks for special characters
function specialCharCheck() {
  if (confirm("Would you like special characters?")) {
    pwConditions.specialChar = true;
  }
  else {
    pwConditions.specialChar = false;
  }
  return pwConditions.specialChar;
}

// asks for upper case
function upperCaseCheck() {
  if (confirm("Would you like upper case characters?")) {
    pwConditions.upperCase = true;
  }
  else {
    pwConditions.upperCase = false;
  }
  return pwConditions.upperCase;
}

// asks for lower case
function lowerCaseCheck() {
  if (confirm("Would you like lower case characters?")) {
    pwConditions.lowerCase = true;
  }
  else {
    pwConditions.lowerCase = false;
  }
  return pwConditions.lowerCase;
}

// asks for numbers
function numCheck() {
  if (confirm("Would you like numbers?")) {
    pwConditions.numbers = true;
  }
  else {
    pwConditions.numbers = false;
  }
  return pwConditions.numbers;
}

// after prompts, generate password
// nothing selected? Can't generate password.
function generatePassword() {
  // initializes password
  var password = "";

  // aggregates selected character sets; resets every time the button is pressed
  var pwAggregator = "";
  
  // password length + asks how many chars user wants by calling function
  // if user hits cancel, ends function early
  var pwLength = howManyChars();
  if (pwLength === null) {
    return null;
  }

  // prompts user to choose symbols, upper case letters, lower case letters, and/or numbers
  // stores respective values in character aggregator
  pwAggregator = specialCharCheck() ? pwAggregator.concat(symbols) : pwAggregator.concat();
  pwAggregator = upperCaseCheck() ? pwAggregator.concat(upperCaseLetters) : pwAggregator.concat();
  pwAggregator = lowerCaseCheck() ? pwAggregator.concat(lowerCaseLetters) : pwAggregator.concat();
  pwAggregator = numCheck() ? pwAggregator.concat(numbers) : pwAggregator.concat();

  // if user didn't choose any char set, end function early & return a message
  if (pwAggregator === "") {
    return "You need at least one set of characters to form a password!"
  }

  // for chosen Password length, add a random char from up to 4 randomly selected pools
  for (var i = 0; i < pwLength; i++) {
    var rng = Math.floor(Math.random() * ((pwAggregator.length - 1) - 0 + 1) + 0); // random number generator resets itself for every loop
    password = password.concat(pwAggregator[rng]);
  }
  
  return password.toString();
}

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", function () {
  writePassword()
});
