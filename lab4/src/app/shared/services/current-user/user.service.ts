import {Inject, Injectable} from "@angular/core";
import {User} from "./user.model";
import {HttpRequestsService} from "../http/http-requests.service";
import {Socket} from "ngx-socket-io";


@Injectable({
    providedIn: 'root'
})
export class UserService {
    private user: User | null = null;

    constructor(private httpRequestService: HttpRequestsService, private socket: Socket) {
        const storedUser = sessionStorage.getItem('user');


        if (storedUser) {
            this.user = JSON.parse(storedUser);
        }
    }

    setUser(user: User): void {
        this.user = user;
        sessionStorage.setItem('user', JSON.stringify(user));
    }

    getUser(): User | null {
        return this.user;
    }


}
