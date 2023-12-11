import {Component, Input} from "@angular/core";


@Component({
    selector: 'news-content',
    templateUrl: './news.component.html',
    styleUrl: './news.component.css'
})
export class NewsComponent {
    @Input() newsList: any;
}
