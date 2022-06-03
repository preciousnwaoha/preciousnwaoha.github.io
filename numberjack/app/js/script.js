
let pickedPlayers;
let players;
let gameRound = 0;

const root = document.querySelector(":root");
const body = document.querySelector("body");
const headerEl = document.querySelector("header");
const logoEl = document.querySelector("#logo");
const theme = document.querySelector("#theme");
const wrapperEl = document.querySelector(".wrapper");
const userEL = document.querySelector(".user-div-wrapper");
const message = document.querySelector(".message");
const inputElPlayers = document.querySelector("#input-el-players");
const inputElComputers = document.querySelector("#input-el-computers");
const pickPlayersIcon = document.querySelector("#pick-players-icon");
const pickComputersIcon = document.querySelector("#pick-computers-icon");
const maxValueEl = document.querySelector("#max-value-el");
const startBtn = document.querySelector(".start-btn");
const aboutWrapperEl = document.querySelector("#about-wrapper");
const aboutEl = document.querySelector("#about");
const aboutBtnWrapperEl = document.querySelector("#about-btn-wrapper");
const aboutBtnEl = document.querySelector("#about-btn");
const scrimbaEl = document.querySelector("#scrimba");
const scoreboardWrapperEl = document.querySelector("#scoreboard-wrapper");
const scoreboardExitEl = document.querySelector("#scoreboard-exit");
const scoreboardListEl = document.querySelector("#scoreboard-list");
let changedTheme = false;


/* Interaction for logo reload */
const askAndReloadGame = () => {
  if(confirm(`Sure you want to reload NUMBERJACK !!`)){
    // reload game
    window.location.reload(false);
    console.log(`reloaded game`);
  }
}
logoEl.addEventListener("click", askAndReloadGame);

/* Theme change code */
theme.addEventListener("click", () => {
  if (changedTheme === false) {
    root.style.cssText = "--primary: #eff0f4; --neutral: #020202; --shadow: #1a1a1a; --neutralChange: #fafafa; --shadowDark: #1a1a1a;";
    changedTheme = true;
  }
  else {
    root.style.cssText = "--primary: #020202; --neutral: #eff0f4; --shadow: #d4d4d4; --neutralChange: #020202; --shadowDark: #8a8a8a";
    changedTheme = false;
  }
});

/* Interaction of about section */
let aboutShowing = false; 
const OpenCloseAbout = () => {
  if(aboutShowing === false) {
    aboutWrapperEl.style.cssText = `height: 100%; max-height: 450px;`;
    aboutBtnWrapperEl.style.cssText = `height: 20%;`;
    aboutEl.style.display = `flex`;
    aboutBtnEl.innerHTML = `&times;`;
    aboutBtnEl.style.cssText = `background: var(--primary); `;
    aboutShowing = true;
  } else {
    aboutWrapperEl.style.cssText = `height: 60px; max-height: none;`;
    aboutBtnWrapperEl.style.cssText = `height: 100%;`;
    aboutEl.style.display = `none`;
    aboutBtnEl.innerHTML = `?`;
    aboutBtnEl.style.cssText = `background: var(--secondary);`;
    aboutShowing = false;
  }
 
}
aboutBtnEl.addEventListener("click", OpenCloseAbout);

/* Interaction before going to Scrimba.com */
const goToScrimba = () => {
  if(confirm(`Do you want to see scrimba.com`)) {
    window.location.href = `https://www.scrimba.com`;
    console.log(`gone to scrimba`);
  } else {
    console.log(`did not go to Scrimba`);
  }
}
scrimbaEl.addEventListener("click", goToScrimba);

/* Show and Remove Scoreboard Function set up */
const showScoreboard = () => {
  scoreboardWrapperEl.style.display = `flex`;
}
const hideScoreboard = () => {
  scoreboardWrapperEl.style.display = `none`;
}
scoreboardExitEl.addEventListener("click", hideScoreboard);

/* Initializing variables to be used in the game */
let player, maxCardValue;
// defining html element selectors
let playerBoxes, playerBoxesCover, drawCards, skipTurns, num1El, num2El, sumEl, playerDrawsNoEl, gameRoundEl, commentEl, winBackgroundEl, svgContainer, animItem, playerBoxesClone;
// defining needed array holders
let scores, insidePlayerScoreWrapperEl, playerScoreWrapperEl, isComputer, playerColors, playerRoundsPlayed, playerSkippedPreviousTurn, finalPLayersTotalCardsArray, updateNum1, playersTotalCardsArray, playerStateArray, winState;

/* player random color generator */
const randomColor = () => {
  // color must not contrast theme whether light or dark
  let h = String(Math.floor(Math.random() * 360));
  let s = String(50 + Math.floor(Math.random() * 50));
  let l = String(25 + Math.floor(Math.random() * 25));
  color = `hsl(${h}, ${s}%, ${l}%)`;
  return color;
}

/* toggle selection of player and computer */
const togglePersonComputerInput = () => {
  if (pickComputersIcon.style.display === `none`) {
    // hide player's input
    pickPlayersIcon.style.display = `none`;
    inputElPlayers.style.display = `none`;
    // show computer's input
    pickComputersIcon.style.display = `block`;
    inputElComputers.style.display = `block`;
  } else {
    // hide computer's input
    pickComputersIcon.style.display = `none`;
    inputElComputers.style.display = `none`;
    // show player's input
    pickPlayersIcon.style.display = `block`;
    inputElPlayers.style.display = `block`;
  }
}
pickPlayersIcon.addEventListener("click", togglePersonComputerInput);
pickComputersIcon.addEventListener("click", togglePersonComputerInput);

/* Initializing the values of variables after game is set up */
const init = () => {
  gameRound++;
  player = 0;
  // select needed html elements
  playerScoreWrapperEl = document.querySelectorAll(".player-score-wrapper");
  playerBoxes = document.querySelectorAll(".p");
  playerBoxesCover = document.querySelectorAll(".p-cover");
  drawCards = document.querySelectorAll(".draw-card");
  skipTurns = document.querySelectorAll(".skip-turn");
  num1El = document.querySelectorAll(".num1-el");
  num2El = document.querySelectorAll(".num2-el");
  sumEl = document.querySelectorAll(".sum-el");
  commentEl = document.querySelectorAll(".comment-el");
  playerDrawsNoEl = document.querySelectorAll(".player-draws-no-el");
  gameRoundEl = document.querySelectorAll(".game-round-el");
  winBackgroundEl = document.querySelector("#win-background-el");
  // write the game round in game round element
  gameRoundEl[0].textContent = `Round ${gameRound}`;
  // set position of game round element
  gameRoundEl[0].style.cssText = `top:${parseFloat(window.getComputedStyle(headerEl).height) + parseFloat(window.getComputedStyle(headerEl).borderBottom)}px; background: var(--neutral); border-style: solid; border-color: var(--shadow); border-width: 0px 1px 1px 1px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 8px -2px var(--shadow);`;

  /* Arrays needed to hold data of each player */
  // array that holds each player's color
  if (gameRound === 1) {
    playerColors = [];
    for (let i = 0; i < players; i++) {
      playerColors.push(randomColor());
    }
  }
  // array that holds each players score 
  if (gameRound === 1) {
    scores = [];
    for (let i = 0; i < players; i++) {
      scores.push(0);
    }
  }
  // array that holds each player number of rounds played
  playerRoundsPlayed = [];
  for (let i = 0; i < players; i++) {
    playerRoundsPlayed.push(0);
  }
  // array that holds each player skip turn value
  playerSkippedPreviousTurn = [];
  for (let i = 0; i < players; i++) {
    playerSkippedPreviousTurn.push(false);
  }
  // array that holds all players num1
  updateNum1 = [];
  for (let i = 0; i < players; i++) {
    updateNum1.push(0);
  }
  // array holds total cards of each player
  playersTotalCardsArray = [];
  for (let i = 0; i < players; i++) {
    playersTotalCardsArray.push(0);
  }
  // array that holds scoreboard scores
  if (gameRound === 1) {
    finalPLayersTotalCardsArray = [];
    for (let i = 0; i < players; i++) {
      // all players have score 0 at beginning
      finalPLayersTotalCardsArray.push(0);
    }
  }
  // array holds state of each player (in game or not)
  playerStateArray = [];
  for (let i = 0; i < players; i++) {
    // all players are in game 
    playerStateArray.push(true);
  }
  // array that holds Win State of players
  winState = [];
  for (let i = 0; i < players; i++) {
    // no player has won
    winState.push(false);
  }

  /* Set player colors  */
  for (let i = 0; i < players; i++) {
    drawCards[i].style.cssText = `background: ${playerColors[i]};`;
    skipTurns[i].style.cssText = `background: ${playerColors[i]};`;
    num1El[i].style.cssText = `color: ${playerColors[i]};`;
    num2El[i].style.cssText = `color: ${playerColors[i]};`;
    sumEl[i].style.cssText = `color: ${playerColors[i]};`;
    playerDrawsNoEl[i].style.cssText = `color: ${playerColors[i]};`;
  }
}

/* give computers random position in game */
const getRandomNumber = (max) => {
  let theRandomNumber = Math.round(Math.random() * max);
  if (isComputer[theRandomNumber] === true) {
    getRandomNumber(players - 1)
  } else {
    isComputer[theRandomNumber] = true;
  }
}
/* set who is a computer among players */
const setWhoIsComputer = () => {
  // array that knows if player is computer
  isComputer = [];
  for (let i = 0; i < players; i++) {
    isComputer.push(false);
  }
  for (let i = 0; i < Number(inputElComputers.value); i++) {
    getRandomNumber(players - 1);
  }
}

//start button click event
startBtn.addEventListener("click", () => {
  if(aboutShowing === true) {
    OpenCloseAbout();
  }
  pickedPlayers = Number(inputElPlayers.value) + Number(inputElComputers.value);
  maxCardValue = maxValueEl.value;
  if (pickedPlayers >= 2 && pickedPlayers <= 12) {
    if (maxCardValue >= 21 && maxCardValue <= 100) {
      players = pickedPlayers;

      setWhoIsComputer();
      setGame();
      init();
      selectPlayer();
    }
    else {
      message.textContent = `Pick Max number between 21 & 100`;
    }
  }
  else {
    message.textContent = `Only allow 2 to 12 players`;
  }
});

const generatePlayerIcon = (thePlayer) => {
  if (isComputer[thePlayer] === true) {
    icon = `
      <svg class="computer-icon computer-icon-in-game" version="1.1" viewBox="0 0 500.00001 500.00001"  xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(0 -552.36)">
        <path d="m88.033 661.66c-7.0653 0-12.752 5.6886-12.752 12.754v207.45c0 7.0653 5.6867 12.752 12.752 12.752h122.43v39.17h-13.889c-2.5684 0-4.6367 2.0684-4.6367 4.6367 0 2.5684 2.0684 4.6367 4.6367 4.6367h106.85c2.5684 0 4.6367-2.0684 4.6367-4.6367 0-2.5684-2.0684-4.6367-4.6367-4.6367h-13.889v-39.17h122.43c7.0653-1e-5 12.752-5.6867 12.752-12.752v-207.45c0-7.0653-5.6866-12.754-12.752-12.754zm3.4863 15.789h316.96v200.05h-316.96z" fill="#404040"/>
        </g>
      </svg>
    `;
  } else {
    icon = `
      <svg class="person-icon person-icon-in-game" version="1.1" viewBox="0 0 767.77302 800.00001" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <mask id="a" maskUnits="userSpaceOnUse">
          <circle cx="400" cy="400" r="400" color="#000000" color-rendering="auto" fill="#fff" fill-rule="evenodd" image-rendering="auto" shape-rendering="auto" solid-color="#000000" stroke-width="0" style="isolation:auto;mix-blend-mode:normal"/>
          </mask>
        </defs>
        <path transform="matrix(2.4113 0 0 2.4113 -580.63 -564.52)" d="m399.99 234.11c-51.824 2.4e-4 -93.835 42.012-93.835 93.835-6.5e-4 51.824 42.011 93.837 93.835 93.837 51.824-2.3e-4 93.836-42.013 93.835-93.837-2.4e-4 -51.824-42.012-93.835-93.835-93.835zm84.258 185.78c-22.985 21.114-53.047 32.853-84.258 32.901-31.166-0.0566-61.183-11.769-84.151-32.835-46.6 30.851-74.96 85.053-75.04 143.42 0.0313 0.83786 0.0686 1.6754 0.11151 2.5127h318.18c0.0436-0.83725 0.0813-1.6748 0.11311-2.5127-0.0349-58.365-28.354-112.59-74.931-143.48z" color="#000000" color-rendering="auto" fill="#404040" image-rendering="auto" mask="url(#a)" shape-rendering="auto" solid-color="#000000" stroke-width="0" style="isolation:auto;mix-blend-mode:normal"/>
      </svg>
    `;
  }

  return icon;
}

// Set up game and add player elements
function setGame() {
  if (gameRound !== 1) {
    userEL.style.cssText = "display: none";
  }

  if (gameRound === 0) {
    insidePlayerScoreWrapperEl = [];
    for (let i = 0; i < players; i++) {
      insidePlayerScoreWrapperEl.push(` `);
    }
  }




  for (let i = 1; i <= players; i++) {
    wrapperEl.innerHTML += `
      <div class="p p${i}" id="p${i}">
        <div id="win-background-el"></div>
        <div class="player-and-score">
          ${generatePlayerIcon(i - 1)}
          <div class="player-score-wrapper">
          ${insidePlayerScoreWrapperEl[i - 1]}
          </div>
        </div>
        <span class="player-draws-no-el">draws: 0</span>
        <span class="num1-el">0</span> 
        <span class="num2-el">0</span>
        <button class="draw-card">Draw Card</button>
        <button class="skip-turn">Skip Turn</button>
        <span class="sum-el">Sum of Nums: </span>
        <span class="comment-el">"draw a number"</span>
        <div class="p-cover">
          Player ${i} is out
        </div>
      </div>
    `
  }

}




// Select player
function selectPlayer() {
  sumEl[player].textContent = `Sum of Nums: ${playersTotalCardsArray[player]}`;
  playerBoxes[player].style.cssText = `border: 1px solid ${playerColors[player]};`;
  commentEl[player].style.display = `block`;

  if (playerRoundsPlayed[player] > 0) {
    // check if skipped turn to shows skip turn button
    if (playerSkippedPreviousTurn[player]) {
      skipTurns[player].style.cssText = "display: none";
      commentEl[player].textContent = `"draw a number"`;
      playerSkippedPreviousTurn[player] = false;
    } else {
      skipTurns[player].style.cssText = "display: block";
      commentEl[player].textContent = `"draw a number or skip turn"`;
      if(isComputer[player] === false) {
        skipTurns[player].addEventListener("click", skipTurn);
      }
      
    }
  }
  // // scroll to player
  // location.href = "#";
  // location.href = `#p${player + 1}`;
  // check if player has won
  checkWin();
  if (winState[player] === true) {
    playerWon();
  }
  else {
    if(isComputer[player] === false) {
      drawCards[player].addEventListener("click", drawCard);
    }
  }

  // if computer, then draw number or skip turn
  if (isComputer[player]) {

    let delayTime = Math.ceil(Math.random() * 5000);
    if (skipTurns[player].style.display === `block`) {
      setTimeout(skipTurn, delayTime);
    } else {
      setTimeout(drawCard, delayTime);
    }
  }
}


// Function to Draw Card
function drawCard() {
  if(aboutShowing === true) {
    OpenCloseAbout();
  }
  if (updateNum1[player] === 0) {
    let num1 = 3 + Math.floor(Math.random() * 9);
    updateNum1[player] = num1;
    playerRoundsPlayed[player] += 1;
    playerDrawsNoEl[player].textContent = `cards: ${playerRoundsPlayed[player]}`;
  }

  let num2 = 3 + Math.floor(Math.random() * 9);

  num1El[player].textContent = updateNum1[player];
  num2El[player].textContent = num2;
  updateNum1[player] += num2;
  //stores player's total nums in array index
  playersTotalCardsArray[player] = updateNum1[player];
  sumEl[player].textContent = `Sum of Nums: ${playersTotalCardsArray[player]}`;



  // Update rounds played
  playerRoundsPlayed[player] += 1;
  playerDrawsNoEl[player].textContent = `draws: ${playerRoundsPlayed[player]}`;
  //check if player is still in the game
  checkState();
  if (winState[player] == true) {
    playerWon();
  }
  else {
    playerBoxes[player].style.cssText = "border: none";
    commentEl[player].style.display = `none`;
    nextPlayer();
  }
}

function checkState() {
  if (playersTotalCardsArray[player] > maxCardValue) {
    playerStateArray[player] = false;
    playerBoxesCover[player].style.cssText = `top: 0;`;
    console.log(`player ${player + 1} is out of the game`);
  } else {
    console.log(`player ${player + 1} is still in game`);
    checkWin();
  }
}



function checkWin() {
  if (playersTotalCardsArray[player] === maxCardValue) {
    winState[player] = true;
  }
  else {
    let alivePlayers = 0;
    for (let i = 0; i < playerStateArray.length; i++) {
      if (playerStateArray[i] === true) {
        alivePlayers += 1;
      }
    }
    if (playerStateArray[player] === true && alivePlayers === 1) {
      winState[player] = true;
    }
  }
}

// Skip player turn
function skipTurn() {
  if(aboutShowing === true) {
    OpenCloseAbout();
  }
  playerSkippedPreviousTurn[player] = true;
  playerBoxes[player].style.cssText = "border: none";
  commentEl[player].style.display = `none`;
  skipTurns[player].style.display = `none`;
  nextPlayer();
}

//change player
function nextPlayer() {
  drawCards[player].removeEventListener("click", drawCard);
  skipTurns[player].removeEventListener("click", drawCard);
  if (player === players - 1) {
    player = 0;
    if (playerStateArray[player] === false) {
      nextPlayer();
    }
    else {
      selectPlayer();
    }
  } else {
    player += 1;
    if (playerStateArray[player] === false) {
      nextPlayer();
    }
    else {
      selectPlayer();
    }
  }
}

const updateScores = () => {
  scores[player] += 1;
  insidePlayerScoreWrapperEl[player] += `<div class="score"></div>`;

}

function playerWon() {
  if(aboutShowing === true) {
    OpenCloseAbout();
  }

  for (let i = 0; i < players; i++) {
    finalPLayersTotalCardsArray[i] += playersTotalCardsArray[i];
  }

  updateScores();
  onPlayerWin();
  console.log(`player ${player + 1} won the game`);
}

const useWinAnime = () => {
  return new Promise((resolve, reject) => {

    if (bodymovin) {
      resolve();
    }
    else {
      reject("no data for win animation");
    }
  });
}



const onPlayerWin = async () => {

  // clone the players p element
  playerBoxesClone = playerBoxes[player].cloneNode(true);
  // get the location of the p element in the view

  playerBoxesClone.style.cssText += `--winPlayerColor: ${playerColors[player]};`;

  playerBoxesClone.innerHTML = `
  <div id="win-background-el"></div>
  
  <span class="comment-el" id=""win-comment-el>"Draw a card from the deck"</span>
  <span id="player-win-text">Player ${player + 1} Wins</span>
  <div id="sum-draws-wrapper">
    <span class="game-round-el" id="win-game-round-el"> Round ${gameRound}</span>
    <span class="player-draws-no-el" id="win-player-draws-no-el">Draws ${playerRoundsPlayed[player]}</span>

    <span class="sum-el" id="win-sum-el">Sum of Nums: ${playersTotalCardsArray[player]} </span>
  </div>
  
  <button id="next-round-btn" onclick="nextRound()">Next Round</button>
  <button id="new-game-btn" onclick="newGame()">New Game</button>
  <button id="see-scoreboard" style="color: var(--neutral); background: ${playerColors[player]};" onclick="showScoreboard()">Scoreboard</button>
`;
  // let sortedScores = finalPLayersTotalCardsArray.sort();

  for (let i = 1; i <= players; i++) {
    scoreboardListEl.innerHTML += `
    <div class="scoreboard-list-item"><span>${i}</span>player ${i} ----------------- ${finalPLayersTotalCardsArray[i-1]}</div>
    `
  }

  const { top, left, width, height } = playerBoxes[player].getBoundingClientRect();
  // position the clone on top of the original
  playerBoxesClone.style.position = `fixed`;
  playerBoxesClone.style.top = top + `px`;
  playerBoxesClone.style.left = left + `px`;
  playerBoxesClone.style.width = `${width - (2 * parseFloat(window.getComputedStyle(playerBoxes[player]).margin))}px`;
  playerBoxesClone.style.height = `${height - (2 * parseFloat(window.getComputedStyle(playerBoxes[player]).margin))}px`;
  //remove the margin on the clone to get the correct position
  playerBoxesClone.style.margin = `0px`;
  playerBoxesClone.style.padding = `20px 10px 30px 10px`;
  // fade all players with opacity
  playerBoxes[player].style.opacity = `0`;
  // place clone on top of background
  playerBoxesClone.style.zIndex = `3000`;
  playerBoxesClone.style.border = `none`;
  // add card to the same container
  playerBoxes[player].parentNode.appendChild(playerBoxesClone);

  // add win animation
  playerBoxesClone.innerHTML += `<div class="svg hide" id="svg"></div>`;
  svgContainer = document.getElementById("svg");
  // Use promise
  useWinAnime().then(() => {
    animItem = bodymovin.loadAnimation({
      wrapper: svgContainer,
      animType: 'svg',
      loop: false,
      autoplay: false,
      path: 'https://assets3.lottiefiles.com/packages/lf20_u4yrau.json'
    });
  
    animItem.play();
  }).catch((err) => {
    console.log(err);
  });

  //expansion
  requestAnimationFrame(() => {
    winBackgroundEl.style.cssText = `
      position: fixed;
      top: ${parseFloat(window.getComputedStyle(headerEl).height)}px;
      left: 0;
      width: 100%;
      height: 100vh;
      background: rgba(0, 0, 0, 0.7);
      z-index: 2000;
    `;

    playerBoxesClone.style.alignItems = `center`;
    playerBoxesClone.style.justifyContent = `center`;
    playerBoxesClone.style.transition = `
      transform 350ms ease-in-out,
      margin 350ms ease-in-out,
      width 350ms ease-in-out,
      height 350ms ease-in-out,
      left 350ms ease-in-out,
      top 350ms ease-in-out
    `;
    playerBoxesClone.style.transform = `translate(-50%, -50%)`;
    playerBoxesClone.style.top = `50%`;
    playerBoxesClone.style.left = `50%`;
    // playerBoxesClone.style.minWidth = `${parseFloat(window.getComputedStyle(playerBoxes[player]).width) - (2 * parseFloat(window.getComputedStyle(playerBoxes[player]).margin))}`;
    playerBoxesClone.style.width = `80%`;
    playerBoxesClone.style.maxWidth = `560px`;
    playerBoxesClone.style.height = `auto`;

  });
  // animItem.play();
};

// Clear game for new round
const clearGame = () => {
  wrapperEl.innerHTML = ``;
}

const nextRound = () => {
  playerBoxesClone.style.display = `none`;
  winBackgroundEl.style.cssText = ``;
  scoreboardListEl.innerHTML = ` `;
  clearGame();
  setGame();
  init();
  selectPlayer();
}

const newGame = () => {
  location.reload();
}