let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let startBtn=document.querySelector("#start-game");


let player1name="";
let player2name="";
let turn0 = true;
let gameStarted=false;

const winPatterns = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

// Reset game state
const resetGame = () => {
  turn0 = true;
  gameStarted=true;
  enableBoxes();
  msgContainer.classList.add("hide");
   
};

// Enable all boxes and clear them
const enableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = false;
    box.innerText = "";
    box.classList.remove("x", "o", "glow", "bounce"); 
  });
};


// Disable all boxes
const disableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = true;
  });
};

// Display winner message
const showWinner = (winner) => {
  let winnerName = winner === "O" ? player1name : player2name;
  msg.innerText = `🎉 Congratulations, ${winnerName} wins!`;
  msgContainer.classList.remove("hide");
  const winSound = document.getElementById("win-sound");
  winSound.currentTime = 0; // rewind to start
  winSound.play();
  disableBoxes();
};

// Check for winner or draw
const checkWinner = () => {
  for (let pattern of winPatterns) {
    let post1Val = boxes[pattern[0]].innerText;
    let post2Val = boxes[pattern[1]].innerText;
    let post3Val = boxes[pattern[2]].innerText;

    if (post1Val !== "" && post1Val === post2Val && post2Val === post3Val) {
      console.log("WINNER", post1Val);
      pattern.forEach(index => boxes[index].classList.add("glow", "bounce"));
      showWinner(post1Val);
      return; 
    }
  }

  // Check for draw
  let isDraw = true;
  boxes.forEach((box) => {
    if (box.innerText === "") isDraw = false;
  });

  if (isDraw) {
    msg.innerText = `It's a Draw between ${player1name} and ${player2name}`;
    msgContainer.classList.remove("hide");
    const drawSound = document.getElementById("draw-sound");
    drawSound.play();
    disableBoxes();
  }
};

// Add click listeners to boxes
boxes.forEach((box) => {
  box.addEventListener("click", () => {
     if (!gameStarted) {
      alert("Please enter player names and start the game!");
      return;
    }
    if (box.innerText !== "") return;

    if (turn0) {
      box.innerText = "O";
      box.classList.add("o"); // add class for color
    } else {
      box.innerText = "X";
      box.classList.add("x"); // add class for color
    }

    box.disabled = true;
    turn0 = !turn0;

    checkWinner();
  });
});
startBtn.addEventListener("click",()=>{
  const p1=document.querySelector("#player1").value.trim();
  const p2=document.querySelector("#player2").value.trim();

  if(p1==="" || p2===""){
    alert("Please enter both player names.");
    return;
  }
  player1name = p1;
  player2name = p2;
  gameStarted = true;
  resetGame();
});

// Button listeners
resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame);