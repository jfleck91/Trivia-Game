
var panel = $('#quiz-area');
var countStartNumber = 30;

//CLICK EVENTS

$(document).on('click', '#start-over', function(e) {
  game.reset();
});

$(document).on('click', '.answer-button', function(e) {
  game.clicked(e);
});

$(document).on('click', '#start', function(e) {
  $('#subwrapper').prepend('<h2>Time Remaining: <span id="counter-number">30</span> Seconds</h2>');
  game.loadQuestion();
});

//Questions

var questions = [{
  question: "How many hubcaps did the Charger lose in the bullit chase scene?",
  answers: ["Two", "Four", "Six", "Eight"],
  correctAnswer: "Eight",
  image:"Assets/images/bullitt.gif"
}, {
  question: "what cars were 'in early this year' in The Blues Brothers?",
  answers: ["Chryslers","Oldsmobiles", "Datsuns", "Mercurys"],
  correctAnswer: "Oldsmobiles",
  image:"Assets/images/blues.gif"
}, {
  question: "what type of truck did Snowman drive in Smokey and the Bandit?",
  answers: ["Kenworth", "Mack", "Peterbuilt", "Freightliner"],
  correctAnswer: "Kenworth",
  image:"Assets/images/smokey.gif"
}, {
  question: "How many Chargers were typicaly destroyed filming each Dukes of Hazzard episode?",
  answers: ["One", "Two", "Three", "Four"],
  correctAnswer: "Two",
  image:"Assets/images/dukes.gif"
}, {
  question: "What fictional company made the Family Truckster?",
  answers: ["SportsWagon", "Montgomery", "Wagon Queen", "Vapid"],
  correctAnswer: "Wagon Queen",
  image:"Assets/images/truckster.gif"
}, {
  question: "What is the first car seen in the Fast and the Furious franchise?",
  answers: ["RX7", "Supra", "Skyline", "Eclipse"],
  correctAnswer: "Eclipse",
  image:"Assets/images/eclipse.gif"
}, {
  question: "What did the nitrous button in Eleanor say?",
  answers: ["Gone Baby Gone", "Go Baby Go", "Bye Bye Baby", "Go Go Go"],
  correctAnswer: "Go Baby Go",
  image:"Assets/images/gone.gif"
}, {
  question: "What make of car was the first Batmobile based off of?",
  answers: ["Lincoln", "Pontiac", "Chrysler", "Buick"],
  correctAnswer: "Lincoln",
  image:"Assets/images/batmobile.gif"
}, {
    question: "What was the mileage on the Ferrari when Cameron loses it in Ferris Buellers Day Off?",
    answers: ["194.4", "230.6", "301.7", "472.9"],
    correctAnswer: "301.7",
    image:"Assets/images/bueler.gif"
  }, {
    question: "How much power did the delorean require to travel through time?",
    answers: ["1.21 milliwatts", "1.21 megawatts", "1.21 gigawatts", "1.21 Terawatts"],
    correctAnswer: "1.21 gigawatts",
    image:"Assets/images/delorean.gif"
}];

// functions

var game = {
  questions:questions,
  currentQuestion:0,
  counter:countStartNumber,
  correct:0,
  incorrect:0,
  countdown: function(){
    game.counter--;
    $('#counter-number').html(game.counter);

    if (game.counter === 0){
      console.log('TIME UP');
      game.timeUp();
    }
  },
  loadQuestion: function(){
    timer = setInterval(game.countdown, 1000);
    panel.html('<h2>' + questions[this.currentQuestion].question + '</h2>' );
    for (var i = 0; i<questions[this.currentQuestion].answers.length; i++){
      panel.append('<button class="answer-button" id="button"' + 'data-name="' + questions[this.currentQuestion].answers[i] + '">' + questions[this.currentQuestion].answers[i]+ '</button>');
    } 
  },
  nextQuestion: function(){
    game.counter = countStartNumber;
    $('#counter-number').html(game.counter);
    game.currentQuestion++;
    game.loadQuestion();
  },
  timeUp: function (){
    clearInterval(timer);
    $('#counter-number').html(game.counter);

    panel.html('<h2>Out of Time!</h2>');
    panel.append('<h3>The Correct Answer was: ' + questions[this.currentQuestion].correctAnswer);
    panel.append('<img src="' + questions[this.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 5 * 1000);
    } else {
      setTimeout(game.nextQuestion, 5 * 1000);
    }
  },
  results: function() {
    clearInterval(timer);

    panel.html('<h2>All done, heres how you did!</h2>');
    $('#counter-number').html(game.counter);
    panel.append('<h3>Correct Answers: ' + game.correct + '</h3>');
    panel.append('<h3>Incorrect Answers: ' + game.incorrect + '</h3>');
    panel.append('<h3>Unanswered: ' + (questions.length - (game.incorrect + game.correct)) + '</h3>');
    panel.append('<br><button id="start-over">Start Over?</button>');
  },
  clicked: function(e) {
    clearInterval(timer);

    if ($(e.target).data("name") === questions[this.currentQuestion].correctAnswer){
      this.answeredCorrectly();
    } else {
      this.answeredIncorrectly();
    }
  },
  answeredIncorrectly: function() {
    game.incorrect++;
    clearInterval(timer);
    panel.html('<h2>Nope!</h2>');
    panel.append('<h3>The Correct Answer was: ' + questions[game.currentQuestion].correctAnswer + '</h3>');
    panel.append('<img src="' + questions[game.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 5 * 1000);
    } else {
      setTimeout(game.nextQuestion, 5 * 1000);
    }
  },
  answeredCorrectly: function(){
    clearInterval(timer);
    game.correct++;
    panel.html('<h2>Correct!</h2>');
    panel.append('<img src="' + questions[game.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 5 * 1000);
    } else {
      setTimeout(game.nextQuestion, 5 * 1000);
    }
  },
  reset: function(){
    this.currentQuestion = 0;
    this.counter = countStartNumber;
    this.correct = 0;
    this.incorrect = 0;
    this.loadQuestion();
  }
};

$( "#start" ).click(function() {
    $('#quiz-area').show(); 
});