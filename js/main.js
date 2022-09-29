let deckId;
const card1El = document.getElementById("card-1");
const card2El = document.getElementById("card-2");

function reset() {
    card1El.innerHTML = '';
    card2El.innerHTML = '';
}

function fetchDeck() {
    fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
        .then(res => res.json())
        .then(data => {
            deckId = data.deck_id;
        });
}

function fetchCards() {
    if (deckId) {
        fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
        .then(res => res.json())
            .then(data => {
                reset();
                card1El.innerHTML += `<img src=${data.cards[0].image}>`;
                card2El.innerHTML += `<img src=${data.cards[1].image}>`;
        });
    } else {
        alert("Get a new deck first!");
    }
    
}


document.getElementById("new-deck").addEventListener("click", fetchDeck);
document.getElementById("draw").addEventListener("click", fetchCards);