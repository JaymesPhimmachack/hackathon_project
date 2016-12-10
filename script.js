// function allowDrop(event) {
//     event.preventDefault();
// }

// function drop(event) {
//     event.preventDefault();
//     var data = event.dataTransfer.getData("Text");
//     event.target.appendChild(document.getElementById(data));
// }

function dragstart_handler(event) {
  console.log(event);
  event.dataTransfer.setData("text/plain", event.target.id);
}

function drop_handler(event) {
  event.preventDefault();
  var data = event.dataTransfer.getData("text/plain");
  event.target.appendChild(document.getElementById(data));
}

function dragover_handler(event) {
  event.preventDefault();
  event.dataTransfer.dropEffect = "move";
}

function click_handler(event) {
  var bg = document.querySelector('#droppableZone');
  var pieces = [].slice.call(document.querySelectorAll('.piece'));

  bg.style.backgroundImage = "url('images/_Puzzle_bg_unsolved.png')";

  pieces.forEach(piece => {
    piece.style.display = 'block'
    piece.style.position = 'absolute';
    piece.style.top = Math.floor(Math.random() * (48+1)) + '%';
    piece.style.left = Math.floor(Math.random() * (87+1)) + '%';
    document.querySelector('#pieces-tray').appendChild(piece);
  });
}
