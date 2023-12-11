
const base64 = require('base64-js');
const fs = require('fs')


const {join} = require("path");
const {authJson} = require('../model/AuthJson')
const {newsJson} = require('../model/NewsJson')
const {usersJson}= require('../model/UsersJson');
class AuthController {
    matchUser(req, res) {
        try {
            const userObject = req.body;
            let userId = authJson.matchUser(userObject);

            if (userId !== undefined) {
                //const userAvatar = join(__dirname, `../model/avatars/${userId}`,'avatar.jpg');
                const userAvatar = join(__dirname, `../../public/images`, 'avatar.jpg');
                const imageBuffer = fs.readFileSync(userAvatar);
                const base64Image = base64.fromByteArray(imageBuffer);
                let userData = usersJson.getUserData(userId);
                userData['image'] = base64Image;
                res.status(200).json({isMatch: true, userData: userData});
            } else {
                res.status(250).json({isMatch: false})
            }
        } catch (e) {
            res.status(500);
            console.error("Was an error", e);
        }
    }

    registration(req, res) {
        try {
            const userObject = req.body;
            const dataForAuth = userObject.forAuthData;
            const dataForUsers = userObject.forUsers;

            if(!authJson.addNewUser(dataForAuth)){
                res.status(210).json({added: false});
            } else {
                usersJson.addNewUser(dataForUsers);

                const userAvatar = join(__dirname, `../../public/images`, 'avatar.jpg');
                const imageBuffer = fs.readFileSync(userAvatar);
                dataForUsers['image'] = base64.fromByteArray(imageBuffer);

                newsJson.addNewUser();
                res.status(200).json({added: true, userData: dataForUsers});
            }
        } catch (e) {
            res.status(500);
            console.error("Was an error", e);
        }
    }
}


module.exports = new AuthController();