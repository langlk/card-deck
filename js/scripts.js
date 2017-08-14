var suits = ["Spades", "Hearts", "Clubs", "Diamonds"];
var values = ["Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King"];

function getRandom(min, max) {
  return parseInt(Math.random() * (max - min) + min);
}

function drawOneCard() {
  var suitIndex = getRandom(0, 4);
  var valuesIndex = getRandom(0, 13);
  return values[valuesIndex] + " of " + suits[suitIndex];
}

$(document).ready(function(){

  suits.forEach(function(suit){
    values.forEach(function(value){
      $("#cards").append("<li>" + value + " of " + suit + "</li>");
    });
  });

  $("#hand").click(function() {
    $("#cards").slideUp();
    $(".drawn-hand").hide();
    $(".drawn-hand").empty();
    var pickedCards = []
    for(card = 0; card < 5; card+=1){
      var displayCard = drawOneCard();
      while (pickedCards.includes(displayCard)) {
        displayCard = drawOneCard();
      }
      pickedCards.push(displayCard);
      $(".drawn-hand").append("<li>" + displayCard + "</li>");
    }

    $(".drawn-hand").slideToggle();
  });
});
