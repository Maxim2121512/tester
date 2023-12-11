const fs = require('fs')
const path = require('path')

class AbstractJson {
    constructor(jsonFilePath) {
        this.jsonFilePath = jsonFilePath;
        this.data = this.readData();
    }

    readData() {
        try {
            const jsonData = fs.readFileSync(this.jsonFilePath, 'utf-8');
            this.lastJsonState = JSON.parse(jsonData);
            return this.lastJsonState;
        } catch (e) {
            console.error("Can't read JSON file:", e);
            return [];
        }
    }

    writeData(data) {
        try {
            const jsonDataString = JSON.stringify(data, null, 2);
            fs.writeFileSync(this.jsonFilePath, jsonDataString, 'utf-8');
        } catch (e) {
            console.error("Can't write to JSON file", e);
        }
    }

    getElementById(id, element) {
        let stringId = id.toString();
        const data = this.data.find(item => {
            return (item["id"] === stringId)
        });

        return data[element];
    }

    getElementsById(id, elements) {
        let stringId = id.toString();
        const data = {};
        const foundData = this.data.find(item => {
            return (item["id"] === stringId)
        });

        for(const elem in elements) {
            data[elements[elem]] = foundData[elements[elem]];
        }

        return data;
    }

}

module.exports = AbstractJson;
