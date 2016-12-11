


// Drap and Drop


function dragstartHandler(event) {
  console.log(event);
  event.dataTransfer.setData("text/plain", event.target.id);
}

function dropHandler(event) {
  event.preventDefault();
  var data = event.dataTransfer.getData("text/plain");
  event.target.appendChild(document.getElementById(data));
}

function dragoverHandler(event) {
  event.preventDefault();
  event.dataTransfer.dropEffect = "move";
}

// Scramble

function clickHandler(event) {
  var bg = document.querySelector('#droppableZone');
  var pieces = [].slice.call(document.querySelectorAll('.piece'));

  bg.setAttribute('class', 'drop-zone unsolved')

  pieces.forEach(piece => {
    piece.style.display = 'block'
    piece.style.position = 'absolute';
    piece.style.top = Math.floor(Math.random() * (48+1)) + '%';
    piece.style.left = Math.floor(Math.random() * (87+1)) + '%';
    document.querySelector('#pieces-tray').appendChild(piece);
  });

  showControlsAndTimer();
  hideScramble();
  startClock(5);
}

// Show and Hide Buttons
function showControlsAndTimer() {
  var hint = document.getElementById('hint');
  hint.setAttribute("class", "hint-button");

  var reset = document.getElementById('reset');
  reset.setAttribute("class", "reset-button");

  var clock = document.getElementById('clock');
  clock.setAttribute("class", "timer");
}

function hideScramble() {
  var scramble = document.getElementById('scramble');
  scramble.setAttribute("class", "hide-element");
}

// Show and Hide Hint
function showHint(event) {
  var puzzle = document.getElementById('solved-hint');
  puzzle.setAttribute("class", "solved-puzzle solved");
  event.preventDefault();
}

function hideHint(event) {
  var puzzle = document.getElementById('solved-hint');
  puzzle.setAttribute("class", "hide-element");
  event.preventDefault();
}

// Countdown Clock
function getTimeRemaining(endTime) {
  //Time remaining in milliseconds
  var timeRemaining = endTime - Date.parse(new Date());
  //gets the remaining seconds and minutes
  var seconds = Math.floor((timeRemaining/1000) % 60);
  var minutes = Math.floor(((timeRemaining/1000) / 60) % 60);

  var time = {};
  time.timeLeft = timeRemaining;
  time.minutes = minutes;
  time.seconds = seconds;

  return time;
}

function startClock(duration) {
  var ms = duration * 1000;
  var startTime = new Date(Date.parse(new Date()) + ms + 1000);
  var clock = document.getElementById('clock');

  var timer = setInterval(function() {
    var tx = getTimeRemaining(startTime);

    var min = (('0' + tx.minutes).slice(-2));
    var sec = (('0' + tx.seconds).slice(-2));
    clock.innerHTML = min + ':' + sec;

    if(tx.timeLeft <= 0) {
      clearInterval(timer);
      playSound();
    }
  }, 1000);
}

function playSound() {
  document.getElementById('audiotag1').play();
}

// Congradulate User

(function() {
  
  
  var shakeElements = function(elements) {
    /* Will store a randomly generated integer value,
     * needed in picking a random animation.
     */
    var randomIndex = 0;
    var elementsToShake = document.querySelectorAll('.piece');
    var animations = ["animate", "animate_rotate", "animate_horizontal", "animate_vertical", "animate_crazy"];
    
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
  var puzzleSolved = function() {
    setTimeout(shakeElements, 3000, elementsToShake);
  }
  // Activate congratulations to user by calling the function.
  //puzzleSolved();

})()


function dragStart(event) {
  event.dataTransfer.setData("Text", event.target.id);
}


function allowDrop(event) {
  event.preventDefault();
}

function drop(event) {
  event.preventDefault();
  var data = event.dataTransfer.getData("Text");
  event.target.appendChild(document.getElementById(data));
}
