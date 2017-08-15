var suits = ["Spades", "Hearts", "Clubs", "Diamonds"];
var values = ["Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King"];
var deck = [];

// Gets a random integer i where min <= i < max
function getRandom(min, max) {
  return parseInt(Math.random() * (max - min) + min);
}

// "Draws" a random card from global deck, removing from array and returning.
function drawCardFromDeck() {
  var cardIndex = getRandom(0, deck.length);
  var card = deck[cardIndex];
  deck.splice(cardIndex,1);
  return card;
}

// Takes two cards as "Value of Suit" strings
// Returns string stating winner of round
function warJudge (card1, card2) {
  var card1Array = card1.split(" ");
  var card2Array = card2.split(" ");
  var card1Score = values.indexOf(card1Array[0]);
  var card2Score = values.indexOf(card2Array[0]);
  if (card1Score > card2Score) {
    return "Player One Wins";
  } else if (card2Score > card1Score) {
    return "Player Two Wins";
  } else {
    return "WAR!"
  }
}

// Draws a card from each player's hand and returns the cards as array
function drawCards(playerOneHand, playerTwoHand) {
  var card1 = playerOneHand.pop();
  var card2 = playerTwoHand.pop();
  return [card1, card2];
}

// Prints the scores and results given to the page.
function printHand(score1, score2, result) {
  $(".player1").prepend("<li>" + score1 + "</li>");
  $(".player2").prepend("<li>" + score2 + "</li>");
  $(".result").prepend("<li>" + result + "</li>");
}

// Handles a turn of War.
function warTurn (playerOneHand, playerTwoHand) {
  var cards = drawCards(playerOneHand, playerTwoHand);
  var result = warJudge(cards[0], cards[1]);
  printHand(cards[0], cards[1], result);
  while (result === "WAR!") { // Tie
    // Each player draws 3 cards
    for (i = 1; i < 4; i += 1) {
      cards = cards.concat(drawCards(playerOneHand, playerTwoHand));
      printHand(cards[cards.length - 2], cards[cards.length - 1], i);
    }
    // Fourth card used to tiebreak, or start new War.
    cards = cards.concat(drawCards(playerOneHand,playerTwoHand));
    var result = warJudge(cards[cards.length - 2], cards[cards.length - 1]);
    printHand(cards[cards.length - 2], cards[cards.length - 1], result);
  }
  if (result === "Player One Wins") {
    cards.forEach(function(card) {
      playerOneHand.unshift(card);
    });
  } else { // Player Two Wins
    cards.forEach(function(card) {
      playerTwoHand.unshift(card);
    });
  }
}

$(document).ready(function(){
  // Makes Deck array
  suits.forEach(function(suit){
    values.forEach(function(value){
      deck.push(value + " of " + suit);
    });
  });

  var playerOneHand = [];
  var playerTwoHand = [];

  // Makes Player Hands
  for (i = 0; i < 52; i+= 1) {
    if (i % 2 === 0){
      playerOneHand.push(drawCardFromDeck());
    } else {
      playerTwoHand.push(drawCardFromDeck());
    }
  }

  $(".deck-one").text(playerOneHand.length);
  $(".deck-two").text(playerTwoHand.length);

  $("#war").click(function() {
    warTurn(playerOneHand, playerTwoHand);
    $(".deck-one").text(playerOneHand.length);
    $(".deck-two").text(playerTwoHand.length);
  });
});
