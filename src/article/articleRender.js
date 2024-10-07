const articles = [
    {
        "id": 0,
        "title": "Super Nintendo Hardware Overview",
        "headline": "What makes a Super Nintendo?",
        "author": "Steven Short",
        "date": "9/30/2024",
        "articleDir": "./articles/hardware.html"
    }
];

const initializePageData = () => {
    const articleId = parseInt(sessionStorage.getItem("article"));
    console.log(articleId);
    const article = articles.find((e) => e["id"] === articleId);
    if (article) {
        console.log(article);
        renderArticle(article);
    } else {
        console.log("oops");
    }
};

const mainSection = document.querySelector("main");
const renderArticle = ({id, title, headline, author, date, articleDir}) => {
    document.title = title;

    fetch(articleDir)
        .then(response => response.text())
        .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, "text/html");

            mainSection.innerHTML = doc;
        });
};

initializePageData();