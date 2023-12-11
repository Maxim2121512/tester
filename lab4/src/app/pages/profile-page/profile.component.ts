import {Component, OnInit} from "@angular/core";
import {GlobalStyleService} from "../../shared/services/global-styles/global-style.service";
import {Title} from "@angular/platform-browser";
import {UserService} from "../../shared/services/current-user/user.service";
import {NewsService} from "../../shared/components/news/news.service";
import {ModalService} from "../../shared/components/shared-modal/shared-modal-service";

@Component({
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
    userData: any
    newsList: any;
    isFormOpen: boolean = false;
    constructor(private globalStyleService: GlobalStyleService, private titleService: Title, private userService: UserService, private newsService: NewsService, private modalService: ModalService) {}

    ngOnInit() {
        this.titleService.setTitle('Профиль');
        this.globalStyleService.setGlobalStyles('body', {
            'background': 'rgba(10,10,10, 0.9)',
        });
        this.userData = this.userService.getUser();


        this.newsService.news.subscribe((data) => {
            this.newsList = data;
            console.log(data);
        });

        this.newsService.initNews(this.userData.id);
    }

}
