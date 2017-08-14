var suits = ["Spades", "Hearts", "Clubs", "Diamonds"];
var values = ["Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King"];
var deck = [];

function getRandom(min, max) {
  return parseInt(Math.random() * (max - min) + min);
}

function drawCard() {
  var cardIndex = getRandom(0, deck.length);
  var card = deck[cardIndex];
  deck.splice(cardIndex,1);
  return card;
}

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

function warTurn (playerOneHand, playerTwoHand) {
  var card1 = playerOneHand.pop();
  $(".player1").prepend("<li>" + card1 + "</li>");
  var card2 = playerTwoHand.pop();
  $(".player2").prepend("<li>" + card2 + "</li>");
  var result = warJudge(card1, card2);
  $(".result").prepend("<li>" + result + "</li>");
  var cards = [card1, card2];
  while (result === "WAR!") {
    card1 = playerOneHand.pop();
    $(".player1").prepend("<li>" + card1 + "</li>");
    card2 = playerTwoHand.pop();
    $(".player2").prepend("<li>" + card2 + "</li>");
    var result = warJudge(card1, card2);
    $(".result").prepend("<li>" + result + "</li>");
    cards.push(card1);
    cards.push(card2);
  }
  if (result === "Player One Wins") {
    cards.forEach(function(card) {
      playerOneHand.unshift(card);
    });
  } else {
    cards.forEach(function(card) {
      playerTwoHand.unshift(card);
    });
  }
}

$(document).ready(function(){
  suits.forEach(function(suit){
    values.forEach(function(value){
      deck.push(value + " of " + suit);
    });
  });

  var playerOneHand = [];
  var playerTwoHand = [];

  for (i = 0; i < 52; i+= 1) {
    if (i % 2 === 0){
      playerOneHand.push(drawCard());
    } else {
      playerTwoHand.push(drawCard());
    }
  }

  $("#war").click(function() {
    warTurn(playerOneHand, playerTwoHand);
  });
});
