import {callAjax} from "./callAjax.js";

class UsersBlock {

    initialize() {
        const modal = $(".modal");
        $(".userPersonalTab-accordion").accordion();
        $(".select-menu").selectmenu();

        $(".close").on("click", () => {
            modal.css("display", "none");
        });

        $(".change-button").on("click", (event) => {
            this.currentPersonalTab = $(event.currentTarget).closest('.userPersonalTab');
            let userData = this.getUserData(this.currentPersonalTab);
            this.setModalInputForm(userData);

            modal.css("display", "block");
        });

        $("#form-change-userName").on("submit", (event) => {
            event.preventDefault();
            const modalData = this.getModalInputForm();
            modalData.id = this.currentPersonalTab.attr("id");
            callAjax(`/put/user`, 'PUT', () => {}, JSON.stringify(modalData), 'application/json');
            this.setUserData(this.currentPersonalTab, modalData);
            modal.css("display", "none");
        });

        $(".friends-button").on("click", () => {
            const id = $(event.currentTarget).closest('.userPersonalTab').attr("id");
            window.location.href = `/friends?id=${id}`;
        });

        $(".news-button").on("click", () => {
            const id = $(event.currentTarget).closest('.userPersonalTab').attr("id");
            window.location.href = `/news?id=${id}`;
        });
    }

    getUserData(root) {
        let userData = {};
        userData.firstName = root.find('#firstName-span').text();
        userData.lastName = root.find('#lastName-span').text();
        userData.middleName = root.find('#middleName-span').text();
        userData.email = root.find('#email-span').text();
        userData.role = root.find('#role-span').text();
        userData.status = root.find('#status-span').text();

        return userData;
    }

    setUserData(root, data) {
        root.find('#firstName-span').text(data.firstName);
        root.find('#lastName-span').text(data.lastName);
        root.find('#middleName-span').text(data.middleName);
        root.find('#email-span').text(data.email);
        root.find('#role-span').text(data.role);
        root.find('#status-span').text(data.status);
    }

    setModalInputForm(data) {
        $('#firstName').val(data.firstName);
        $('#lastName').val(data.lastName);
        $('#middleName').val(data.middleName);
        $('#email').val(data.email);

        $('#select-role option').each((idx, elem) => {
            if ($(elem).text() === data.role) {
                $(elem).prop('selected', true);
            }
        });

        $('#select-status option').each((idx, elem) => {
            if ($(elem).text() === data.status) {
                $(elem).prop('selected', true);
            }
        });

        $("#select-role").selectmenu('refresh');
        $("#select-status").selectmenu('refresh');

    }

    getModalInputForm() {
        return {
            firstName: $('#firstName').val(),
            lastName: $('#lastName').val(),
            middleName: $('#middleName').val(),
            email: $('#email').val(),
            role: $('#select-role option:selected').text(),
            status: $('#select-status option:selected').text()
        };
    }
}

export default UsersBlock;