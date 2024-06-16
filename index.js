// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", function() {
    // Elements
    const quoteText = document.getElementById('text');
    const quoteAuthor = document.getElementById('author');
    const newQuoteButton = document.getElementById('new-quote');
    const tweetButton = document.getElementById('tweet-quote');
    const tumblrButton = document.getElementById('tumblr-quote');

    // API URL for fetching quotes
    const apiURL = "https://api.quotable.io/random";

    // Function to fetch a new quote
    async function fetchQuote() {
        try {
            // Fetching the quote
            const response = await fetch(apiURL);
            const data = await response.json();

            // Update the text and author in the HTML
            quoteText.textContent = data.content;
            quoteAuthor.textContent = data.author || "Unknown";

            // Update the tweet and tumblr links with the new quote
            updateSocialLinks(data.content, data.author);
        } catch (error) {
            console.error("Error fetching quote:", error);
            quoteText.textContent = "Sorry, we couldn't load a new quote. Please try again later.";
            quoteAuthor.textContent = "";
        }
    }

    // Function to update social media links
    function updateSocialLinks(quote, author) {
        const tweetURL = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${quote}" - ${author}`)}`;
        const tumblrURL = `https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes&caption=${encodeURIComponent(author)}&content=${encodeURIComponent(quote)}&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button`;

        tweetButton.href = tweetURL;
        tumblrButton.href = tumblrURL;
    }

    // Fetch a new quote when the page loads
    fetchQuote();

    // Fetch a new quote when the "New Quote" button is clicked
    newQuoteButton.addEventListener('click', fetchQuote);
});
