const AbstractJson = require('./AbstractJson.js');
const {join} = require("path");
const authDataJsonPath = join(__dirname, '../model/jsons', 'authData.json');

class AuthJson extends AbstractJson {
    constructor(jsonFilePath) {
        super(jsonFilePath);
    }

    matchUser(userObject) {
        const foundUser = this.data.find(item => {
            return (item["email"] === userObject["email"] && item["password"] === userObject["password"]);
        });
        console.log(foundUser)
        return foundUser ===  undefined ? undefined : foundUser.id;
    }

    addNewUser(userData) {
        const isEmailPresent = this.data.some(item => {
            return item["email"] === userData["email"];
        });

        if (isEmailPresent) {
            return false;
        }
        userData["id"] = (this.data.length + 1).toString();
        this.data.push(userData);
        this.writeData(this.data);

        return true;
    }

}

module.exports.authJson = new AuthJson(authDataJsonPath);
