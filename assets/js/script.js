"use strict";

// SET STARTING CONDITIONS //

// set an array for scores, array[0] = p1 [1] = p2
const scores = [0, 0];
// our delay timer
const delayTimer = 1000;
// set a current score and active player for choosing who gets the score and checking the current player
let currentScore = 0;
let activePlayer = 0;
// set a winning score up here so we don't have to change it later
const winningScore = 100;

// GET OUR ELEMENTS //

// Get our button Elements
const btnNew = document.querySelector(".btn-new");
const btnRoll = document.querySelector(".btn-roll");
const btnHold = document.querySelector(".btn-hold");

// Get Our Player Elements
const player0 = document.querySelector(".player-0");
const player1 = document.querySelector(".player-1");

// Get Our Score Elements
const score0EL = (document.querySelector("#score-0").textContent = scores[0]);
const score1EL = document.getElementById("score-1"),
  textContent = scores[1]; // we can  use get element by id too but doesn't matter unless large loads

// Get Current Scores
const current0EL = document.getElementById("current-0");
const current1EL = document.getElementById("current-1");

// Our Dice Element
const diceEL = document.querySelector(".dice");

// FUNCTIONS

// select player function
const player_select = function () {
  //we get the players choice and make an array of choices
  const playerChoice = prompt("Choose one: HEADS or TAILS?");
  const choiceArray = ["HEADS", "TAILS"];
  //Then using math floor + random we can get either 0 heads or 1 tails back
  const randomChoice =
    choiceArray[Math.floor(Math.random() * choiceArray.length)];

  // We then do checks to see if the choices were correct we're basing this off of three rules,
  // 1. The players select their player (either 1 or two)
  // 2. P1 decides on coin toss
  // 3. IF p1 correct he goes first, if not p2 goes first

  // firstly IF the choice = Null (empty or they hit cancel) or the choice is not in the array
  // default to player 1
  if (
    playerChoice === null ||
    choiceArray.includes(playerChoice.toUpperCase()) === false
  ) {
    console.log(playerChoice);
    window.alert("No / Bad Selection, Player 1 Goes First");
    player0.classList.add("player-active");
    // if the player 1 chooses wrong player 2 goes first
  } else if (playerChoice.toUpperCase() !== randomChoice) {
    player1.classList.add("player-active");
    window.alert(`It's ${randomChoice}! Player 2 Goes First`);
    activePlayer = 1;
    // if they choose right player 1 goes first
  } else if (playerChoice.toUpperCase() === randomChoice) {
    player0.classList.add("player-active");
    window.alert(`It's ${randomChoice}! Player 1 Goes First`);
    activePlayer = 0;
  }
};

// Function to swap player, we write this in multiple places so it's good to have a fn for it

const swapPlayer = function () {
  // set current score to 0 in case it wasn't caught
  currentScore = 0;
  // using a ternaiary operator, check and see active player, if one was active make it 0 and vice versa
  activePlayer = activePlayer === 0 ? 1 : 0;
  // toggle the active player class
  player0.classList.toggle("player-active");
  player1.classList.toggle("player-active");
};

// Another function to store commonly written code, wipes the score in the event a player swap is needed
const wipeScore = function () {
  document.getElementById(`current-${activePlayer}`).textContent = 0;
  currentScore = 0;
};

// A delay function to stop our popup from hitting before the page loads adjustable in settings above
const delay = function (i) {
  window.onload = function () {
    setTimeout(function () {
      player_select();
    }, i);
  };
};

// MAIN GAME LOOP FUNCTIONALITY //

// Delay function first to ensure smooth loading

delay(delayTimer);

// Dice roll functionality

btnRoll.addEventListener("click", function () {
  // Create a dice const for every roll, inside the fn so it gets created on every click
  const dice = Math.trunc(Math.random() * 6) + 1;

  // display dice by removing hidden class
  diceEL.classList.remove("hidden");
  // Set our dice src image, we use a template literal to swap the actual dice image easily without having to call 6 diff variables
  diceEL.src = `assets/img/dice/dice-${dice}.png`;

  // check for 1  rolled if not 1
  if (dice !== 1) {
    // Add to current score and roll
    currentScore += dice;
    // Call the active player here, we can dynamically do it with template literals
    document.getElementById(`current-${activePlayer}`).textContent =
      currentScore;
    // if dice is 1
  } else {
    // Remove their score
    wipeScore();
    // Switch player
    swapPlayer();
  }
});

// Holding the score button
btnHold.addEventListener("click", function () {
  // Add current score to active player's score
  scores[activePlayer] += currentScore;
  // We then assign it to the players score
  document.getElementById(`score-${activePlayer}`).textContent =
    scores[activePlayer];
  // Then remove the current score (so it doesn't stay / add up)
  wipeScore();
  // Check score if its above the win condition (in variables above) we...
  if (scores[activePlayer] >= winningScore) {
    // assign a winner class
    document
      .querySelector(`.player-${activePlayer}`)
      .classList.add("player-winner");
    // remove active class
    document
      .querySelector(`.player-${activePlayer}`)
      .classList.remove("player-active");
    // also hide the buttons except for new game for aesthetic purposes
    btnHold.classList.add("hidden");
    btnRoll.classList.add("hidden");
    document.getElementById(`current-${activePlayer}`).textContent = "Winner!";
    // if not won, swap the player
  } else {
    wipeScore();
    swapPlayer();
  }
});

// RESET THE GAME

// finally we want to reset the game, seeing as we have no highscore variabele to keep track
// of we can just use location reload like last time without the localstorage

btnNew.addEventListener("click", function () {
  location.reload();
});
