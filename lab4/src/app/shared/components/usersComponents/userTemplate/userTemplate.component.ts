import {Component, Input} from "@angular/core";
import {UsersService} from "../users.service";


@Component({
  selector: 'userTemplate-content',
  templateUrl: './userTemplate.component.html',
  styleUrl: './userTemplate.component.css'
})
export class UserTemplateComponent {
    @Input() userList: any;
    @Input () currentUser: any

    constructor(private usersService: UsersService) {}

    sendFriendReq(userId: number) {
        this.usersService.sendFriendRequest(userId, this.currentUser.id);
    }

    undoFriendReq(userId: number) {
        this.usersService.undoFriendRequest(userId, this.currentUser.id);
    }

    removeFriend(userId: number) {
        this.usersService.removeFriend(userId, this.currentUser.id);
    }


    acceptFriendReq(userId: number) {
        this.usersService.acceptFriend(userId, this.currentUser.id);
    }

    rejectFriendReq(userId: number) {
        this.usersService.rejectFriend(userId, this.currentUser.id);
    }

}
