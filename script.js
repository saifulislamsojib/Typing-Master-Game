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
    setTime();
}

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
    }
})

// Set Timer
const setTime = () => {
    timerDisplay.innerHTML = 0;
    const startDate = new Date;
    setInterval(() => {
        let second = Math.floor((new Date - startDate)/1000);
        timerDisplay.innerHTML = second;
    }, 1000);
}