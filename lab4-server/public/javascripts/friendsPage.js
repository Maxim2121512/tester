import {callAjax} from "./callAjax.js";
import {renderUserCards, renderHeader} from "./renderUserCards.js";
import UsersBlock from "./usersBlock.js";
//require("../stylesheets/style.less");

const usersBlock = new UsersBlock();

$(document).ready(() => {
    const id = new URLSearchParams(window.location.search).get('id');

    callAjax(`/get/user?id=${id}`, 'GET', (data) => {
        renderHeader(data, "header-content");
    });

    callAjax(`/get/friends?id=${id}`, 'GET', (data) => {
        renderUserCards(data, "usersBlock-content");
        usersBlock.initialize();
    });
});

$(".button-back").on("click", () => {
    window.location.href = "/users";
});
