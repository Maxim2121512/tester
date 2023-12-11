import {Component} from "@angular/core";
import {ToastrService} from "ngx-toastr";
import {HttpRequestsService} from "../../../shared/services/http/http-requests.service";
import {Router} from "@angular/router";
import {ModalService} from "../../../shared/components/shared-modal/shared-modal-service";
import {UserService} from "../../../shared/services/current-user/user.service";
import {User} from "../../../shared/services/current-user/user.model";

@Component({
  selector: 'login-form',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent{

    constructor(private toastr: ToastrService, private httpRequestsService: HttpRequestsService, private router: Router, private modalService: ModalService, private userService: UserService) {}


    emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    email: string = '';
    password: string = '';

    authenticate() {
        this.httpRequestsService.post('auth/signIn', {"email": this.email, "password": this.password}).subscribe(
            (response) => {
                if (response.isMatch) {
                    console.log(response);
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
                    this.showAlert("Неверный логин или пароль");
                }
            },
            (error) => {
                console.error('Invalid post-req to api/auth/signIn', error);
            }
        );
    }

    showAlert(errorString: string) {
        this.toastr.error(`<span class="mat-icon">error</span>  <p class="title"> Ошибка!</p> <p class="cause">${errorString}</p>`);
    }

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

        if (this.password.length === 0) {
            errorString += "Не указан пароль<br>";
            boolValue = false;
        }

        if (!boolValue) {
            this.showAlert(errorString);
        }

        return boolValue;
    }


    login() {
        if(this.isInputValid()) {
            this.authenticate();
        }
    }

}
