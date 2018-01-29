$(document).ready(function() {
    $("#introSection").hide();
    $("#messageSection").hide();
    $('#instructionModal').modal();
    $('.parallax').parallax(); 
    $('.tooltipped').tooltip({ 
        delay: 50
    });


    $("#introSection").fadeIn(1000 * 5, function() { 

    });

    $("#questionSpace").hide()
    var correctCounter = 0,
        incorrectCounter = 0,
        unansweredCounter = 0,
        currentQuestionIndex = 0;


    function randomNum(x) {
        var roll = Math.floor(Math.random() * x);
        return roll;
    }

    function randomCongrats() {
        var messageRoll = randomNum(congratsMessages.length);
    }

    function countDown() {
        $('.pickAnswer').click(function() {
            $(this).data('clicked', true);
        });
        var i = 30;
        var myInterval = setInterval(function() {

            if (i < 10) {
                $('#timerSeconds').html("0" + i);
                $(".pickAnswer").on("click", function() {
                    clearInterval(myInterval);
                })
            } else {
                $('#timerSeconds').html(i);
                $(".pickAnswer").on("click", function() {
                    clearInterval(myInterval);
                })
            }

            if (i === 0) {
                unansweredCounter++;
                clearInterval(myInterval);
                currentQuestionIndex++;
                $('#timer').effect("pulsate", {
                    times: 25
                }, 1000 * 5);
                i = 30;
                postQuestion(currentQuestionIndex);
            } else {
                i--;
            }
        }, 1000);
    }

    var questions = [
 
        {
            "q": "Which character offers you the chance to blow up Megaton for residence in Tenpenny Tower and 500 caps?",
            "c": ["Alistair Tenpenny", "Sheriff Jackson", "Moira Brown"],
            "answer": 0
        },
 
        {
            "q": "Moira Brown is one of the more prominent NPCs during the early stages of the game, residing in Megaton. However, where does Moira work?",
            "c": ["Craterside Supply", "Megaton Clinic", "Moriarty's Saloon"],
            "answer": 0
        },
     
        {
            "q": "In Fallout 1, one random encounter involves a blue British police box that flashes and disappears as you approach it. What science fiction series is this in reference to?",
            "c": ["Star Wars", "Twilight Zone", "Doctor Who"],
            "answer": 2
        },
    
        {
            "q": "What weapon's name was changed in all Japanese versions of Fallout 3 and Fallout: New Vegas?",
            "c": ["Xuanlong Rifle", "Zhu Rong Pistol", "Fat Man"],
            "answer": 2
        },
    
        {
            "q": "Many quests in Fallout: New Vegas are named after songs. Which of the following quests is also a song heard in the game?",
            "c": ["Heartaches By the Number", "I don't want to set the world on fire", "Maybe"],
            "answer": 0
        },
     
        {
            "q": "What is Nick Valentine from Fallout 4",
            "c": ["A Raider", "A Synth", "A BOS Paladin"],
            "answer": 1
        },
  
        {
            "q": "What is the name of the dapper-looking gentleman in Fallout: New Vegas, who originally leaves you for dead in a shallow grave in the Mojave Wasteland?",
            "c": ["Loyal", "Benny", "Victor"],
            "answer": 1
        },
     
        {
            "q": "What is the name of the vault that you start in on Fallout 3?",
            "c": ["Vault 113", "Vault 21", "Vault 101"],
            "answer": 2
        },

        {
            "q": "When do all of the Fallout games take place?",
            "c": ["Future", "Past", "Present"],
            "answer": 0
        },

        {
            "q": "Where does the last battle in Fallout: New Vegas occur?",
            "c": ["Cottonwood Cove", "The Hoover Dam", "Camp McCarran"],
            "answer": 1
        }
    ];


    function postQuestion(n) {

        if (currentQuestionIndex < questions.length) {
            $('#question').remove();
            $('.pickAnswer').remove();
            countDown();
            $('#questionContainer').append("<div id='question'>" + questions[n].q + "</div>");
            for (var i = 0; i < questions[n].c.length; i++) {
                var newDiv = $("<div>");
                newDiv.addClass("pickAnswer").attr("indexnum", i).text(questions[n].c[i]);
                $('#choices').append(newDiv);
            }


        } else {
            resetGame();
        }

        $(".pickAnswer").on("click", function() {
            var userChoice = $(this).attr('indexnum'); 
            userChoice = parseInt(userChoice);

            if (userChoice === questions[currentQuestionIndex].answer) {
                correctCounter++;
                currentQuestionIndex++
                randomCongrats();

            } else {
                incorrectCounter++;
                currentQuestionIndex++;

            }
            postQuestion(currentQuestionIndex);
        })
    }

    function startTrivia() {
        $('#messageSection').hide();
        $('#gameMessage').empty()
        $('#questionContainer').show();
        $('#choices').show();
        $("#timer").show();
        correctCounter = 0;
        incorrectCounter = 0;
        unansweredCounter = 0;
        currentQuestionIndex = 0;

        postQuestion(currentQuestionIndex);

    }

    function resetGame() {
        $('#messageSection').show();
        $('#questionContainer').hide();
        $('#choices').hide();
        $('#timer').hide()

        $('#gameMessage').append("<h2>You have completed the assessment!</h2>");
        $('#gameMessage').append("<h4>Total Correct: " + correctCounter + "</h4>");
        $('#gameMessage').append("<h4>Total Incorrect: " + incorrectCounter + "</h4>");
        $('#gameMessage').append("<h4>Total Unanswered: " + unansweredCounter + "</h4>");

        setTimeout(startTrivia, 1000 * 10);

    }



    $("#startButton").on("click", function() {
        $("#buttonRow").hide();
        $("#introCard").remove();
        $("#timer").append("<span id='timerMinutes'>00</span>:<span id='timerSeconds'>00</span>");
        $("#questionSpace").show();

        startTrivia();


    })


});