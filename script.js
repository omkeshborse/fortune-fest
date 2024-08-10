const ball = document.querySelector(".ball");
const goalText = document.querySelector(".goal-text");
const leftCountDisplay = document.querySelector(".left-count");
const rightCountDisplay = document.querySelector(".right-count");
const gameArea = document.querySelector(".game-area");
const timerDisplay = document.querySelector(".timer");

const blockLeft = document.querySelector(".block-left");
const blockRight = document.querySelector(".block-right");

const gameAreaWidth = gameArea.clientWidth; 
const gameAreaHeight = gameArea.clientHeight;

let ballSpeedX = 5;
let ballSpeedY = 5;
let ballX = gameAreaWidth / 2;
let ballY = gameAreaHeight / 2;

let leftSideCount = 0;
let rightSideCount = 0;
let goalTriggered = false;

// Timer variables
let startTime = Date.now();

function updateBallPosition() {
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // Check for collisions with blocks
  const hitBlock = checkBlockCollision();

  // Ball hits the left or right edge and not the blocks
  if (ballX <= 0 && !hitBlock) {
    ballSpeedX *= -1;
    leftSideCount++;
    showGoal("Left");
  } else if (ballX >= gameAreaWidth - 50 && !hitBlock) {
    ballSpeedX *= -1;
    rightSideCount++;
    showGoal("Right");
  }

  // Ball hits the top or bottom edge
  if (ballY <= 0 || ballY >= gameAreaHeight - 50) {
    ballSpeedY *= -1;
  }

  ball.style.left = `${ballX}px`;
  ball.style.top = `${ballY}px`;

  // Update the timer
  updateTimer();

  requestAnimationFrame(updateBallPosition);
}

function checkBlockCollision() {
  const ballRect = ball.getBoundingClientRect();
  const blockLeftRect = blockLeft.getBoundingClientRect();
  const blockRightRect = blockRight.getBoundingClientRect();

  // Check collision with the left block
  if (
    ballRect.right >= blockLeftRect.left &&
    ballRect.left <= blockLeftRect.right &&
    ballRect.bottom >= blockLeftRect.top &&
    ballRect.top <= blockLeftRect.bottom
  ) {
    ballSpeedX *= -1; // Reflect the ball on the X-axis
    return true;
  }

  // Check collision with the right block
  if (
    ballRect.right >= blockRightRect.left &&
    ballRect.left <= blockRightRect.right &&
    ballRect.bottom >= blockRightRect.top &&
    ballRect.top <= blockRightRect.bottom
  ) {
    ballSpeedX *= -1; // Reflect the ball on the X-axis
    return true;
  }

  return false;
}

function showGoal(side) {
  goalText.textContent = `Goal on ${side} Side!`;
  goalText.style.visibility = "visible";
  setTimeout(() => {
    goalText.style.visibility = "hidden";
  }, 1000);

  // Update counts display
  updateCounts();
}

function updateCounts() {
  if (leftCountDisplay && rightCountDisplay) {
    leftCountDisplay.textContent = `Left Touches: ${leftSideCount}`;
    rightCountDisplay.textContent = `Right Touches: ${rightSideCount}`;
  }
}

function updateTimer() {
  const elapsedTime = (Date.now() - startTime) / 1000; // Convert to seconds
  const minutes = Math.floor(elapsedTime / 60);
  const seconds = Math.floor(elapsedTime % 60);
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");

  timerDisplay.textContent = `${formattedMinutes}:${formattedSeconds}`;
}

updateBallPosition();
