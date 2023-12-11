import {Injectable} from "@angular/core";
import {Socket} from "ngx-socket-io";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class NewsService {

    news: Observable<any[]>;
    friendsNews: Observable<any[]>;

    constructor(private socket: Socket ) {
      this.news = this.socket.fromEvent('newsUpdate');
      this.friendsNews = this.socket.fromEvent('friendsNewsUpdate')
    }

    initNews(userId: any): void {
        this.socket.emit('initNews', userId);
        this.socket.emit('initUser', userId);
        console.log(this.news);
    }

    initFriendNews(userId: any) {
        this.socket.emit('initFriendsNews', userId);
        this.socket.emit('initUser', userId);
    }

    addNews(news: any) {
        this.socket.emit('addNews', news);
    }
}
