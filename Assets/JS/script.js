const classSelectors ={ //Get all the classes we need to target
    boardContainer: document.querySelector('.game-board'),
    board: document.querySelector('.board'),
    moves: document.querySelector('.moves'),
    score: document.querySelector('.score'),
    repeat: document.querySelector('.fa-repeat'),
    compelted: document.querySelector('.completed')
};

const state = { //Variables for keeping track of various parts of the game
    gameStarted: false,
    flippedCards: 0,
    totalMoves: 0,
    totalTime: 0,
    score: 0,
    loop: null
};

//Create an array with the card icons

let cardImages = [];

let kuromiOne = new Image(50,50);
kuromiOne.src = 'Assets/Images/kuromiOne.png';
let kuromiTwo = new Image(50,50);
kuromiTwo.src = 'Assets/Images/kuromiTwo.png';
let kuromiThree = new Image(50,50);
kuromiThree.src = 'Assets/Images/kuromiThree.png';
let kuromiFour = new Image(50,50);
kuromiFour.src = 'Assets/Images/kuromiFour.png';
let kuromiFive = new Image(50,50);
kuromiFive.src = 'Assets/Images/kuromiFive.png';
let kuromiSix = new Image(50,50);
kuromiSix.src = 'Assets/Images/kuromiSix.png';
let kuromiSeven = new Image(50,50);
kuromiSeven.src = 'Assets/Images/kuromiSeven.png';
let kuromiEight = new Image(50,50);
kuromiEight.src = 'Assets/Images/kuromiEight.png';

cardImages.push(kuromiEight,kuromiSeven, kuromiSix, kuromiFive, kuromiFour, kuromiThree, kuromiTwo, kuromiOne);
//Game logic based on https://www.webtips.dev/memory-game-in-javascript
const createGame = () => {
    if(document.getElementsByClassName("win-text")){
        const removeWin = document.getElementsByClassName('win-text');
        while (removeWin.length > 0){
        removeWin[0].parentNode.removeChild(removeWin[0]);
    }
    }
    //lets us set the dimension through our html
    const dimensions = classSelectors.board.getAttribute('data-dimension'); //lets us set the dimension through our html

   if (dimensions % 2 !== 0){
       throw new Error("Dimensions must be an even number!"); //No uneven board dimensions
   }

   const randomCards = pickRandom(cardImages, (dimensions * dimensions) / 2);
   const shuffledCards = shuffle([...randomCards, ...randomCards]); //we use the shuffle to ensure there are pairs
   //insert our grid of cards with the now shuffled cards 
   const cards = `<div class="board" style="grid-template-columns: repeat(${dimensions}, auto)">
   ${shuffledCards.map(item => `
       <div class="card">
           <div class="card-front"></div>
           <div class="card-back"><img src="${item.src}"></div>
       </div>
   `).join('')}
</div>`;


const domParser = new DOMParser().parseFromString(cards, 'text/html');

classSelectors.board.replaceWith(domParser.querySelector('.board'));
};


const pickRandom = (array, items) => { //Pick a random selection of cards from our array
    const clonedArray = [...array];
    const randomCards = [];

    for (let index = 0; index < items; index++) {
        const randomIndex = Math.floor(Math.random() * clonedArray.length);
        
        randomCards.push(clonedArray[randomIndex]);
        clonedArray.splice(randomIndex, 1);
    }
    return randomCards;
};


const shuffle = array => { //Shuffle algorithm based on the Fisher-Yates shuffling algorithm https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm
    const clonedArray = [...array];

    for (let index = clonedArray.length - 1; index > 0; index--) {
        const randomIndex = Math.floor(Math.random() * (index + 1));
        const original = clonedArray[index];

        clonedArray[index] = clonedArray[randomIndex];
        clonedArray[randomIndex] = original;
    }

    return clonedArray;
};


const events = () =>{ //Event listener for cards and buttons
    document.addEventListener('click', event => {
        const eventTarget = event.target;
        const eventParent = eventTarget.parentElement;

        if (eventTarget.className.includes('card') && !eventParent.className.includes('flipped')) {
            flipCard(eventParent);
            
        } else if (eventTarget.classList.contains('play-again-btn') && !eventTarget.className.includes('disabled')) {
            location.reload();
        }
    });
}


const startGame = () => { //start game and timer
    state.gameStarted = true;

    state.loop = setInterval(() => {
    if (document.querySelectorAll('.card:not(.flipped)').length == 0) { //if there are no more cards to flip, you have won!
        const game = document.getElementsByClassName('Game')[0];
        game.style.visibility = 'hidden';
        setTimeout(() => {
            clearScreen();
            classSelectors.boardContainer.classList.add('flipped')
            classSelectors.compelted.innerHTML = `
                <span class="win-text">
                    You won!<br />
                    with <span class="highlight">${state.totalMoves}</span> moves<br />
                    and a score of <span class="highlight">${state.score}</span>
                </span>
                <button class="play-again-btn" type="button">Click here to play again!</button>
            `;
            clearInterval(state.loop);
        }, 1000);
    }
        state.totalTime++;
        classSelectors.moves.innerText = `${state.totalMoves} moves`;
    }, 1000);
}

const clearScreen = () => {
    const removeBoard = document.getElementsByClassName('board');
    while (removeBoard.length > 0){
        removeBoard[0].parentNode.removeChild(removeBoard[0]);
    }
    const removePoints = document.getElementsByClassName('points');
    while (removePoints.length > 0){
        removePoints[0].parentNode.removeChild(removePoints[0]);
    }
    const removeReplay = document.getElementsByClassName('controls');
    while (removeReplay.length > 0){
        removeReplay[0].parentNode.removeChild(removeReplay[0]);
    }
};

const flipCard = card =>{ //Flip cards on click, if match increase counter, 1 second delay
    state.flippedCards++;
    state.totalMoves++;
    

    if(!state.gameStarted){
        startGame(); //if game not started, start now
    }

    if (state.flippedCards <= 2){
        card.classList.add('flipped');
    }

    if (state.flippedCards === 2) {
        const flippedCards = document.querySelectorAll('.flipped:not(.matched)');

        if (flippedCards[0].innerHTML === flippedCards[1].innerHTML) { //Probably not the best way to compare cards but it works for now 
            flippedCards[0].classList.add('matched');
            flippedCards[1].classList.add('matched');
            
            var scoreRounded = Math.round(10-(state.totalMoves*0.04));
            state.score += scoreRounded;
            classSelectors.score.innerText = `Score: ${state.score}`;

        }

        setTimeout(() => {
            flipBackCards();
        }, 1000);
    }
};


const flipBackCards = () => {
    document.querySelectorAll('.card:not(.matched)').forEach(card => {
        card.classList.remove('flipped');
    });

    state.flippedCards = 0;
};
createGame();
events();
