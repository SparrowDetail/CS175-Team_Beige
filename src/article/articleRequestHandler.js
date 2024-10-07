const requestArticle = (id) => {
    sessionStorage.setItem("article", `${id}`);
    console.log("complete");
};