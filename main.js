const apiKey = '1a0fc5bc90e44ccd93cb9ea23b6ee03c'
const newsContainer = document.getElementById('news-container');

function showLoading() {
    newsContainer.innerHTML = '<div class="loading">Loading news...</div>';
}

function showError(message) {
    newsContainer.innerHTML = `<div class="error">Error: ${message}</div>`;
}

async function fetchNews() {
    showLoading();

    try {
        const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const newsData = await response.json();

        if (newsData.status === 'error') {
            throw new Error(newsData.message || 'Failed to fetch news');
        }

        if (newsData.articles && newsData.articles.length > 0) {
            displayNews(newsData.articles);
        } else {
            newsContainer.innerHTML = '<div class="no-news">No news articles found.</div>';
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
