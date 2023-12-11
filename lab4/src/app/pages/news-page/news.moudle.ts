import {NgModule} from "@angular/core";
import {NewsComponent} from "../../shared/components/news/news.component";
import {NewsPage} from "./news.component";
import {UserService} from "../../shared/services/current-user/user.service";
import {NewsService} from "../../shared/components/news/news.service";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatIconModule} from "@angular/material/icon";
import {HttpClientModule} from "@angular/common/http";
import {HeaderModule} from "../../components/profile-components/header/header.module";
import {NewsModule} from "../../shared/components/news/news.module";


@NgModule({
    declarations: [NewsPage],
    providers: [UserService, NewsService],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        BrowserAnimationsModule,
        MatIconModule,
        HttpClientModule,
        HeaderModule,
        NewsModule
    ],
    exports: [NewsComponent]
})
export class NewsPageModule {}
