const express = require("express");
const bodyParser = require('body-parser');
const router = express.Router();
router.use(bodyParser.json());

const {usersController} = require('../src/controllers/usersController');


router.get('/', usersController.getUsersPage);
router.get('/users', usersController.getUsersPage);
router.get('/friends', usersController.getFriendsPage);
router.get('/news', usersController.getNewsPage);

router.get('/get/allUsers', usersController.getAllUsers);
router.put('/put/user', usersController.editUser);
router.get('/get/friends', usersController.getUserFriends);
router.get('/get/news', usersController.getUserFriendsNews);
router.get('/get/user', usersController.getUser);

module.exports = router;