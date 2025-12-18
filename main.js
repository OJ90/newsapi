const apiKey = '1a0fc5bc90e44ccd93cb9ea23b6ee03c'
const newsContainer = document.getElementById('news-container');

// AI/ML focused search terms
const AI_ML_KEYWORDS = [
    'artificial intelligence',
    'machine learning',
    'deep learning',
    'neural network',
    'ChatGPT',
    'OpenAI',
    'LLM',
    'generative AI',
    'GPT',
    'Claude',
    'Anthropic',
    'Google AI',
    'AI model'
];

// Build search query for AI/ML news
const searchQuery = encodeURIComponent(
    '"artificial intelligence" OR "machine learning" OR "deep learning" OR ' +
    '"neural network" OR ChatGPT OR OpenAI OR "generative AI" OR GPT OR ' +
    'LLM OR Claude OR Anthropic'
);

function showLoading() {
    newsContainer.innerHTML = '<div class="loading">Loading AI & ML news...</div>';
}

function showError(message) {
    newsContainer.innerHTML = `<div class="error">Error: ${message}</div>`;
}

// Check if article is relevant to AI/ML
function isAIMLRelevant(article) {
    const text = `${article.title || ''} ${article.description || ''}`.toLowerCase();
    return AI_ML_KEYWORDS.some(keyword => text.includes(keyword.toLowerCase()));
}

async function fetchNews() {
    showLoading();

    try {
        // Use /everything endpoint with AI/ML search query, sorted by publish date
        const response = await fetch(
            `https://newsapi.org/v2/everything?q=${searchQuery}&language=en&sortBy=publishedAt&pageSize=50&apiKey=${apiKey}`
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const newsData = await response.json();

        if (newsData.status === 'error') {
            throw new Error(newsData.message || 'Failed to fetch news');
        }

        if (newsData.articles && newsData.articles.length > 0) {
            // Filter for AI/ML relevance and remove articles with missing content
            const relevantArticles = newsData.articles.filter(article =>
                article.title &&
                article.title !== '[Removed]' &&
                isAIMLRelevant(article)
            );

            if (relevantArticles.length > 0) {
                displayNews(relevantArticles);
            } else {
                newsContainer.innerHTML = '<div class="no-news">No AI & ML news articles found.</div>';
            }
        } else {
            newsContainer.innerHTML = '<div class="no-news">No AI & ML news articles found.</div>';
        }
    } catch (error) {
        console.error('Error fetching news:', error);
        showError(error.message || 'Failed to load news. Please try again later.');
    }
}

function displayNews(articles) {
    newsContainer.innerHTML = '';
    articles.forEach(article => {
        const articleElement = document.createElement('article');

        const title = article.title || 'No title available';
        const description = article.description || 'No description available';
        const imageUrl = article.urlToImage;
        const url = article.url || '#';

        articleElement.innerHTML = `
            ${imageUrl ? `<img src="${imageUrl}" alt="${title}" class="article-image">` : ''}
            <h2>${title}</h2>
            <p>${description}</p>
            <a href="${url}" target="_blank">Read more</a>
        `;
        newsContainer.appendChild(articleElement);
    });
}

fetchNews();
