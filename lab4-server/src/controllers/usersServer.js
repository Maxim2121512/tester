
const {authJson} = require('../model/AuthJson')
const {newsJson} = require('../model/NewsJson')
const {usersJson}= require('../model/UsersJson');



class UsersServer {
    getAllUsers() {
        return usersJson.data;
    }

    editUser(data) {
        usersJson.editElement(data);
    }

    getUserFriends(id) {
        const friendsId = usersJson.getElementById(id, "friends");
        return usersJson.getObjectsById(friendsId);
    }

    getUserFriendsNews(id) {
        const friendsList = usersJson.getElementById(id, "friends");
        let friendsNews = newsJson.getFriendsNews(friendsList)
        let friendsNames = {};

        for(let i = 0; i < friendsList.length; i++) {
            friendsNames[friendsList[i]] = usersJson.getElementsById(friendsList[i], ["firstName", "lastName", "middleName"]);
        }
        console.log({news: friendsNews,
            usernames: friendsNames})
        return {
            news: friendsNews,
            usernames: friendsNames
        };
    }

    getUser(id) {
        return usersJson.getObjectById(id);
    }

}

module.exports.usersServer = new UsersServer();