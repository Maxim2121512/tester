import {callAjax} from "./callAjax.js";
import {renderUserCards} from "./renderUserCards.js";
import UsersBlock from "./usersBlock.js";
//require("../stylesheets/style.less");


const usersBlock = new UsersBlock();

$(document).ready(() => {
    callAjax('/get/allUsers', 'GET', (data) => {
        renderUserCards(data, "usersBlock-content");
        usersBlock.initialize();
    });
});

