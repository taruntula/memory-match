$(document).ready(initializeApp);
var firstCardClicked = null;
var secondCardClicked = null;
var matches = null;
var clickCounter = 0;
var isSecondCardClicked = false;
var max_matches = 9;
var attempts = null;
var games_played = 1;


function initializeApp(){
  var randomCardClassesArray = ["random-card-1","random-card-1","random-card-2","random-card-2",
  "random-card-3","random-card-3","random-card-4",
  "random-card-4","random-card-5","random-card-5",
  "random-card-6","random-card-6","random-card-7",
  "random-card-7","random-card-8","random-card-8",
  "random-card-9","random-card-9"];
  addRandomCards(randomCardClassesArray);
  $(".lfz-card").on('click',handleCardClick); //can do .off to take off click  handler.

}
function addRandomCards (randomArray){
  shuffle(randomArray);
  for (var integerI = 0; integerI < randomArray.length; integerI++) {
    var startAtOneIndex = integerI + 1;
    var randomCardDiv = $("<div>").addClass(randomArray[integerI]);
    $("#card" + startAtOneIndex).append(randomCardDiv);
  }
}
// Fisher-Yates shuffle
function shuffle(array) {
  var i,j = 0;
  var temp = null;
  for (i = array.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1))
    temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
}

function handleCardClick (event){
  $(event.currentTarget).addClass("hidden");
  if (clickCounter === 0){
    firstCardClicked = $(event.currentTarget);
    clickCounter = 1;
    isSecondCardClicked = false;
  }
  else if (clickCounter > 0){
    secondCardClicked = $(event.currentTarget);
    isSecondCardClicked = true;
    clickCounter = 0;
  }
  if (isSecondCardClicked){
    $(".lfz-card").off('click', handleCardClick);
    attempts++;
    var frontCard1 = $(firstCardClicked).siblings();
    var frontCard2 = $(secondCardClicked).siblings();
    if ($(frontCard1).css("background-image") === $(frontCard2).css("background-image")){
      matches += 1;
      setTimeout(function () {
        frontCard1.addClass("hidden");
        frontCard2.addClass("hidden");
        $(".lfz-card").on('click', handleCardClick);
      }, 1500);
    }
    else{
      setTimeout(function(){
        $(firstCardClicked).removeClass('hidden');
        $(secondCardClicked).removeClass('hidden');
        $(".lfz-card").on('click', handleCardClick);
      },1500);
    }
    if (matches === max_matches) {
      var winnerNotification = $("<div>").addClass("winning_box").text("YOU WON");
      var resetButton = $("<button>").addClass("button").text("Play Again?");
      $("body").append(winnerNotification);
      winnerNotification.append(resetButton);
      $(resetButton).on('click',function() {
        resetStats();
        winnerNotification.addClass("hidden");
        resetButton.addClass("hidden");
      });
      games_played++;
    }
  }
  displayStats();
}

function calculateAccuracy(){
  var accuracy = matches/attempts;
  if (isNaN(accuracy)){
    accuracy = 0;
  }
  var percentage = accuracy * 100;
  return percentage;
}

function displayStats(){
  var accuracy = calculateAccuracy();
  var percentage = Math.floor(accuracy);
  $("#attempts-made").text(attempts);
  $("#accuracy-percentage").text(percentage+"%");
  $("#games-played").text(games_played);
}

function resetStats(){
  matches = null;
  attempts = null;
  displayStats();
  $(".lfz-card").removeClass("hidden");
  $(".lfz-card").siblings().removeClass("hidden");
}
