import {Component} from "@angular/core";
import {ToastrService} from "ngx-toastr";
import {HttpRequestsService} from "../../../shared/services/http/http-requests.service";
import {ModalService} from "../../../shared/components/shared-modal/shared-modal-service";
import {User} from "../../../shared/services/current-user/user.model";
import {UserService} from "../../../shared/services/current-user/user.service";
import {Router} from "@angular/router";

enum Months {
      January = 'Январь',
      February = 'Февраль',
      March = 'Март',
      April = 'Апрель',
      May = 'Май',
      June = 'Июнь',
      July = 'Июль',
      August = 'Август',
      September = 'Сентябрь',
      October = 'Октябрь',
      November = 'Ноябрь',
      December = 'Декабрь'
}

class Birthdate {
    day?: number;
    month?: Months;
    year?: number;

    toString(): string | null {
        if (this.day !== undefined && this.month !== undefined && this.year !== undefined) {
            const monthIdx = Object.values(Months).indexOf(this.month);

            if (monthIdx !== -1) {
                const monthNumber = monthIdx + 1;
                const dateString = `${this.year}-${monthNumber}-${this.day}`;
                return dateString;
            }
        }
        return null;
    }
}


@Component({
    selector: 'registration-form',
    templateUrl: './registration.component.html',
    styleUrl: './registration.component.css'
})
export class RegistrationComponent {

    constructor(private toastr: ToastrService, private httpRequestsService: HttpRequestsService, private modalService: ModalService, private userService: UserService, private router: Router) {}

    emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    nameRegex: RegExp = /^[a-zA-Zа-яА-Я]+$/;

    days: number[] = Array.from({ length: 31 }, (_, i) => i + 1);
    months: string[] = Object.values(Months);
    years: number[] = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);


    email: string = '';
    firstName: string = '';
    lastName: string = '';
    middleName: string = '';
    birthdate: Birthdate = new Birthdate();
    password: string = '';
    confirmPassword: string = '';


    isInputValid(): boolean {
        let boolValue: boolean = true;
        let errorString: string = '';

        if(this.email.length === 0) {
            errorString += "Не указана почта<br>";
            boolValue = false;
        } else if (!this.emailRegex.test(this.email) ) {
            errorString += "Неверно указана почта<br>";
            boolValue = false;
        }

        if (this.firstName.length === 0) {
            errorString += "Не указано имя<br>";
            boolValue = false;
        } else if (!this.nameRegex.test(this.firstName)) {
            errorString += "Неверно указано имя<br>";
            boolValue = false;
        }

        if (this.lastName.length === 0) {
            errorString += "Не указана фамилия<br>";
            boolValue = false;
        } else if (!this.nameRegex.test(this.lastName)) {
            errorString += "Неверно указана фамилия<br>";
            boolValue = false;
        }

        if (this.middleName.length === 0) {
            errorString += "Не указано отчество<br>";
            boolValue = false;
        } else if (!this.nameRegex.test(this.middleName)) {
            errorString += "Неверно указано отчество<br>";
            boolValue = false;
        }

       if (this.birthdate.day === undefined) {
            errorString += "Не указан день рождения<br>";
            boolValue = false;
       } if (this.birthdate.month === undefined) {
            errorString += "Не указан месяц рождения<br>";
            boolValue = false;
       } if (this.birthdate.year === undefined) {
            errorString += "Не указан год рождения<br>";
            boolValue = false;

       }

       if (this.password.length === 0) {
            errorString += "Не указан пароль<br>";
            boolValue = false;
       } else if (this.confirmPassword.length === 0) {
            errorString += "Пароль не подтвержден<br>";
            boolValue = false;
       } else if (this.password !== this.confirmPassword) {
            errorString += "Пароли не совпадают<br>";
            boolValue = false;
       }

        if (!boolValue) {
            this.showAlert(errorString);
        }

        return boolValue;
    }

    showAlert(errorString: string) {
        this.toastr.error(`<span class="mat-icon">error</span>  <p class="title"> Ошибка!</p> <p class="cause">${errorString}</p>`);
    }

    showSuccess(successString: string){
        this.toastr.success(`<span class="mat-icon">done </span>  <p class="title">${successString}</p>`);
    }

    registration() {
        this.httpRequestsService.post('auth/signUp',
            {"forUsers": {
                    "firstName": this.firstName,
                    "lastName": this.lastName,
                    "middleName": this.middleName,
                    "birthdate": this.birthdate.toString(),
                    "email": this.email,
                    "role": "пользователь",
                    "status": "активный",
                    "friends": [],
                    "friendsRequests": []
                    },
                    "forAuthData": {
                        "email" : this.email,
                        "password": this.password
                    }
            }).subscribe(
                (response) => {
                    console.log(response);
                    if(response.added) {
                        this.showSuccess("Вы успешно зарегестрировались!")
                        let userData: any = response.userData;
                        console.log(userData);
                        this.userService.setUser(new User(userData))
                        this.modalService.closeModals();

                        this.router.navigate(['/profile', userData.id]).then(() => {
                            console.log('Navigation susccessful');
                        }).catch((error) => {
                            console.log('Navigation error', error);
                        });
                    } else {
                        this.showAlert("Этот Email уже используется");
                    }
                },
                (error) => {
                    console.error('Invalid post-req to api/auth/signUp', error);
                }
        )
    }

    register(): void {
        if(this.isInputValid()) {
            this.registration();
        }
    }
}
