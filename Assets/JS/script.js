console.log("Script start");


const classSelectors ={ //Get all the classes we need to target
    boardContainer: document.querySelector('.game-board'),
    board: document.querySelector('.board'),
    moves: document.querySelector('.moves'),
    start: document.querySelector('.btn-start'),
    compelted: document.querySelector('.completed')
};

const state = { //Variables for keeping track of various parts of the game
    gameStarted: false,
    flippedCards: 0,
    totalMoves: 0,
};

//Create an array with the card icons

let cardImages = [];

let kuromiOne = new Image(50,50);
kuromiOne.src = '/Assets/Images/kuromiOne.png';
let kuromiTwo = new Image(50,50);
kuromiTwo.src = '/Assets/Images/kuromiTwo.png';
let kuromiThree = new Image(50,50);
kuromiThree.src = '/Assets/Images/kuromiThree.png';
let kuromiFour = new Image(50,50);
kuromiFour.src = '/Assets/Images/kuromiFour.png';
let kuromiFive = new Image(50,50);
kuromiFive.src = '/Assets/Images/kuromiFive.png';
let kuromiSix = new Image(50,50);
kuromiSix.src = '/Assets/Images/kuromiSix.png';
let kuromiSeven = new Image(50,50);
kuromiSeven.src = '/Assets/Images/kuromiSeven.png';
let kuromiEight = new Image(50,50);
kuromiEight.src = '/Assets/Images/kuromiEight.png';

cardImages.push(kuromiEight,kuromiSeven, kuromiSix, kuromiFive, kuromiFour, kuromiThree, kuromiTwo, kuromiOne);

console.log(cardImages);

const pickRandom = (array, items) => {
    console.log("pick random");
    const clonedArray = [...array];
    const randomCards = [];

    for (let index = 0; index < items; index++) {
        const randomIndex = Math.floor(Math.random() * clonedArray.length);
        
        randomCards.push(clonedArray[randomIndex]);
        clonedArray.splice(randomIndex, 1);
    }
    console.log("random cards: " + randomCards);
    return randomCards;
};

const createGame = () => {
    const dimensions = classSelectors.board.getAttribute('data-dimension') //lets us set the dimension through our html

    if (dimensions % 2 !== 0){
        throw new Error("Dimensions must be an even number!"); //No uneven board dimensions
    }

    const randomCards = pickRandom(cardImages, (dimensions * dimensions) / 2);


    const cards = `<div class="board" style="grid-template-columns: repeat(${dimensions}, auto)">
    ${randomCards.map(item => `
        <div class="card">
            <div class="card-front"><img src="${item.src}"></div>
            <div class="card-back"></div>
        </div>
    `).join('')}
</div>`


const domParser = new DOMParser().parseFromString(cards, 'text/html');

classSelectors.board.replaceWith(domParser.querySelector('.board'));
};

const events = () =>{
    document.addEventListener('click', event =>{
        const eventTarget = event.target;
        const eventParent = eventTarget.parentElement;

        if (eventTarget.className.includes('card') && !eventParent.className.includes('flipped')){
            flipCard(eventParent);
            console.log('card clicked');
        }else if(eventTarget.nodeName === 'BUTTON' && !eventTarget.className.includes('disabled')) {
            startGame();
            console.log('start clicked');
        }
    });
};

const startGame = () => {
    state.gameStarted = true;
    classSelectors.start.classList.add('disabled')

    classSelectors.moves.innerText = `Moves: ${state.flippedCards}`
}

const flipCard = card =>{
    state.flippedCards++;
    state.totalMoves++;

    if(!state.gameStarted){
        startGame();
    }

    if (state.flippedCards <= 2){
        card.classList.add('flipped')
    }

    if (state.flippedCards === 2) {
        const flippedCards = document.querySelectorAll('.flipped:not(.matched)')

        if (flippedCards[0].innerText === flippedCards[1].innerText) {
            flippedCards[0].classList.add('matched')
            flippedCards[1].classList.add('matched')
        }

        setTimeout(() => {
            flipBackCards()
        }, 1000)
    }
}

const flipBackCards = () => {
    document.querySelectorAll('.card:not(.matched)').forEach(card => {
        card.classList.remove('flipped')
    })

    state.flippedCards = 0
}

createGame();
events();
