import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Socket} from "ngx-socket-io";
import {UserService} from "../../services/current-user/user.service";


@Injectable({
  providedIn: 'root'
})
export class UsersService {
    currentUser:  Observable<any[]>;
    usersList: Observable<any[]>;


    constructor(private socket: Socket) {
        this.usersList = this.socket.fromEvent('updateUsersList');
        this.currentUser = this.socket.fromEvent('updateCurrentUser');
    }
    initUsersList(userId: any): void {
        this.socket.emit('initUsersList', userId);
    }

    initCurrentUser(userId: any) {
        this.socket.emit('initCurrentUser', userId);
    }


    sendFriendRequest(userId: any, reqId: any) {
        this.socket.emit('friendRequest', userId, reqId);
    }

    undoFriendRequest(userId: any, reqId: any) {
        this.socket.emit('undoFriendRequest', userId, reqId);
    }

    removeFriend(userId: any, reqId: any) {
        this.socket.emit('removeFriend', userId, reqId);
    }

    acceptFriend(userId: any, reqId: any) {
        this.socket.emit('acceptFriend', userId, reqId);
    }

    rejectFriend(userId: any, reqId: any) {
        this.socket.emit('rejectFriend', userId, reqId)
    }

}
