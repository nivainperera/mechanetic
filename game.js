const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'When was gold found in Ballarat?',
        choice1: 'Sep 13, 1851',
        choice2: 'Aug 28, 1951',
        choice3: 'Aug 18, 1851',
        choice4: 'Jul 20, 1751',
        answer: 3,
    },
    {
        question:"How old are the corals in the Great Barrier Reef?",
        choice1: "20 Million Years Old",
        choice2: "3 Days Old",
        choice3: "5 Million Years Old",
        choice4: "None Of The Above",
        answer: 1,
    },
    {
        question: "How far away is Surfers Paradise from Brisbane?",
        choice1: "183 Kilometres",
        choice2: "83 Kilometres",
        choice3: "62 Meters",
        choice4: "1735 Kilometres",
        answer: 2,
    },
    {
        question: "What does “Bondi” mean in the Aboriginal language?",
        choice1: "Water Over The Rocks",
        choice2: "Noise Of Rocks Breaking Over Water",
        choice3: "Water Breaking Over Rocks",
        choice4: "Rocks Breaking Water",
        answer: 3,
    },
    {
        question: "How long did it take to build the Sydney Harbour Bridge?",
        choice1: "8 Years",
        choice2: "12 Years",
        choice3: "4 Years",
        choice4: "2 Days",
        answer: 1,
    },
    {
        question: "How much did Jørn Utzon earn for his design of the Sydney Opera House?",
        choice1: "₤3.50",
        choice2: "₤5000",
        choice3: "₤200",
        choice4: "₤1 Million",
        answer: 2,
    },
    {
        question: "When was the Great Ocean Road Built?",
        choice1: "1929",
        choice2: "1989",
        choice3: "2019",
        choice4: "1919",
        answer: 4,
    },
    {
        question: "Which of these celebrities have climbed The Sydney Harbour Bridge?",
        choice1: "Kylie Minogue",
        choice2: "Robert De Niro",
        choice3: "Jamie Oliver",
        choice4: "All Of The Above",
        answer: 4,
    },
    {
        question: "How high is Uluru",
        choice1: "400 Metres",
        choice2: "348 Metres",
        choice3: "383 Metres",
        choice4: "4 Centimetres",
        answer: 2,
    },
    {
        question: "How much would the Welcome Nugget (the biggest gold nugget found in Ballarat) be sold for today?",
        choice1: "$1,700,000",
        choice2: "$1,200,000",
        choice3: "$700,000",
        choice4: "$0.03",
        answer: 1,
    },
    {
        question: "How long is the Surfers Paradise beach?",
        choice1: "1000 Metres",
        choice2: "1500 Metres",
        choice3: "2000 Metres",
        choice4: "2500 Metres",
        answer: 3,
    },
    {
        question: "How were the Twelve Apostles formed?",
        choice1: "Aliens Placed The Rocks",
        choice2: "Artificially Made",
        choice3: "Photosynthesis",
        choice4: "Erosion",
        answer: 4,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 12

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()