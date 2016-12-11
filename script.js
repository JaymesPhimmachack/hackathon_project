/* *******************************************************
 *
 * JavaScript implementation for the Hexagon Jigsaw Puzzle,
 * a hackathon project at Learn.ModernDeveloper
 * - https://learn.moderndeveloper.com
 *
 * Authors:
 * 1. Denine Guy
 * 2. Jaymes Phimmachack
 * 3. Joseph M. Matembu
 * 4. Lukas Andersen
 *
 * *******************************************************
 */



var settings = {};
var gameStarted = false;
var count = 0;
var bg = document.querySelector('#droppableZone');
var clock = document.getElementById('clock');
var hint = document.getElementById('hint');
var reset = document.getElementById('reset');
var easyButton = document.getElementById('easy');
var mediumButton = document.getElementById('medium');
var hardButton = document.getElementById('hard');
var scramble = document.getElementById('scramble');
var pieces = [].slice.call(document.querySelectorAll('.piece'));
var buttonsToHide = [easyButton, mediumButton, hardButton];
var difficultyButtons = document.querySelectorAll('.difficulty_button');
var animations = ["animate", "animate_rotate", "animate_horizontal", "animate_vertical", "animate_crazy"];
var puzzle = document.getElementById('solved-hint');
var timer = null;

// A few settings for the puzzle

settings.durationBeforeCongs = 3000; // In milliseconds
settings.difficulty = "easy"; // To be changed by user if they click the difficulty buttons
settings.durations = {"easy": 300, "medium": 150, "hard": 60}; // In seconds
settings.getDuration = function() {
  return this.durations[this.difficulty];
};
// Change the difficulty level when user clicks any of the difficulty buttons
settings.setDifficulty = function(value) {
  return this.difficulty = value;
};

// Get the difficulty selected by the user
easyButton.addEventListener('click', function() {
  settings.setDifficulty("easy");
}, false);
mediumButton.addEventListener('click', function() {
  settings.setDifficulty("medium");
}, false);
hardButton.addEventListener('click', function() {
  settings.setDifficulty("hard");
}, false);


// Drag and Drop

function drag(event) {
}

function dragStart(event) {
  console.log(event)
  event.dataTransfer.setData("text", event.target.id)
}

function dragEnd(event) {
  event.target.style.position = 'static';
}
function dragEnter(event) {}
function dragExit(event) {}
function dragLeave(event) {}

function dragOver(event) {
  event.preventDefault();
  event.dataTransfer.dropEffect = "move";
}

function drop(event) {
  event.preventDefault();
  var data = event.dataTransfer.getData("text");
  event.target.appendChild(document.getElementById(data));
}

function dragstartHandler(event) {
  console.log(event);
  event.dataTransfer.setData('text/plain', event.target.id);
}

function dropHandler(event) {
  var target44 = { x: 821, y: 453 };

  event.preventDefault();
  var data = event.dataTransfer.getData("text/plain");
   window.alert(event.clientX + ',' + event.clientY);


  if (event.clientX === target44.x && event.clientX === target44.x) {


      event.target.appendChild(document.getElementById(data));
      return false;

  }
}

function dragoverHandler(event) {
  event.preventDefault();
  event.dataTransfer.dropEffect = 'move';
}

// Scramble

function clickHandler(event) {
  bg.setAttribute('class', 'drop-zone unsolved')

  pieces.forEach(piece => {
    piece.style.display = 'block';
    piece.style.position = 'absolute';
    piece.style.top = Math.floor(Math.random() * (48+1)) + '%';
    piece.style.left = Math.floor(Math.random() * (87+1)) + '%';
    document.querySelector('#pieces-tray').appendChild(piece);
  });

  gameStarted = true;
  hideButtons(buttonsToHide);
  startClock(settings.getDuration());
  showControlsAndTimer();
  hideScrambleButton();
}

// Show and Hide Buttons

function showControlsAndTimer() {
  if (settings.difficulty !== "hard") {
    hint.setAttribute('class', 'hint-button');
  }
  reset.setAttribute('class', 'reset-button');
  clock.setAttribute('class', 'timer');
}

function hideControlsAndTimer() {
  var elements = [hint, reset, clock];
  for (var i in elements) {
    elements[i].setAttribute('class', 'hide-element');
  }
}

function hideScrambleButton() {
  scramble.setAttribute('class', 'hide-element');
}

// Show and Hide Hint

function showHint(event) {
  count++;
  puzzle.setAttribute('class', 'solved-puzzle solved');
  if(gameStarted === true && count > 3) {
    puzzle.setAttribute('class', 'hide-element');
    return;
  }
  event.preventDefault();
}

function hideHint(event) {
  puzzle.setAttribute('class', 'hide-element');
  event.preventDefault();
}

// Countdown Timer

function getTimeRemaining(endTime) {
    //Time remaining in milliseconds
    var timeRemaining = endTime - Date.parse(new Date());
    //gets the remaining seconds and minutes
    var seconds = Math.floor((timeRemaining / 1000) % 60);
    var minutes = Math.floor(((timeRemaining / 1000) / 60) % 60);

    var time = {};
    time.timeLeft = timeRemaining;
    time.minutes = minutes;
    time.seconds = seconds;

    return time;
}

function startClock(duration) {
  var ms = duration * 1000;
  var startTime = new Date(Date.parse(new Date()) + ms + 1000);

  timer = setInterval(function() {
    var tx = getTimeRemaining(startTime);

    var min = (('0' + tx.minutes).slice(-2));
    var sec = (('0' + tx.seconds).slice(-2));
    clock.innerHTML = min + ':' + sec;

    if(tx.timeLeft <= 0) {
      clearInterval(timer);
      playSound();
      resetGame();
    }
  }, 1000);
}

function playSound() {
    document.getElementById('audiotag1').play();
}

function stopClock() {
  clearInterval(timer);
  clock.innerHTML = '';
}

// Reset Game
function resetGame() {
  var elements = [hint, reset, clock];
  var i = 0;
  for (var i=0; i<elements.length; i++) {
    elements[i].setAttribute('class', 'hide-element');
  }
  for (var i=0; i<pieces.length; i++) {
    pieces[i].style.display = 'none';
  }

  difficultyButtons.forEach(function(element, index) {
    return element.classList.remove('hide-element');
  });

  gameStarted = false;
  count = 0;
  scramble.setAttribute('class', 'scramble-button button');
  bg.setAttribute('class', 'drop-zone solved');
  stopClock();
}

// Congradulate User


function shakeElements(elements) {
  /* Will store a randomly generated integer value,
   * needed in picking a random animation.
   */
  var randomIndex = 0;

  function shake(elementToShake, index) {
    // Generate random integer between 0 and the length of the array of animations.
    randomIndex = Math.floor(Math.random() * (animations.length));
    // Add a shake animation class to element.
    elementToShake.classList.add(animations[randomIndex]);
  }
  // Call the shake function on each element.
  elements.forEach(shake);
};

// Puzzle has been solved by gamer.
function congratulateUser() {
  setTimeout(shakeElements, 3000, pieces);
}
// Activate congratulations to user by calling the function.
//congratulateUser();

/***** Utitity functions *****/

function hideButtons (buttons) {

  return buttons.forEach(function(element, index) {
    return element.classList.add('hide-element');
  });

};
