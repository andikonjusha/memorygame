const gameContainer = document.getElementById("game");
let card1 = null;
let card2 = null;
let cardsFlipped = 0;
let noClicking = false;

const COLORS = [
    "red",
    "blue",
    "green",
    "orange",
    "purple",
    "red",
    "blue",
    "green",
    "orange",
    "purple",
];

 function shuffle(array) {
    let counter = array.length;

    while (counter > 0) {

        let index = Math.floor(Math.random() * counter);

        counter--;

        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }
    return array;
 }

 let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
    if (noClicking) return;
    if (event.target.classList.contains("flipped")) return;
  // you can use event.target to see which element was clicked
  let currentCard = event.target;
  currentCard.style.backgroundColor = currentCard.classList[0];

  if (!card1 || !card2) {
    currentCard.classList.add("flipped");
    card1 = card1 || currentCard;
    card2 = currentCard === card1 ? null : currentCard;
  }

  if (card1 && card2)  {
    noClicking = true;

    let gif1 = card1.className;
    let gif2 = card2.className;

    if (gif1 === gif2) {
        cardsFlipped += 2;
        card1.removeEventListener("click", handleCardClick);
        card2.removeEventListener("click", handleCardClick);
        card1 = null;
        card2 = null;
        noClicking = false;
    } else {
        setTimeout(function() {
            card1.style.backgroundColor = "";
            card2.style.backgroundColor = "";
            card1.classList.remove("flipped");
            card2.classList.remove("flipped");
            card1 = null;
            card2 = null;
            noClicking = false;
        }, 1000);
    }
  }
  if (cardsFlipped === COLORS.length) alert ("GAME OVER!");
}

// when the DOM loads
createDivsForColors(shuffledColors);
