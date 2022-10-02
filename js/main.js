let deckId;

const newDeckBtn = document.getElementById("new-deck");
const drawBtn = document.getElementById("draw");
const cardsEl = document.getElementById("cards");
const computerScoreEl = document.getElementById("computer");
const myScoreEl = document.getElementById("me");
const remainingEl = document.getElementById("remaining");
const statusEl = document.getElementById("status");
const possibleVals = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "JACK", "QUEEN", "KING", "ACE"];
let computerScore = 0;
let myScore = 0;
let remainingCards = 52;

function assessValue(arr) {
    const val1 = possibleVals.indexOf(arr[0].value);
    const val2 = possibleVals.indexOf(arr[1].value);
    return {
        'card1Val': val1,
        'card2Val': val2
    };
}

function updateStatus(cardVals) {
    const { card1Val, card2Val } = cardVals;
    if (card1Val === card2Val) {
        statusEl.textContent = "War!";
    } else {
        statusEl.textContent = card1Val > card2Val ? "Computer wins!" : "You win!";
    }
}

function updateScore(cardVals) {
    const { card1Val, card2Val } = cardVals;
    card1Val > card2Val ? computerScore++ : myScore++;
    computerScoreEl.textContent = `Computer: ${computerScore}`;
    myScoreEl.textContent = `Me: ${myScore}`;
}

function updateRemaining(data) {
    remainingCards = data.remaining;
    remainingEl.textContent = `Remaining cards: ${remainingCards}`;
}

function finalStatus() {
    statusEl.textContent = computerScore > myScore ? 'Computer won the game!' : 'You win the game!';
}

function disableButtons() {
    drawBtn.disabled = true;
    newDeckBtn.disabled = true;
    finalStatus();
}

function processCards(data) {
    const cardVals = assessValue(data.cards);
    updateScore(cardVals);
    cardsEl.children[0].innerHTML = `<img src=${data.cards[0].image}>`;
    cardsEl.children[1].innerHTML = `<img src=${data.cards[1].image}>`;
    updateStatus(cardVals);
    updateRemaining(data);
}


function fetchDeck() {
    fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
        .then(res => res.json())
        .then(data => {
            deckId = data.deck_id;
            updateRemaining(data);
        });
}

function fetchCards() {
    if (deckId) {
        fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
        .then(res => res.json())
            .then(data => {
                processCards(data);
            });
    } else {
        alert("Get a new deck first!");
    }
}


newDeckBtn.addEventListener("click", fetchDeck);
drawBtn.addEventListener("click", () => {
    remainingCards > 0 ? fetchCards() : disableButtons();
});