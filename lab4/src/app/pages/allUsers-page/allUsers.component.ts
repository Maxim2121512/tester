import {Component, OnInit} from "@angular/core";
import {GlobalStyleService} from "../../shared/services/global-styles/global-style.service";
import {Title} from "@angular/platform-browser";
import {UserService} from "../../shared/services/current-user/user.service";
import {NewsService} from "../../shared/components/news/news.service";
import {UsersService} from "../../shared/components/usersComponents/users.service";


@Component({
    selector: 'all-users',
    templateUrl: './allUsers.component.html',
    styleUrl: './allUsers.component.css'
})
export class AllUsersComponent implements OnInit{
    usersList: any
    currentUser: any
    userId: any
    constructor(private globalStyleService: GlobalStyleService, private titleService: Title, private usersService: UsersService, private userService: UserService) {}

    ngOnInit() {
        this.titleService.setTitle('Профиль');
        this.globalStyleService.setGlobalStyles('body', {
          'background': 'rgba(10,10,10, 0.9)',
        });

        this.userId = this.userService.getUser()?.id;

        this.usersService.usersList.subscribe(data => {
          this.usersList = data;
        })

        this.usersService.currentUser.subscribe(data => {
            this.currentUser = data;
        })

        this.usersService.initCurrentUser(this.userId);
        this.usersService.initUsersList(this.userId);
    }
}
