
function renderUserCards(data, divName) {
    const usersBlockContent = $(`.${divName}`);
    console.log(usersBlockContent);
    data.forEach(user => {
        usersBlockContent.append(`
            <div class="userPersonalTab" id="${user.id}">
                <div class="userPersonalTab-accordion">
                    <h3>Личная информация</h3>
                    <div class="userName">
                        <img src="/public/images/avatar.jpg" alt="Аватарка" width="100" height="100">
                        <p>Имя: <span id="firstName-span">${user.firstName}</span></p>
                        <p>Фамилия: <span id="lastName-span">${user.lastName}</span></p>
                        <p>Отчество: <span id="middleName-span">${user.middleName}</span></p>
                    </div>
                    <h3>Контактная информация</h3>
                    <div class="userContacts">
                        <p>Email: <span id="email-span">${user.email}</span></p>
                    </div>
        
                    <h3>Статусная информация</h3>
                    <div class="userRoles">
                        <p>Роль: <span id="role-span">${user.role}</span></p>
                        <p>Статус: <span id="status-span">${user.status}</span></p>
                    </div>
                </div>
                
                <div class="buttons-div">
                    <button class="change-button" id="change-userData"><span class="ui-icon ui-icon-gear"></span></button>
                    <button class="friends-button" id="user-friends"><span class="ui-icon ui-icon-person"></span></button>
                    <button class="news-button" id="user-news"><span class="ui-icon ui-icon-comment"></span></button>
                </div>
            </div>
            `);
    });
}

function renderHeader(user, divName) {
    const headerContent = $(`.${divName}`);

    headerContent.append(`
        <p>Друзья пользователя</p> 
        <p>${user.firstName} ${user.lastName}</p>
    `);
}

export {renderUserCards, renderHeader};