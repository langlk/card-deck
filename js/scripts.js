function getRandom(min, max) {
  return parseInt(Math.random() * (max - min) + min);
}

$(document).ready(function(){
  var suits = ["Spades", "Hearts", "Clubs", "Diamonds"];
  var values = ["Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King"];

  suits.forEach(function(suit){
    values.forEach(function(value){
      $("#cards").append("<li>" + value + " of " + suit + "</li>");
    });
  });

  $("#hand").click(function(){
    var pickedCards = []
    for(card = 0; card < 5; card+=1){
      var suitIndex = getRandom(0, 4);
      var valuesIndex = getRandom(0, 13);
      var displayCard = values[valuesIndex] + " of " + suits[suitIndex];
      while (pickedCards.includes(displayCard)) {
        var suitIndex = getRandom(0, 4);
        var valuesIndex = getRandom(0, 13);
        var displayCard = values[valuesIndex] + " of " + suits[suitIndex];
      }
      pickedCards.push(displayCard);
      $(".drawn-hand").append("<li>" + displayCard + "</li>");
    }
  });
});
