$(document).ready(function(){
  var suits = ["Spades", "Hearts", "Clubs", "Diamonds"];
  var values = ["Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King"];

  suits.forEach(function(suit){
    values.forEach(function(value){
      $("#cards").append("<li>" + value + " of " + suit + "</li>");
    });
  });
});
