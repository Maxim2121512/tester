const AbstractJson = require('./AbstractJson.js');
const {join} = require("path");

const newsDataJsonPath = join(__dirname, '../model/jsons', 'news.json');
class NewsJson extends AbstractJson {
    constructor(jsonFilePath) {
        super(jsonFilePath);
    }

    addNewUser() {
        const userData =
            {
                "id": (this.data.length + 1).toString(),
                "news": []
            };

        this.data.push(userData);
        this.writeData(this.data);
    }

    getNews(friendsId, friendsNames) {
        return this.getElementByIds(friendsId)
            .map(item => ({news: item["news"]}))
            .sort((a,b) => new Date[a.news[0].date] - new Date(b.news[0].date));
    }

    getFriendsNews(friendsList) {
        let friendsNews = [];

        this.data.forEach(elem => {
            if (friendsList.includes(elem.id)) {
                elem.news.forEach(news => {
                    friendsNews.push({
                        id: elem.id,
                        date: news.date,
                        title: news.title
                    });
                });
            }
        });

        friendsNews.sort((a, b) => new Date(a.date) - new Date(b.date));

        return friendsNews;
    }


}

module.exports.newsJson = new NewsJson(newsDataJsonPath);