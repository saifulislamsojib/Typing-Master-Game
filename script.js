const url = 'https://api.quotable.io/random';

// Get Random Quote
const getRandomQuote = async () => {
    const response = await fetch(url);
    const data = await response.json();
    displayRandomQuote(data.content);
}
getRandomQuote();

// Display Random Quote
const displayRandomQuote = (content) => {
    const quoteDisplay = document.getElementById('quote-display');
    quoteDisplay.innerText = content;
}