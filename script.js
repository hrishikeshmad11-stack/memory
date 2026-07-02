let cards = document.querySelectorAll(".card-container");
let flippedCards=[];
let lockBoard=false;
let cardfaces = document.querySelectorAll(".front");
let count =0;
let h2 = document.body.children[1].children[1].children[0];

let images = ["./images/froakie.png","./images/rhydon.png","./images/pikachu.png","./images/charmander.png","./images/jigglypuff.png","./images/wobbuffet.png","./images/houndoom.png","./images/dragonite.png","./images/voltorb.png","./images/chimchar.png","./images/magikarp.png","./images/snivy.png","./images/nuzleaf.png","./images/rayquaza.png","./images/girafarig.png","./images/froakie.png","./images/rhydon.png","./images/pikachu.png","./images/charmander.png","./images/jigglypuff.png","./images/wobbuffet.png","./images/houndoom.png","./images/dragonite.png","./images/voltorb.png","./images/chimchar.png","./images/magikarp.png","./images/snivy.png","./images/nuzleaf.png","./images/rayquaza.png","./images/girafarig.png"];

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const yay = shuffle(images);

for (let i=0;i<30;i++){
    cardfaces[i].insertAdjacentHTML('afterbegin','<img src="'+yay[i]+'">');
    cards[i].dataset.value=yay[i];
}

function resetFlippedCards() {
    flippedCards = [];
    lockBoard = false;
}

function checkForWin() {
    const allMatched = document.querySelectorAll(".card-container.matched").length === cards.length;
    if (allMatched) {
        document.getElementById("winMessage").textContent = "You finished in " + count + " turns!";
        document.getElementById("winModal").classList.add("show");
    }
}
document.getElementById("closeModal").addEventListener("click", function() {
    document.getElementById("winModal").classList.remove("show");
});

function checkForMatch(){
    count=count+1;
    const [card1, card2] = flippedCards;
    const isMatch = card1.dataset.value === card2.dataset.value;

    if (isMatch) {
        card1.classList.add("matched");
        card2.classList.add("matched");
        resetFlippedCards();
    } else {
        setTimeout(() => {
            card1.classList.remove("flipped");
            card2.classList.remove("flipped");
            resetFlippedCards();
        }, 1000);
    }
    h2.textContent="Number of Turns taken: "+count;
    checkForWin();
}

for(const card of cards){
    card.addEventListener("click",function(){
        if(lockBoard) return;
        if(card.classList.contains("flipped")) return;
        if(card.classList.contains("matched")) return;

        card.classList.add("flipped");
        flippedCards.push(card);

        if (flippedCards.length === 2) {
            checkForMatch();
        }
    });
}
