const AbstractJson = require('./AbstractJson.js');
const {join} = require("path");
const fs = require("fs");
const base64 = require("base64-js");

const usersDataJsonPath = join(__dirname, '../model/jsons', 'users.json');

class UsersJson extends AbstractJson {
    constructor(jsonFilePath) {
        super(jsonFilePath);
    }

    addNewUser(userData) {
        userData["id"] = (this.data.length + 1).toString();
        userData["friends"] = [];
        this.data.push(userData);
        this.writeData(this.data);
    }

    getUserData(id) {
        let stringId = id.toString();
        const userData = this.data.find(item => {
            return (item["id"] === stringId)
        });
        console.log(userData)
        return userData;
    }

    getUsersByIds(ids) {
        let data = [];
        this.data.forEach(item => {
            if (ids.includes(item.id)) {
                let elem = {...item};
                const userAvatar = join(__dirname, `../model/avatars/${elem.id}`,'avatar.jpg');
                const imageBuffer = fs.readFileSync(userAvatar);
                elem['image'] = base64.fromByteArray(imageBuffer);
                data.push(elem);
            }
        })
        return data;
    }

    getAllUsers(excludeId) {
        let data = [...this.data];
        const index = data.findIndex(user => user.id === excludeId);

        if (index !== -1) {
            data.splice(index, 1);
        }

        data.forEach(item => {
            const userAvatar = join(__dirname, `../../public/images`, 'avatar.jpg');
            const imageBuffer = fs.readFileSync(userAvatar);
            item['image'] = base64.fromByteArray(imageBuffer);
        })

        return data;
    }

    editElement(newElem) {
        const id = this.data.findIndex(elem => elem.id === newElem.id);

        if (id !== -1) {
            this.data[id] = {...this.data[id], ...newElem};
            this.writeData(this.data);
        } else {
            console.error(`Elem with id ${id} not found`);
        }
    }

    getObjectsById(id) {
        return this.data.filter(obj => id.includes(obj.id));
    }

    getObjectById(id) {
        return this.data.find(obj => obj.id === id);
    }



}

module.exports.usersJson = new UsersJson(usersDataJsonPath);