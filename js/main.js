let deckId;
const cardsEl = document.getElementById("cards");

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
                cardsEl.children[0].innerHTML = `<img src=${data.cards[0].image}>`;
                cardsEl.children[1].innerHTML = `<img src=${data.cards[1].image}>`;
        });
    } else {
        alert("Get a new deck first!");
    }
    
}


document.getElementById("new-deck").addEventListener("click", fetchDeck);
document.getElementById("draw").addEventListener("click", fetchCards);