import {callAjax} from "./callAjax.js";
import {renderNews, renderHeader} from "./renderNews.js";
//require("../stylesheets/style.less");

$(document).ready(() => {
    const id = new URLSearchParams(window.location.search).get('id');

    callAjax(`/get/user?id=${id}`, 'GET', (data) => {
        renderHeader(data, "header-content");
    });

    callAjax(`/get/news?id=${id}`, 'GET', (data) => {
        renderNews(data, "newsBlock-content");
    })
});

$(".button-back").on("click", () => {
    window.location.href = "/users";
});