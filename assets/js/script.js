$(document).ready(initializeApp);

function initializeApp(){
  var randomCardClassesArray = ["random-card-1","random-card-1","random-card-2","random-card-2",
  "random-card-3","random-card-3","random-card-4",
  "random-card-4","random-card-5","random-card-5",
  "random-card-6","random-card-6","random-card-7",
  "random-card-7","random-card-8","random-card-8",
  "random-card-9","random-card-9"];
  addRandomCards(randomCardClassesArray);
  $(".lfz-card").on('click',handleCardClick);
  // shuffle(randomCardClassesArray);
  // // console.log(randomCardClassesArray);
  // for (var integerI = 0; integerI< 18; integerI++){
  //   var startAtOneIndex = integerI + 1;
  //   var randomCardDiv = $("<div>").addClass(randomCardClassesArray[integerI]);
  //   $("#card"+startAtOneIndex).append(randomCardDiv);
  }




function addRandomCards (randomArray){
  shuffle(randomArray);
  // console.log(randomCardClassesArray);
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

}
