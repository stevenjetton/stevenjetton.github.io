$(document).ready(function(){
var magic8ball = {};

magic8ball.listOfAnswers = ["Yes", "No", "Maybe", "Time will tell", "Do you really want me to answer that?"];

magic8ball.askQuestion = function(question){
 $("#8ball").effect("shake");
var randomNumber = Math.random();
var randomNumberForListOfAnswers = randomNumber * this.listOfAnswers.length;
var randomIndex = Math.floor(randomNumberForListOfAnswers);
var answer = this.listOfAnswers[randomIndex];
	$("#8ball").attr("src", "https://s3.amazonaws.com/media.skillcrush.com/skillcrush/wp-content/uploads/2016/09/magic8ballAnswer.png");
	$("#answer").text(answer);
	$("#answer").fadeIn(4000);
console.log(question);
console.log(answer);
};
var showPrompt = function(){
  $("#8ball").attr("src", "https://s3.amazonaws.com/media.skillcrush.com/skillcrush/wp-content/uploads/2016/09/magic8ballQuestion.png");
$("#answer").hide();
	setTimeout(function() {
	var question = prompt("Ask a yes/no question.");
	magic8ball.askQuestion(question);
	 }, 500);
};

$("#questionButton").click(showPrompt);

$("#answer").hide();

});
