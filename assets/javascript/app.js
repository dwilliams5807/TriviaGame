
$(document).ready(function(){

var trivias = [
	{
		question: "The founder of Chuck E. Cheese's is also associated with...",
		choice: ["Toys-R-Us and Babies-R-Us", "Disney", "Taco Bell", "Atari and Pong"],
		answer: 3,
		photo: "assets/images/billybob.gif"
	},
	 {
	 	question: "What does 'wubba lubba dub dub' mean?",
		choice: ["Please leave", "I am in great pain, please help me", "I'm a genius", "My leg hurts"],
		answer: 1,
		photo: "assets/images/rick.gif"
	 },
	 {
	 	question: "Who was the voice of Bugs Bunny in the 1996 film 'Space Jam'?",
		choice: ["Mel Blanc", "Joe Alaskey", "Billy West", "Seth MacFarlane" ],
		answer: 2,
		photo: "assets/images/bugs.gif"
	},
	{
		question: "What year did Apple's iTunes Store open?",
		choice: ["1998", "2011", "2003", "2007" ],
		answer: 2,
		photo: "assets/images/jobs.gif"
	},
	{
		question: "Who loves orange soda?",
		choice: ["Regis loves orange soda", "Kenan loves orange soda", "David loves orange soda", "Kel loves orange soda" ],
		answer: 3,
		photo: "assets/images/kel.gif"
	},
	{
		question: "What programming language was developed by Apple and is typically used for iOS apps?",
		choice: ["Javascript", "Swift", "C++", "Python" ],
		answer: 1,
		photo: "assets/images/coding.gif"
	},
	{
		question: "Who wrote, directed and stared in the movie 'The Room' from 2003?",
		choice: ["Tommy Wiseau", "Seth Rogan", "James Franco", "Bryan Cranston" ],
		answer: 0,
		photo: "assets/images/tommy.gif"
	}];

  var correctCount = 0;
  var wrongCount = 0;
  var unanswerCount = 0;
  var timer = 15;
  // var intervalId;
  var userGuess ="";
  var running = false;
  var qCount = trivias.length;
  var pick;
  var index;
  var newArray = [];
  var store = [];

  $("#reset").hide();


  $("#start").on("click", function () {
    $("#start").hide();
    $("#title").hide();
    displayQuestion();
    runTimer();
    for(var i = 0; i < trivias.length; i++) {
      store.push(trivias[i]);
    }
  })


function runTimer() {
	if (!running) {
		intervalId = setInterval(decrement, 1000);
		running = true;
	}
}


function decrement() {
	$("#timeleft").html("<h3>Time Remaining: " + timer + "</h3>");
	timer --;

	if (timer === 0) {
		unanswerCount++;
		stop();
		$("#answerblock").html("<p> Time's up! The correct answer was: " + pick.choice[pick.answer] + "</p>");
		hidepicture();
	}
}
//stop timer

function stop() {
	running = false;
	clearInterval(intervalId);
}

//randomly get first question from array

function displayQuestion() {
	index = Math.floor(Math.random()*trivias.length);
	pick = trivias[index];

	$("#questionblock").html("<h2>" + pick.question + "</h2>");
	for(var i=0; i < pick.choice.length; i++) {
		var userChoice = $("<div>");
		userChoice.addClass("answerchoice");
		userChoice.html(pick.choice[i]);
		userChoice.attr("data-guessvalue", i);
		$("#answerblock").append(userChoice);

}
$(".answerchoice").on("click", function () {

	// get array position from userGuess
	userGuess = parseInt($(this).attr("data-guessvalue"));


	if (userGuess === pick.answer) {
		stop();
		correctCount++;
		userGuess="";
		$("#answerblock").html("<div id=yes>Correct!</div>");
		hidepicture();
	}

	else {
		stop();
		wrongCount++;
		userGuess="";
		$("#answerblock").html("<p>Nope! The correct answer is: " + pick.choice[pick.answer] + "</p>");
		hidepicture();
	}
})
}

function hidepicture() {
	$("#answerblock").append("<img src=" + pick.photo + ">");
	newArray.push(pick);
	trivias.splice(index,1);

	var hidpic = setTimeout(function() {
		$("#answerblock").empty();
		timer= 15;

	if ((wrongCount + correctCount + unanswerCount) === qCount) {
		$("#questionblock").empty();
		$("#questionblock").html("<h3>Results</h3>");
		$("#answerblock").append("<h4> Correct: " + correctCount + "</h4>" );
		$("#answerblock").append("<h4> Incorrect: " + wrongCount + "</h4>" );
		$("#answerblock").append("<h4> Unanswered: " + unanswerCount + "</h4>" );
		$("#reset").show();
		correctCount = 0;
		wrongCount = 0;
		unanswerCount = 0;

	} else {
		runTimer();
		displayQuestion();

	}
	}, 2000);


}

$("#reset").on("click", function() {
	$("#reset").hide();
	$("#answerblock").empty();
	$("#questionblock").empty();
	for(var i = 0; i < store.length; i++) {
		trivias.push(store[i]);
	}
	runTimer();
	displayQuestion();

})

})
