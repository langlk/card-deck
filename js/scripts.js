var suits = ["Spades", "Hearts", "Clubs", "Diamonds"];
var values = ["Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King"];

function makeDeck() {
  var deck = [];
  suits.forEach(function(suit){
    values.forEach(function(value){
      deck.push(value + " of " + suit);
    });
  });
  return deck;
}

function getRandom(min, max) {
  return parseInt(Math.random() * (max - min) + min);
}

function drawOneCard() {
  var suitIndex = getRandom(0, 4);
  var valuesIndex = getRandom(0, 13);
  return values[valuesIndex] + " of " + suits[suitIndex];
}

function drawHand() {
  var pickedCards = []
  for(card = 0; card < 5; card+=1){
    var newCard = drawOneCard();
    while (pickedCards.includes(newCard)) {
      newCard = drawOneCard();
    }
    pickedCards.push(newCard);
  }
  return pickedCards;
}

$(document).ready(function(){
  $("#toggle-cards").click(function() {
    var deck = makeDeck();
    deck.forEach(function(card) {
      $("#cards").append("<li>" + card + "</li>");
    });
    $("#cards").show();
    $(".show").hide();
    $(".hide").show();
    $("#toggle-cards").click(function() {
      $("#cards").toggle();
      $(".show").toggle();
      $(".hide").toggle();
    });
  });


  $("#hand").click(function() {
    $("#cards").slideUp();
    $(".drawn-hand").hide();
    $(".drawn-hand").empty();
    var hand = drawHand();
    hand.forEach(function(card) {
      $(".drawn-hand").append("<li>" + card + "</li>");
    });
    $(".drawn-hand").slideToggle();
  });
});
