const {authJson} = require('../model/AuthJson')
const {newsJson} = require('../model/NewsJson')
const {usersJson}= require('../model/UsersJson');

const socketIo = require('socket.io');

class DataController {
    constructor() {

    }
    getNews(id) {
        try{
            let news = newsJson.getElementById(id, "news");

            for (let i = 0; i < news.length; i++) {
                news[i].id = id;
            }
            const username = usersJson.getElementsById(id, ["firstName", "lastName", "middleName"]);
            return {news: news,
                usernames: {
                    [id] : username
                }};
        } catch (e) {
            console.error("Was an error", e);
        }
    }

    getUser(id) {
        return usersJson.getUserData(id)
    }

    getFriendsNews(id) {
        let friendsList = usersJson.getElementById(id, "friends")

        let friendsNews = newsJson.getFriendsNews(friendsList)
        let friendsNames = {};

        for(let i = 0; i < friendsList.length; i++) {
            friendsNames[friendsList[i]] = usersJson.getElementsById(friendsList[i], ["firstName", "lastName", "middleName"]);
        }

        return {
            news: friendsNews,
            usernames: friendsNames
        };
    }

    getFriends(id) {
        return usersJson.getElementById(id, "friends");
    }


    getAllUsers(excludeId) {
        return usersJson.getAllUsers(excludeId);
    }

    getAll() {
        return usersJson.data;
    }

    addNews(news) {
        const user = newsJson.data.find(user => user.id === news.id);

        const newItem = {
            date: news.date,
            title: news.title
        }

        user.news.push(newItem);

        newsJson.writeData(newsJson.data);
    }

    addFriendReq(userId, reqId) {
        const user = usersJson.data.find(user => user.id === userId);

        user.friendsRequests.push(reqId);

        usersJson.writeData(usersJson.data);

    }

    undoFriendReq(userId, reqId) {
        const user = usersJson.data.find(user => user.id === userId);

        const idx = user.friendsRequests.findIndex(id => id === reqId);

        user.friendsRequests.splice(idx, 1);

        usersJson.writeData(usersJson.data);
    }

    removeFriend(userId, reqId) {
        const user = usersJson.data.find(user => user.id === userId);
        const reqUser = usersJson.data.find(user => user.id === reqId);

        let idx = user.friends.findIndex(id => id === reqId);
        user.friends.splice(idx, 1);

        idx = reqUser.friends.findIndex(id => id === userId);
        reqUser.friends.splice(idx, 1);

        usersJson.writeData(usersJson.data);

    }

    acceptFriendReq(userId, reqId) {
        const reqUser = usersJson.data.find(user => user.id === reqId);
        const user = usersJson.data.find(user => user.id === userId);

        let idx = reqUser.friendsRequests.findIndex(id => id === userId);
        reqUser.friendsRequests.splice(idx, 1);

        user.friends.push(reqId);
        reqUser.friends.push(userId);

        usersJson.writeData(usersJson.data);

    }

    rejectFriendReq(userId, reqId) {
        const reqUser = usersJson.data.find(user => user.id === reqId);

        let idx = reqUser.friendsRequests.findIndex(id => id === userId);
        reqUser.friendsRequests.splice(idx, 1);

        usersJson.writeData(usersJson.data);
    }
}

let dataController = new DataController();


const {Server} = require("socket.io");



const initSocket = (server) => {
    const io = new Server(server, {
        cors: "http://localhost:3000",
        methods: ["GET", "POST"]
    });



    io.on('connection', (socket) => {
        console.log('Client connected');

        function update(reqId) {
            const allUsers = dataController.getAllUsers(reqId);
            const currentUser = dataController.getUser(reqId);

            socket.emit('updateUsersList', allUsers);
            socket.emit('updateCurrentUser', currentUser);
        }

        function updateIO(io, userId) {
            const allUsers = dataController.getAllUsers(userId);
            const currentUser = dataController.getUser(userId);

            io.to(userId).emit('updateUsersList', allUsers);
            io.to(userId).emit('updateCurrentUser', currentUser);
        }



        socket.on('initUser', (userId) => {
            socket.join(userId);
        })

        socket.on('initNews', (userId) => {
            const news = dataController.getNews(userId);
            socket.emit('newsUpdate', news);
        });

        socket.on('initFriendsNews', (userId) => {
            const friendsNews = dataController.getFriendsNews(userId);
            socket.emit('friendsNewsUpdate', friendsNews);
        });

        socket.on('initCurrentUser', (userId) => {
            const user = dataController.getUser(userId);
            socket.emit('updateCurrentUser', user);
        })

        socket.on('initUsersList', (userId) => {
            const allUsers = dataController.getAllUsers(userId);
            console.log(allUsers);
           socket.emit('updateUsersList', allUsers);
        });


        socket.on('addNews', (news) => {
            dataController.addNews(news);

            // Отправить обновление всем новостям пользователя
            const data = dataController.getNews(news.id);
            io.to(news.id).emit('newsUpdate', data);

            // Отправить обновление только друзьям пользователя
            const friendsList = dataController.getFriends(news.id);
            friendsList.forEach(friendId => {
                io.to(friendId).emit('friendsNewsUpdate', dataController.getFriendsNews(friendId));
            });

        });

        socket.on('friendRequest', (userId, reqId) => {
            dataController.addFriendReq(userId, reqId);

            update(reqId);
            updateIO(io, userId);
        })

        socket.on('undoFriendRequest', (userId, reqId) => {
            dataController.undoFriendReq(userId, reqId);

            update(reqId);
            updateIO(io, userId);
        })

        socket.on('removeFriend', (userId, reqId) => {
            dataController.removeFriend(userId, reqId);

            update(reqId);
            updateIO(io, userId);
        })

        socket.on('acceptFriend', (userId, reqId) => {
            dataController.acceptFriendReq(userId, reqId);
            update(reqId);
            updateIO(io, userId);
        })

        socket.on('rejectFriend', (userId, reqId) => {
            dataController.rejectFriendReq(userId, reqId);
            update(reqId);
            updateIO(io, userId);

        })

    });
};


module.exports = { initSocket, dataController };