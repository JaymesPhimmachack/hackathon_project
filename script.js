
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

// Scramble

function handleClick(event) {
  var bg = document.querySelector('#droppableZone');
  var pieces = [].slice.call(document.querySelectorAll('.piece'));

  bg.style.backgroundImage = "url('images/_Puzzle_bg_unsolved.png')";

  pieces.forEach(piece => {
    piece.style.position = 'absolute';
    piece.style.top = Math.floor(Math.random() * (48+1)) + '%';
    piece.style.left = Math.floor(Math.random() * (87+1)) + '%';
    document.querySelector('#pieces-tray').appendChild(piece);
  });
}
