import './style.css';

const quoteContainer = document.getElementById(
  'quote-container',
) as HTMLDivElement;
const quoteText = document.getElementById('quote') as HTMLSpanElement;
const quoteAuthor = document.getElementById('author') as HTMLSpanElement;
const loading = document.getElementById('loading') as HTMLDivElement;

const btnTwitter = document.getElementById('twitter') as HTMLButtonElement;
const btnNewquote = document.getElementById('new-quote') as HTMLButtonElement;

interface Quote {
  author: string;
  tag: string;
  text: string;
}

function showLoadingRipple() {
  quoteContainer.hidden = true;
  loading.hidden = false;
}

function hideLoadingRipple() {
  quoteContainer.hidden = false;
  loading.hidden = true;
}

function printRandomQuote(quote: Quote) {
  if (quote.text.length > 120) {
    quoteText.classList.add('long-quote');
  } else {
    quoteText.classList.remove('long-quote');
  }
  quoteText.textContent = quote.text;
  quoteAuthor.textContent = quote.author;
}

function randomQuote(quotes: Quote[]) {
  return quotes[Math.floor(Math.random() * quotes.length)];
}

async function getQuotes() {
  showLoadingRipple();
  try {
    const apiUrl =
      'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    const response = await fetch(apiUrl);
    const quotes = (await response.json()) as Quote[];
    const quote = randomQuote(quotes);
    printRandomQuote(quote);
    console.log('quote', quote);
  } catch (error) {
    console.error(error);
  }
}
getQuotes();
