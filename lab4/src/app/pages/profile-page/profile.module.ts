import {NgModule} from "@angular/core";
import {HeaderComponent} from "../../components/profile-components/header/header.component";
import {InfoComponent} from "../../components/profile-components/info/info.component";
import {UserService} from "../../shared/services/current-user/user.service";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import {ProfileComponent} from "./profile.component";
import {NewsComponent} from "../../shared/components/news/news.component";
import {SocketIoModule, SocketIoConfig} from "ngx-socket-io";
import {NewsService} from "../../shared/components/news/news.service";
import {HeaderModule} from "../../components/profile-components/header/header.module";
import {NewsModule} from "../../shared/components/news/news.module";
import {ModalService} from "../../shared/components/shared-modal/shared-modal-service";
import {LandingModule} from "../landing-page/landing.module";


const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

@NgModule({
    declarations: [
        InfoComponent,
        ProfileComponent,
    ],
    providers: [UserService, NewsService, ModalService],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        MatIconModule,
        BrowserAnimationsModule,
        HttpClientModule,
        SocketIoModule.forRoot(config),
        HeaderModule,
        NewsModule,
        LandingModule,
    ],
    exports: [ProfileComponent],
})
export class ProfileModule{}
