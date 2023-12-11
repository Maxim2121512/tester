import {Component, OnInit} from "@angular/core";
import {GlobalStyleService} from "../../shared/services/global-styles/global-style.service";
import {Title} from "@angular/platform-browser";
import {UserService} from "../../shared/services/current-user/user.service";
import {NewsService} from "../../shared/components/news/news.service";

@Component({
  templateUrl: './news.component.html',
  styleUrl: './news.component.css'
})
export class NewsPage implements OnInit {

    userId: any
    friendsNews: any

    constructor(private globalStyleService: GlobalStyleService, private titleService: Title, private userService: UserService, private newsService: NewsService) {}

    ngOnInit() {
        this.titleService.setTitle('Профиль');
        this.globalStyleService.setGlobalStyles('body', {
          'background': 'rgba(10,10,10, 0.9)',
        });

        let user = this.userService.getUser();
        this.userId = user?.id;
        this.newsService.friendsNews.subscribe(data => {
            this.friendsNews = data;
        })

        this.newsService.initFriendNews(this.userId);
    }
}
