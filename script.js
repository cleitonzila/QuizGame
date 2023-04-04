class Card {
    constructor(question, option, answer){
        this.question = question
        this.option = option
        this.answer = answer
    }
}

class Deck {
    constructor(cards) {
        this.cards = cards
        this.currentCardIndex = 0
        this.score = 0
    }

    getCurrentCard() {
        return this.cards[this.currentCardIndex]
    }

    goToNextCard() {
        this.currentCardIndex++
        showCard()
    }

    shuffleCards() {
        for (let i = this.cards.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }
}



const deck = new Deck([])

fetch('questions.json')
  .then(response => response.json())
  .then(data => {
    deck.cards = data.map(cardData => new Card(cardData.question, cardData.options, cardData.answer))
    deck.shuffleCards()
    showCard()
  });

const questionContainer = document.getElementById('question-container');
const optionContainer = document.getElementById('option-container');

const showCard = () => {
    const currentCard = deck.getCurrentCard()
    const currentOptions = currentCard.option

    questionContainer.innerHTML = `<p>${currentCard.question}</p>`
    optionContainer.innerHTML = ''
    currentOptions.forEach(option => {
        const optionEl = document.createElement('button')
        optionEl.innerText = option
        optionEl.addEventListener('click', () => {
            checkAnswer(option)
        })
        optionContainer.append(optionEl)
    });
}


const checkAnswer = (selectedAnwser) => {
    const currentCard = deck.getCurrentCard()
    if(selectedAnwser === currentCard.answer) {
        deck.score++
    }
    
    if(deck.currentCardIndex < deck.cards.length -1) {
        deck.goToNextCard()
    }else {
        endGame()
    }

    
}

const endGame = () => {
    questionContainer.innerHTML = `<p>Game Over <br> your score are ${deck.score}</p>`
    optionContainer.innerHTML = ''

    const playAgainEl = document.createElement('button')
    playAgainEl.innerText = 'PlayAgain  '
    playAgainEl.addEventListener('click', () => {
        deck.currentCardIndex = 0
        deck.score = 0
        deck.shuffleCards()
        showCard()
    })

    optionContainer.append(playAgainEl)
}

showCard()