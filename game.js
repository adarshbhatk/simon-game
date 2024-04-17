var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function() {
    if(!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started=true;
    }
});

$(".btn").on("click", function () {
    var userColour = $(this).attr("id");
    userClickedPattern.push(userColour);
    playSound(userColour);
    animatePress(userColour);
    lastIndex = userClickedPattern.length - 1;
    checkAnswer(lastIndex);
});

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    
    var randomNumber = Math.floor(Math.random()*4);
    var randomColour = buttonColours[randomNumber];
    gamePattern.push(randomColour);

    $("#" + randomColour).fadeOut(150).fadeIn(150);
    playSound(randomColour);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    var button = $("#" + currentColour);
    button.addClass("pressed");
    setTimeout(function(){
        button.removeClass("pressed");
        }, 100);
}

function checkAnswer(currentLevel) {
        if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
            // console.log("Success");
            // console.log("Game pattern is " + gamePattern);
            // console.log("User clicked pattern is " + userClickedPattern);
            if (gamePattern.length === userClickedPattern.length) {
                // console.log("Level complete");
                setTimeout(function() {
                    nextSequence();
                }, 1000);
            }
        }
        else {
            // console.log("Failure");
            // console.log("Game pattern is " + gamePattern);
            // console.log("User clicked pattern is " + userClickedPattern);
            var audio = new Audio("sounds/wrong.mp3");
            audio.play();
            $("body").addClass("game-over");
            setTimeout(function(){
                $("body").removeClass("game-over");
                }, 200);
            $("#level-title").text("Game Over, Press Any Key to Restart");
            startOver();
        }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}
