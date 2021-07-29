const quoteContainer = document.getElementById("quoteContainer");
const quoteText = document.getElementById("quoteText");
const authorText = document.getElementById("authorText");
const twitterBtn = document.getElementById("twitterBtn");
const newQuoteBtn = document.getElementById("newQuoteBtn");
const loader = document.getElementById("loader");
let apiQuote = [];

/* loader animation */
function showLoadingAnimation(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}
function removeLoadingAnimation(){
    loader.hidden = true;
    quoteContainer.hidden = false;
}

/* choose a quote from random quote and display*/
function newQuote(){
    showLoadingAnimation();
    const quote = apiQuote[Math.floor(Math.random()*apiQuote.length)];
    if(quote.text.length  < 100){
        quoteText.classList.add("quote-text");
    }else{
        quoteText.classList.remove("quote-text");
    }
    removeLoadingAnimation();
    quoteText.textContent = quote.text;

    if(! quote.author){
        authorText.textContent =  "Unknown";
    }else{
        authorText.textContent = quote.author;
    }   
}

/* Getting new quotes using api */
async function getNewQuote(){
    showLoadingAnimation();
    const apiUrl = "https://type.fit/api/quotes";
    try{
        const response = await fetch(apiUrl);
        apiQuote = await response.json();
        newQuote();
    }catch(error){
        getNewQuote();
        console.log("can't load" + error);
    }
}

/* invoke function to getting quote from api */
getNewQuote();

/* tweet quote on twitter by clicking on twitter button */
function tweetQuote(){
    const twitterUrl = `https://twitter.com/compose/tweet?text=${quoteText.textContent} - ${authorText.textContent}`
    window.open(twitterUrl);
}
/* detect click on twitter button and call function to tweet the quote */
twitterBtn.addEventListener("click" , tweetQuote);

/*detect click on new quote button and call function to get new quote */
newQuoteBtn.addEventListener("click" , getNewQuote);























