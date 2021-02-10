const url = 'https://api.quotable.io/random';
const quoteDisplay = document.getElementById('quote-display');
const quoteInput = document.getElementById('quote-input');
const timerDisplay = document.getElementById('timer-display');

// Get Random Quote
const getRandomQuote = async () => {
    const response = await fetch(url);
    const data = await response.json();
    displayRandomQuote(data.content);
}
getRandomQuote();

// Display Random Quote
const displayRandomQuote = (content) => {
    timerDisplay.innerHTML = 0;
    if (content.length < 150 && content.length > 40) {
        quoteDisplay.innerHTML = "";
        [...content].map(quote => {
            const span = document.createElement('span');
            span.innerText = quote;
            quoteDisplay.appendChild(span);
        })
        quoteInput.value = null;
    }
    else{
        getRandomQuote();
    }
}

let isCount = true;
// correct or incorrect
quoteInput.addEventListener("input", e => {
    const spans = document.querySelectorAll("span");
    const arr = [...e.target.value];
    let finish = true;
    [...spans].map((span, i) =>{
        if (arr[i] == null) {
            span.classList.remove("incorrect");
            span.classList.remove("correct");
            finish = false;
        }
        else if (span.innerText === arr[i]) {
            span.classList.add("correct");
            span.classList.remove("incorrect");
        }
        else{
            span.classList.add("incorrect");
            span.classList.remove("correct");
            finish = false;
        }
    })
    if (finish) {
        getRandomQuote();
        isCount = true;
        timePlay(e);
    }
    timePlay(e);
})
const timePlay = e => {
    if (e.target.value && isCount) {
        setTime()
        isCount = false;
    }
}

// Set Timer
let second = 0;
let startDate;
const setTime = () => {
    startDate = new Date;
    setInterval(() => {
        second = Math.floor((new Date - startDate)/1000);
        timerDisplay.innerHTML = second;
    }, 1000);
}