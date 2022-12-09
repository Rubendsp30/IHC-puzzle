var rows = 5;
var columns = 5;
//import puzzle_choice from '/main_menu.js'
var selected_puzzle = 5;


var questionSound;
var dropSound;
var rightSound;
var wrongSound;

const waitHolderElement2 = document.getElementById('wait-holder2')
const waitHolderElement3 = document.getElementById('wait-holder3')
const waitHolderElement = [waitHolderElement2, waitHolderElement3]

const questionContainerElement2 = document.getElementById('question-container2')
const questionContainerElement3 = document.getElementById('question-container3')
const questionContainerElement = [questionContainerElement2, questionContainerElement3]

const questionElement2 = document.getElementById('question2')
const questionElement3 = document.getElementById('question3')
const questionElement = [questionElement2, questionElement3]

const answerButtonsElement2 = document.getElementById('answer-buttons2')
const answerButtonsElement3 = document.getElementById('answer-buttons3')
const answerButtonsElement = [answerButtonsElement2, answerButtonsElement3]

let shuffledQuestions, currentQuestionIndex

var distance;

// Set the date we're counting down to
var countDownDate = new Date().getTime() + (20 * 60 * 1000);

// Update the count down every 1 second
var x = setInterval(function () {

    // Get today's date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Output the result in an element with id="demo"
    document.getElementById("timer-container2").innerHTML = ('0' + minutes).slice(-2) + ":" + ('0' + seconds).slice(-2);
    document.getElementById("timer-container3").innerHTML = ('0' + minutes).slice(-2) + ":" + ('0' + seconds).slice(-2);

    // If the count down is over, write some text 
    if (distance < 0) {
        window.location.replace("./game-over.html");

        clearInterval(x);
        document.getElementById("timer-container2").innerHTML = "EXPIRED";
        document.getElementById("timer-container3").innerHTML = "EXPIRED";
    }
}, 1000)

window.onload = function () {

    var puzzle_choice = sessionStorage.getItem("puzzle_choice");
    selected_puzzle = "url(assets/puzzles/block/" + puzzle_choice + "/";

    let pieces = [];
    for (let i = 1; i <= rows * columns; i++) {
        pieces.push(i.toString()); //put "1" to "25" into the array (puzzle images names)
    }
    pieces.reverse();
    for (let i = 0; i < pieces.length; i++) {
        let j = Math.floor(Math.random() * pieces.length);

        //swap
        let tmp = pieces[i];
        pieces[i] = pieces[j];
        pieces[j] = tmp;
    }

    const piecesBlock = document.getElementsByClassName("drag-drop");
    for (let i = 0; i < piecesBlock.length; i++) {
        var image = selected_puzzle + "piece-" + pieces[i] + ".jpg)";
        piecesBlock[i].style.backgroundImage = image;
        piecesBlock[i].style.backgroundSize = "cover";
        piecesBlock[i].style.backgroundRepeat = "no-repeat";
        var className = "piece-" + pieces[i];
        piecesBlock[i].classList.add(className);
    }

    //generate locked pieces
    let lockedIndex = pieces;
    for (let i = 0; i < pieces.length; i++) {
        let j = Math.floor(Math.random() * pieces.length);

        //swap
        let tmp = lockedIndex[i];
        lockedIndex[i] = lockedIndex[j];
        lockedIndex[j] = tmp;
    }

    for (let i = 0; i < 12; i++) {
        let lockInd = lockedIndex[i] - 1;
        var image = "url(assets/images/lock.png)";
        piecesBlock[lockInd].style.backgroundImage = image;
        piecesBlock[lockInd].classList.remove("draggable");
        piecesBlock[lockInd].classList.add("locked");
    }

    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0

    questionSound = new sound("assets/question.wav");
    dropSound = new sound("assets/drop.mp3");

    rightSound = new sound("assets/right-ans.mp3");
    wrongSound = new sound("assets/wrong-ans.mp3");
}


const gameCompleteArray = new Array(rows * columns).fill(false);

function allAreTrue(arr) {
    return arr.every(element => element === true);
}


function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function(){
    this.sound.play();
  }
  this.stop = function(){
    this.sound.pause();
  }
}

//Interact.js-----------------------------------------------------------------------------------------------------------
var element = document.getElementById("schedule");
var playerAvaiable=[1,1]

interact('.locked')
    .on('tap', function (event) {

        var other=0;
        const strPlayer = event.target.className;
        const wordsPlayer = strPlayer.split(' ');
        const tmpStrPlayer = "player-";

        const tmpUnlockPiece = "piece-";

        var wordIndex = wordsPlayer.findIndex(element => {
            if (element.includes(tmpUnlockPiece)) {
                return true;
            }
        });
        const unlockPiece = wordsPlayer[wordIndex]

        wordIndex = wordsPlayer.findIndex(element => {
            if (element.includes(tmpStrPlayer)) {
                return true;
            }
        });
        const numPlayer = wordsPlayer[wordIndex].split('-');
        

        if(numPlayer[1]=="1"){
            other = 1;
        }

        if(playerAvaiable[other]==1){
            questionSound.play();
            event.target.classList.remove("locked");
            playerAvaiable[other]=0;
            setNextQuestion(other, unlockPiece);
        }

        event.preventDefault()
    });

// target elements with the "draggable" class

interact('.draggable')
    .draggable({
        // enable inertial throwing
        inertia: true,
        // keep the element within the area of it's parent
        modifiers: [
            interact.modifiers.restrictRect({
                restriction: 'body',
                endOnly: true
            })
        ],
        // enable autoScroll
        autoScroll: false,

        listeners: {

            // call this function on every dragmove event
            move: dragMoveListener

            // call this function on every dragend event
        }
    })

// enable draggables to be dropped into this
interact('.dropzone').dropzone({
    //accept: '#dragabble-1',
    overlap: 0.6,

    // listen for drop related events:

    ondropactivate: function (event) {
        // add active dropzone feedback                  
    },
    ondragenter: function (event) {
        var draggableElement = event.relatedTarget,
            dropzoneElement = event.target;
        // feedback the possibility of a drop
    },
    ondragleave: function (event) {
        // remove the drop feedback style
        const strPiece = event.relatedTarget.className;
        const wordsPiece = strPiece.split(' ');
        const numPiece = wordsPiece[2].split('-');
        const strZone = event.target.id;
        const numZone = strZone.split('-');
        if (numZone[1] === numPiece[1]) {
            gameCompleteArray[numZone[1] - 1] = false;
        }
    },
    ondrop: function (event) {
        var draggableElement = event.relatedTarget,
            dropzoneElement = event.target,
            dropRect = getOffset(dropzoneElement),
            x = dropRect.left,
            y = dropRect.top + 2;

        event.relatedTarget.style.position = 'absolute';
        draggableElement.style.left = 0;
        draggableElement.style.top = 0;

        draggableElement.style.webkitTransform = draggableElement.style.webkitTransform -
            (draggableElement.style.transform =
                'translate(' + x + 'px, ' + y + 'px)');

        // update the posiion attributes
        draggableElement.setAttribute('data-x', x);
        draggableElement.setAttribute('data-y', y);
        const strPiece = draggableElement.className;
        const wordsPiece = strPiece.split(' ');
        var tmpStrPiece = "piece-";


        const wordIndex = wordsPiece.findIndex(element => {
            if (element.includes(tmpStrPiece)) {
                return true;
            }
        });
        const numPiece = wordsPiece[wordIndex].split('-');
        const strZone = dropzoneElement.id;
        const numZone = strZone.split('-');

                dropSound.play();

        if (numZone[1] === numPiece[1]) {
            gameCompleteArray[numZone[1] - 1] = true;

            if (allAreTrue(gameCompleteArray)) {
                window.location.href = "win.html";
                //EDIT THIS FOR WIN SCREEN
                /* const victoryBlock = document.getElementsByClassName("draggable");
                 for (let i = 0; i < victoryBlock.length; i++) {
                     victoryBlock[i].innerHTML = "WIIIIIINNN";

                 }*/

            }

        }
    },
    ondropdeactivate: function (event) {
        // remove active dropzone feedback
        event.target.classList.remove('drop-active');
        event.target.classList.remove('drop-target');
    }
});

function dragMoveListener(event) {
    var target = event.target,
        // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    // translate the element
    target.style.webkitTransform =
        target.style.transform =
        'translate(' + x + 'px, ' + y + 'px)';

    //  target.style.webkitTransform =
    //target.style.transform = 'scale(1.1)';

    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);

}

function getOffset(el) {
    el = el.getBoundingClientRect();
    return {
        left: el.left + window.scrollX,
        top: el.top + window.scrollY
    }

}
// this is used later in the resizing and gesture demos
window.dragMoveListener = dragMoveListener;


//Trivia-----------------------------------------------------------------------------------------------------------

function setNextQuestion(player, unlockPiece) {
    resetState(player)
    showQuestion(shuffledQuestions[currentQuestionIndex], player, unlockPiece)
    currentQuestionIndex++
}

function showQuestion(question, player, unlockPiece) {

    questionElement[player].innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }

        button.addEventListener('click', selectAnswer)
        button.player = player;
        button.unlockPiece = unlockPiece;
        answerButtonsElement[player].appendChild(button)
    })
}

function resetState(player) {
    clearStatusClass(document.body)
    waitHolderElement[player].classList.add('hide')
    questionContainerElement[player].classList.remove('hide')
    while (answerButtonsElement[player].firstChild) {
        answerButtonsElement[player].removeChild(answerButtonsElement[player].firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    if (!correct) {
        wrongSound.play();
        countDownDate = countDownDate - (1 * 60 * 1000)
    }
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement[selectedButton.player].children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        setTimeout(() => {
            if (!correct) {
                setNextQuestion(selectedButton.player, selectedButton.unlockPiece)
            } else {
                rightSound.play();
                clearStatusClass(document.body)
                waitHolderElement[selectedButton.player].classList.remove('hide')
                questionContainerElement[selectedButton.player].classList.add('hide')
                playerAvaiable[selectedButton.player]=1;
                const unlockedPiece = document.getElementsByClassName(selectedButton.unlockPiece);
                unlockedPiece[0].classList.add('draggable');
                var image = selected_puzzle + selectedButton.unlockPiece + ".jpg)";
                unlockedPiece[0].style.backgroundImage = image;
            }

        }, 1000);
    } else {

        setTimeout(() => {
            questionContainerElement[selectedButton.player].classList.add('hide')
            waitHolderElement[selectedButton.player].classList.remove('hide')
            waitHolderElement[0].innerHTML = "All pieces unlocked!" + "<br />" + " Now complete the puzzle :)"
            waitHolderElement[1].innerHTML = "All pieces unlocked!" + "<br />" + " Now complete the puzzle :)"
        }, 1000);

    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const questions = [{
        question: 'What do we call an object that we are unable to see through at all?',
        answers: [{
                text: 'Opaque',
                correct: true
            },
            {
                text: 'Dull',
                correct: false
            },
            {
                text: 'Transparent',
                correct: false
            },
            {
                text: 'Translucent',
                correct: false
            }
        ]
    },
    {
        question: 'Which of these materials is an electrical conductor?',
        answers: [{
                text: 'Glass',
                correct: false
            },
            {
                text: 'Copper',
                correct: true
            },
            {
                text: 'Plastic',
                correct: false
            },
            {
                text: 'Wood',
                correct: false
            }
        ]
    },
    {
        question: 'Which of these metals is magnetic?',
        answers: [{
                text: 'Gold',
                correct: false
            },
            {
                text: 'Iron',
                correct: true
            },
            {
                text: 'Silver',
                correct: false
            },
            {
                text: 'Copper',
                correct: false
            }
        ]
    },
    {
        question: 'What is the definition of condensation?',
        answers: [{
                text: 'The process where a solid becomes a liquid',
                correct: false
            },
            {
                text: 'The process where gas or vapour becomes a liquid.',
                correct: true
            },
            {
                text: 'The process where a liquid becomes a solid.',
                correct: false
            },
            {
                text: 'The process where a liquid becomes vapour or gas.',
                correct: false
            }
        ]
    },
    {
        question: 'Who was the first King of Portugal?',
        answers: [{
                text: 'D. João II',
                correct: false
            },
            {
                text: 'D. Afonso Henriques',
                correct: true
            },
            {
                text: 'D. Afonso IV',
                correct: false
            },
            {
                text: 'D. Filipe',
                correct: false
            }
        ]
    },

    {
        question: "Which of these ones isn't a common state of matter?",
        answers: [{
                text: 'Liquid',
                correct: false
            },
            {
                text: 'Solid',
                correct: false
            },
            {
                text: 'Frozen',
                correct: true
            },
            {
                text: 'Gas',
                correct: false
            }
        ]
    },

    {
        question: 'Who was youngest player to score a hat-trick at FIFA World Cup Final Stage?',
        answers: [{
                text: 'Pelé',
                correct: true
            },
            {
                text: 'Kylian Mbappé',
                correct: false
            },
            {
                text: 'Gonçalo Ramos',
                correct: false
            },
            {
                text: 'William Carvalho',
                correct: false
            }
        ]
    },

    {
        question: "Which of these colors isn't a primary one?",
        answers: [{
                text: 'Magenta',
                correct: false
            },
            {
                text: 'Cyan',
                correct: false
            },
            {
                text: 'Yellow',
                correct: false
            },
            {
                text: 'Orange',
                correct: true
            }
        ]
    },
    {
        question: 'How many castles are in the Portuguese Flag?',
        answers: [{
                text: '7',
                correct: true
            },
            {
                text: '8',
                correct: false
            },
            {
                text: '10',
                correct: false
            },
            {
                text: '6',
                correct: false
            }
        ]
    },


    {
        question: 'What is the most common name given to Sodium Chloride?',
        answers: [{
                text: 'Sugar',
                correct: false
            },
            {
                text: 'Water',
                correct: false
            },
            {
                text: 'Salt',
                correct: true
            },
            {
                text: 'Sand',
                correct: false
            }
        ]
    },

    {
        question: 'How much is 2 + 4 x 3?',
        answers: [{
                text: '18',
                correct: false
            },
            {
                text: '14',
                correct: true
            },
            {
                text: '12',
                correct: false
            },
            {
                text: '24',
                correct: false
            }
        ]
    },

    {
        question: 'How many calories are stored in 1 pound of body fat?',
        answers: [{
                text: '3500',
                correct: true
            },
            {
                text: '6000',
                correct: false
            },
            {
                text: '400',
                correct: false
            },
            {
                text: '1100',
                correct: false
            }
        ]
    },

    {
        question: 'What type of information does a DNA molecule carry?',
        answers: [{
                text: 'IT',
                correct: false
            },
            {
                text: 'Mitocondrias',
                correct: false
            },
            {
                text: 'RNA',
                correct: false
            },
            {
                text: 'Genetic',
                correct: true
            }
        ]
    },

    {
        question: 'When standing in sunlight, what vitamin does your body synthesize?',
        answers: [{
                text: 'C',
                correct: false
            },
            {
                text: 'B',
                correct: false
            },
            {
                text: 'D',
                correct: true
            },
            {
                text: 'A',
                correct: false
            }
        ]
    },
    {
        question: 'What name is given to the unit of electrical resistance?',
        answers: [{
                text: 'Volt',
                correct: false
            },
            {
                text: 'Ohm',
                correct: true
            },
            {
                text: 'Ampere',
                correct: false
            },
            {
                text: 'kg',
                correct: false
            }
        ]
    },

    {
        question: "What color is human blood that isn't oxygenated?",
        answers: [{
                text: 'Yellow',
                correct: false
            },
            {
                text: 'Brown',
                correct: false
            },
            {
                text: 'Black',
                correct: false
            },
            {
                text: 'Red',
                correct: true
            }
        ]
    },

    {
        question: 'Which country is the largest in the World?',
        answers: [{
                text: 'Canada',
                correct: false
            },
            {
                text: 'Russia',
                correct: true
            },
            {
                text: 'USA',
                correct: false
            },
            {
                text: 'Brasil',
                correct: false
            }
        ]
    },
    {
        question: 'Lisbon was destroyed by what natural disaster in 1755?',
        answers: [{
                text: 'Earthquake',
                correct: true
            },
            {
                text: 'Tornado',
                correct: false
            },
            {
                text: 'Tsunami',
                correct: false
            },
            {
                text: 'Rock Slide',
                correct: false
            }
        ]
    },
    {
        question: 'On what peninsula does Portugal lie?',
        answers: [{
                text: 'Italian Peninsula',
                correct: true
            },
            {
                text: 'Scandinavian Peninsula',
                correct: false
            },
            {
                text: 'Corean Peninsula',
                correct: false
            },
            {
                text: 'Arabian Peninsula',
                correct: false
            }
        ]
    },
    {
        question: 'On which continent is Portugal?',
        answers: [{
                text: 'Europe',
                correct: true
            },
            {
                text: 'America',
                correct: false
            },
            {
                text: 'Asia',
                correct: false
            },
            {
                text: 'Africa',
                correct: false
            }
        ]
    },
    {
        question: 'Which Disney character famously leaves a glass slipper behind at a royal ball?',
        answers: [{
                text: 'Pocahontas',
                correct: false
            },
            {
                text: 'Sleeping Beauty',
                correct: false
            },
            {
                text: 'Cinderella',
                correct: true
            },
            {
                text: 'Elsa',
                correct: false
            }
        ]
    },
    {
        question: 'What name is given to the revolving belt machinery in an airport that delivers checked luggage from the plane to baggage reclaim?',
        answers: [{
                text: 'Hangar',
                correct: false
            },
            {
                text: 'Terminal',
                correct: false
            },
            {
                text: 'Concourse',
                correct: false
            },
            {
                text: 'Carousel',
                correct: true
            }
        ]
    },
    {
        question: 'Which of these brands was chiefly associated with the manufacture of household locks?',
        answers: [{
                text: 'Phillips',
                correct: false
            },
            {
                text: 'Flymo',
                correct: false
            },
            {
                text: 'Chubb',
                correct: true
            },
            {
                text: 'Ronseal',
                correct: false
            }
        ]
    },
    {
        question: 'The hammer and sickle is one of the most recognisable symbols of which political ideology?',
        answers: [{
                text: 'Republicanism',
                correct: false
            },
            {
                text: 'Communism',
                correct: true
            },
            {
                text: 'Conservatism',
                correct: false
            },
            {
                text: 'Liberalism',
                correct: false
            }
        ]
    },
    {
        question: 'Which toys have been marketed with the phrase “robots in disguise”?',
        answers: [{
                text: 'Bratz Dolls',
                correct: false
            },
            {
                text: 'Sylvanian Families',
                correct: false
            },
            {
                text: 'Hatchimals',
                correct: false
            },
            {
                text: 'Transformers',
                correct: true
            }
        ]
    },
    {
        question: 'What does the word loquacious mean?',
        answers: [{
                text: 'Angry',
                correct: false
            },
            {
                text: 'Chatty',
                correct: true
            },
            {
                text: 'Beautiful',
                correct: false
            },
            {
                text: 'Shy',
                correct: false
            }
        ]
    },
    {
        question: 'Obstetrics is a branch of medicine particularly concerned with what?',
        answers: [{
                text: 'Childbirth',
                correct: true
            },
            {
                text: 'Broken bones',
                correct: false
            },
            {
                text: 'Heart conditions',
                correct: false
            },
            {
                text: 'Old age',
                correct: false
            }
        ]
    },
    {
        question: 'In Doctor Who, what was the signature look of the fourth Doctor, as portrayed by Tom Baker?',
        answers: [{
                text: 'Bow-tie, braces and tweed jacket',
                correct: false
            },
            {
                text: 'Wide-brimmed hat and extra long scarf',
                correct: true
            },
            {
                text: 'Pinstripe suit and trainers',
                correct: false
            },
            {
                text: 'Cape, velvet jacket and frilly shirt',
                correct: false
            }
        ]
    },
    {
        question: 'Which of these religious observances lasts for the shortest period of time during the calendar year?',
        answers: [{
                text: 'Ramadan',
                correct: false
            },
            {
                text: 'Diwali',
                correct: true
            },
            {
                text: 'Lent',
                correct: false
            },
            {
                text: 'Hanukkah',
                correct: false
            }
        ]
    },
    {
        question: ' Construction of which of these famous landmarks was completed first?',
        answers: [{
                text: 'Empire State Building',
                correct: false
            },
            {
                text: 'Royal Albert Hall',
                correct: false
            },
            {
                text: 'Eiffel Tower',
                correct: false
            },
            {
                text: 'Big Ben Clock Tower',
                correct: true
            }
        ]
    },
    {
        question: 'Which of these cetaceans is classified as a “toothed whale”?',
        answers: [{
                text: 'Gray whale',
                correct: false
            },
            {
                text: 'Minke whale',
                correct: false
            },
            {
                text: 'Sperm whale',
                correct: true
            },
            {
                text: 'Humpback whale',
                correct: false
            }
        ]
    },
    {
        question: 'Who is the only British politician to have held all four “Great Offices of State” at some point during their career?',
        answers: [{
                text: 'David Lloyd George',
                correct: false
            },
            {
                text: 'Harold Wilson',
                correct: false
            },
            {
                text: 'James Callaghan',
                correct: true
            },
            {
                text: 'John Major',
                correct: false
            }
        ]
    },
    {
        question: 'In 1718, which pirate died in battle off the coast of what is now North Carolina?',
        answers: [{
                text: 'Calico Jack',
                correct: false
            },
            {
                text: 'Blackbeard',
                correct: true
            },
            {
                text: 'Bartholomew Roberts',
                correct: false
            },
            {
                text: 'Captain Kidd',
                correct: false
            }
        ]
    },
        {
        question: 'How many nouns are in the following sentence: The rabbit ran to the cafeteria and ate a big salad',
        answers: [{
                text: 'three',
                correct: true
            },
            {
                text: 'two',
                correct: false
            },
            {
                text: 'four',
                correct: false
            },
            {
                text: 'five',
                correct: false
            }
        ]
    },

            {
        question: 'In the initials of the federal agency known as NASA, what does the first "A" stand for?',
        answers: [{
                text: 'american',
                correct: false
            },
            {
                text: 'aeronautics',
                correct: true
            },
            {
                text: 'association',
                correct: false
            },
            {
                text: 'administration',
                correct: false
            }
        ]
    },

                {
        question: "The moon casts a shadow on Earth during the",
        answers: [{
                text: 'Half moon',
                correct: false
            },
            {
                text: 'Lunar eclipse',
                correct: false
            },
            {
                text: 'Solar eclipse',
                correct: true
            },
            {
                text: 'New moon',
                correct: false
            }
        ]
    },
                    {
        question: "A ____ organism is an organism with only one cell.",
        answers: [{
                text: 'Planktonian',
                correct: false
            },
            {
                text: 'Embryonic',
                correct: false
            },
            {
                text: 'Multicellular',
                correct: false
            },
            {
                text: 'Unicellular',
                correct: true
            }
        ]
    }

]