var rows = 5;
var columns = 5;
//import puzzle_choice from '/main_menu.js'
//console.log("p: " +puzzle_choice)
var selected_puzzle = "url(assets/puzzles/block/6/";


const waitHolderElement1 = document.getElementById('wait-holder1')
const waitHolderElement2 = document.getElementById('wait-holder2')
const waitHolderElement3 = document.getElementById('wait-holder3')
const waitHolderElement4 = document.getElementById('wait-holder4')
const waitHolderElement = [waitHolderElement1, waitHolderElement2, waitHolderElement3, waitHolderElement4]

const questionContainerElement1 = document.getElementById('question-container1')
const questionContainerElement2 = document.getElementById('question-container2')
const questionContainerElement3 = document.getElementById('question-container3')
const questionContainerElement4 = document.getElementById('question-container4')
const questionContainerElement = [questionContainerElement1, questionContainerElement2, questionContainerElement3, questionContainerElement4]

const questionElement1 = document.getElementById('question1')
const questionElement2 = document.getElementById('question2')
const questionElement3 = document.getElementById('question3')
const questionElement4 = document.getElementById('question4')
const questionElement = [questionElement1, questionElement2, questionElement3, questionElement4]

const answerButtonsElement1 = document.getElementById('answer-buttons1')
const answerButtonsElement2 = document.getElementById('answer-buttons2')
const answerButtonsElement3 = document.getElementById('answer-buttons3')
const answerButtonsElement4 = document.getElementById('answer-buttons4')
const answerButtonsElement = [answerButtonsElement1, answerButtonsElement2, answerButtonsElement3, answerButtonsElement4]

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
    document.getElementById("timer-container1").innerHTML = ('0' + minutes).slice(-2) + ":" + ('0' + seconds).slice(-2);
    document.getElementById("timer-container2").innerHTML = ('0' + minutes).slice(-2) + ":" + ('0' + seconds).slice(-2);
    document.getElementById("timer-container3").innerHTML = ('0' + minutes).slice(-2) + ":" + ('0' + seconds).slice(-2);
    document.getElementById("timer-container4").innerHTML = ('0' + minutes).slice(-2) + ":" + ('0' + seconds).slice(-2);

    // If the count down is over, write some text 
    if (distance < 0) {
        window.location.replace("./game-over.html");

        clearInterval(x);
        document.getElementById("timer-container1").innerHTML = "EXPIRED";
        document.getElementById("timer-container2").innerHTML = "EXPIRED";
        document.getElementById("timer-container3").innerHTML = "EXPIRED";
        document.getElementById("timer-container4").innerHTML = "EXPIRED";
    }
}, 1000)

window.onload = function () {
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
        var image = selected_puzzle+"piece-" + pieces[i] + ".jpg)";
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
}


const gameCompleteArray = new Array(rows * columns).fill(false);

function allAreTrue(arr) {
    return arr.every(element => element === true);
}

//Interact.js-----------------------------------------------------------------------------------------------------------
var element = document.getElementById("schedule");
var player = 0
interact('.btn');

let availablePlayers = [0, 1, 2, 3]
availablePlayers.sort(() => Math.random() - .5)

interact('.locked')
    .on('tap', function (event) {
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
        var plIndex;
        if ((plIndex = availablePlayers.indexOf(parseInt(numPlayer[1]))) != -1) {
            availablePlayers.splice(plIndex, 1)
            if (availablePlayers.length >= 1) {
                event.target.classList.remove("locked");
                setNextQuestion(availablePlayers.shift(), unlockPiece)
            }
            availablePlayers.push(parseInt(numPlayer[1]))
            availablePlayers.sort(() => Math.random() - .5)
        } else {
            if (availablePlayers.length >= 1) {
                event.target.classList.remove("locked");
                setNextQuestion(availablePlayers.shift(), unlockPiece)
            }
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
                clearStatusClass(document.body)
                waitHolderElement[selectedButton.player].classList.remove('hide')
                questionContainerElement[selectedButton.player].classList.add('hide')
                availablePlayers.push(selectedButton.player)
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
            waitHolderElement[2].innerHTML = "All pieces unlocked!" + "<br />" + " Now complete the puzzle :)"
            waitHolderElement[3].innerHTML = "All pieces unlocked!" + "<br />" + " Now complete the puzzle :)"
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
        question: 'Question 1',
        answers: [{
                text: 'False',
                correct: false
            },
            {
                text: 'True',
                correct: true
            },
            {
                text: 'False',
                correct: false
            },
            {
                text: 'False',
                correct: false
            }
        ]
    },

    {
        question: 'Question 2',
        answers: [{
                text: 'False',
                correct: false
            },
            {
                text: 'False',
                correct: false
            },
            {
                text: 'False',
                correct: false
            },
            {
                text: 'True',
                correct: true
            }
        ]
    },

    {
        question: 'Question 3',
        answers: [{
                text: 'False',
                correct: false
            },
            {
                text: 'False',
                correct: false
            },
            {
                text: 'False',
                correct: false
            },
            {
                text: 'True',
                correct: true
            }
        ]
    },

    {
        question: 'Question 4',
        answers: [{
                text: 'False',
                correct: false
            },
            {
                text: 'False',
                correct: false
            },
            {
                text: 'False',
                correct: false
            },
            {
                text: 'True',
                correct: true
            }
        ]
    },

    {
        question: 'Question 5',
        answers: [{
                text: 'False',
                correct: false
            },
            {
                text: 'False',
                correct: false
            },
            {
                text: 'False',
                correct: false
            },
            {
                text: 'True',
                correct: true
            }
        ]
    },

    {
        question: 'Question 6',
        answers: [{
                text: 'False',
                correct: false
            },
            {
                text: 'False',
                correct: false
            },
            {
                text: 'False',
                correct: false
            },
            {
                text: 'True',
                correct: true
            }
        ]
    },

    {
        question: 'Question 7',
        answers: [{
                text: 'False',
                correct: false
            },
            {
                text: 'False',
                correct: false
            },
            {
                text: 'False',
                correct: false
            },
            {
                text: 'True',
                correct: true
            }
        ]
    },

    {
        question: 'Question 8',
        answers: [{
                text: 'False',
                correct: false
            },
            {
                text: 'False',
                correct: false
            },
            {
                text: 'False',
                correct: false
            },
            {
                text: 'True',
                correct: true
            }
        ]
    },

    {
        question: 'Question 9',
        answers: [{
                text: 'False',
                correct: false
            },
            {
                text: 'False',
                correct: false
            },
            {
                text: 'False',
                correct: false
            },
            {
                text: 'True',
                correct: true
            }
        ]
    },

    {
        question: 'Question 10',
        answers: [{
                text: 'False',
                correct: false
            },
            {
                text: 'False',
                correct: false
            },
            {
                text: 'False',
                correct: false
            },
            {
                text: 'True',
                correct: true
            }
        ]
    }

]