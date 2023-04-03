const apiKey = '1a0fc5bc90e44ccd93cb9ea23b6ee03c'
const newsContainer = document.getElementById('news-container');

async function fetchNews() {
    const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`);
    const newsData = await response.json();
    displayNews(newsData.articles);
}

function displayNews(articles) {
    newsContainer.innerHTML = '';
    articles.forEach(article => {
        const articleElement = document.createElement('article');
        articleElement.innerHTML = `
            <h2>${article.title}</h2>
            <p>${article.description}</p>
            <a href="${article.url}" target="_blank">Read more</a>
        `;
        newsContainer.appendChild(articleElement);
    });
}

fetchNews();
