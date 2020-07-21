const cards = document.querySelectorAll('.memory-card')
cards.forEach(card => card.addEventListener('click', flipCard))
let isflip = false
let firstCard
let secondCard
let lockBoard = false
let successAttempts = 0
let failedAttempts = 0
function flipCard () {
    if (lockBoard) return
    if (this === firstCard) return
    this.classList.add('flip')
    if (isflip !== true) {
        isflip = true
        firstCard = this
    } else {
        secondCard = this
        checkForMatch()
    }
    function checkForMatch () {
        firstCard.dataset.name === secondCard.dataset.name ? disableCards() : unflipCards()
    }
    function disableCards () {
        successAttempts++
        firstCard.removeEventListener('click', flipCard)
        secondCard.removeEventListener('click', flipCard)
        console.log('removed click')
        resetBoard()
    }
    function unflipCards () {
        failedAttempts++
        lockBoard = true
        setTimeout(() => {
            firstCard.classList.remove('flip')
            secondCard.classList.remove('flip')
            resetBoard()
        }, 1500)
    }
    function resetBoard () {
        firstCard = null
        secondCard = null
        isflip = false
        lockBoard = false
        // console.log(object);
        attemptData()
    }
}
function shuffle () {
    cards.forEach(card => {
        const randomPosition = Math.floor(Math.random() * 12)
        // console.log(randomPosition)
        card.style.order = randomPosition
    })
}
window.onload = shuffle()
function attemptData () {
    console.log('sucess : ' + successAttempts)
    console.log('failed: ' + failedAttempts)
}
