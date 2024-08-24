let sequence = []
let playerSequence = []
const colors = ["green", "red", "yellow", "blue"]
const h1sel = $("#level-title")

let blueaud = new Audio("./sounds/blue.mp3")
let redaud = new Audio("./sounds/red.mp3")
let yellowaud = new Audio("./sounds/yellow.mp3")
let greenaud = new Audio("./sounds/green.mp3")
let wrongaud = new Audio("./sounds/wrong.mp3")

let roundnum = 0

function playAudio(option) {
  // Don't judge me for using if else statements. i just felt like it bro.
  if (option == "green") 
    greenaud.play();
  else if (option == "red")
    redaud.play();
  else if (option == "yellow")
    yellowaud.play();
  else if (option == "blue")
    blueaud.play();
  else 
    wrongaud.play();
}

function nextRound() {
  h1sel.text("Playing...")
  $(".counter").attr("id", "count")
  playerSequence = []
  $("#count").text("Round " + (++roundnum))
  const nextColor = colors[Math.floor(Math.random() * colors.length)]
  sequence.push(nextColor)
  showSequence(sequence)
}

function showSequence(sequence) {
  let i = 0;

  function showNext() {
    if (i < sequence.length) {
      const color = sequence[i]
      highlightColor(color)
      playAudio(color)
      i++;
      setTimeout(showNext, 1000)
    }
    else {
      waitForPlayerInput();
    }
  }

  showNext();
}

function highlightColor(color) {
  $("."+color).addClass("pressed")
  setTimeout(function () {
    $("."+color).removeClass("pressed")
  }, 300);
}

function waitForPlayerInput() {
  h1sel.text("Your turn.")
  $(".btn").off("click")
  $(".btn").on("click", function () {
    const clickedcolor = $(this).attr("id");
    highlightColor(this.id)
    playAudio(this.id)
    playerSequence.push(clickedcolor);
    checkPlayerInput();
    })
}

function checkPlayerInput() {
  let i = 0;
  for (i = 0; i<playerSequence.length; i++) {
    if (playerSequence[i] !== sequence[i]) {
      $(".btn").off("click");
      setTimeout(function() {
        playAudio("wrong");
      }, 500)
      h1sel.text("Wrong :(")
      $(".startbtn").text("Retry")
      roundnum = 0
      return;
    }
  }
  if (playerSequence.length === sequence.length) {
    h1sel.text("Correct!")
    $(".btn").off("click");
    setTimeout(nextRound, 1000);
  }
}


$(".startbtn").click(function() {
  sequence = []
  playerSequence = []
  setTimeout(nextRound, 1000)
  $("#level-title").text("Playing.....")
})
