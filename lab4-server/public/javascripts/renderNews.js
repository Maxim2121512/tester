
function renderNews(data, divName) {
    const newsBlockContent = $(`.${divName}`);
    console.log(data);

    data.news.forEach(news => {
           const lines = news.title.split('\n');
           const paragraphs = lines.map(line => `<p>${line}</p>`).join('');
           newsBlockContent.append(`
                <div class="news-post-content" id="${news.id}">
                    <div class="news-post-metaData">
                        <p>${data.usernames[news.id].firstName} ${data.usernames[news.id].lastName} ${data.usernames[news.id].middleName}</p>
                        <p>${news.date}</p>
                    </div>
                    <div class="news-post">
                        <p>${paragraphs}</p>
                    </div>
                </div>   
           `)
    });

}

function renderHeader(user, divName) {
    const headerContent = $(`.${divName}`);

    headerContent.append(`
        <p>Новости пользователя</p> 
        <p>${user.firstName} ${user.lastName}</p>
    `);
}

export {renderNews, renderHeader};