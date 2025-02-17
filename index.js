"use strict";

const mockData = require("./mockData.js").data;
// using npm install prompt-sync to prompt user for input with node index.js
const prompt = require("prompt-sync")();

// empty user profile to store the answers to.
const userProfile = {
  first_name: "",
  last_name: "",
  age: "",
  gender: "",
  gender_interest: "",
  location: "",
  min_age_interest: "",
  max_age_interest: "",
};

// const variable array of questions to prompt user for input.
const questions = [
  "What is your first name?",
  "What is your last name?",
  "How old are you?",
  "What is your gender? M/F/X",
  "What genders are you interested in? M/F/X",
  "What is your location type? Rural or city?",
  "What is your prefered minimum age?",
  "What is your prefered maximum age?",
];

// while loop to prompt questions with input checks
let i = 0;
while (i < questions.length) {
  const answer = prompt(questions[i]);

  // checks for no empty strings and only letters for first and last name
  if (i === 0 && (answer.trim() === "" || !/^[a-zA-Z]+$/.test(answer))) {
    console.log("Please enter a valid first name with letters only.");
    continue;
  } else if (i === 1 && (answer.trim() === "" || !/^[a-zA-Z]+$/.test(answer))) {
    console.log("Please enter a valid last name with letters only.");
    continue;

    // checks for numbers and age 18 or older
  } else if (i === 2 && (isNaN(Number(answer)) || Number(answer) < 18)) {
    console.log("Please enter a valid age (18 or older).");
    continue;
  } else if (i === 6 && (isNaN(Number(answer)) || Number(answer) < 18)) {
    console.log("Please enter a valid minimum age interest (18 or older).");
    continue;
  } else if (i === 7 && (isNaN(Number(answer)) || Number(answer) < 18)) {
    console.log("Please enter a valid maximum age interest (18 or older).");
    continue;

    // checks for M, F, or X input in uppercase
  } else if (i === 3 && !["M", "F", "X"].includes(answer.toUpperCase())) {
    console.log("Please enter M, F, or X for gender.");
    continue;
  } else if (i === 4 && !["M", "F", "X"].includes(answer.toUpperCase())) {
    console.log("Please enter M, F, or X for gender interest.");
    continue;

    // checks for the correct input for location, rural or city
  } else if (i === 5 && !["rural", "city"].includes(answer)) {
    console.log("Please enter rural or city for your location.");
    continue;
  }

  // stores the answers to the userProfile object
  userProfile[Object.keys(userProfile)[i]] = answer;
  i++;
}

// Additional check for max age interest being higher than min age interest
if (userProfile.max_age_interest < userProfile.min_age_interest) {
  console.log(
    "Your maximum age interest is lower than your minimum age interest."
  );
  process.exit();
}

// Loop through mockData array and count the number of matches.
let matches = [];
mockData.forEach((person) => {
  if (
    person.age >= userProfile.min_age_interest &&
    person.age <= userProfile.max_age_interest &&
    userProfile.age >= person.min_age_interest &&
    userProfile.age <= person.max_age_interest &&
    person.gender_interest.includes(userProfile.gender) &&
    userProfile.gender_interest.includes(person.gender) &&
    person.location.toLowerCase() === userProfile.location.toLowerCase()
  ) {
    matches.push(person);
  }
});

// Print out the number of matches, including name, age, and location.
console.log(`Number of matches: ${matches.length}`);
matches.forEach((match) => {
  console.log(
    `You have a match! ${match.first_name} ${match.last_name}, Age: ${match.age}, Location: ${match.location}`
  );
});
