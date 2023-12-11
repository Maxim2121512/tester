import {NgModule} from "@angular/core";
import {UserService} from "../../shared/services/current-user/user.service";
import {NewsService} from "../../shared/components/news/news.service";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {UsersService} from "../../shared/components/usersComponents/users.service";
import {AllUsersComponent} from "./allUsers.component";
import {UserTemplateModule} from "../../shared/components/usersComponents/userTemplate/userTemplate.module";
import {HeaderModule} from "../../components/profile-components/header/header.module";


@NgModule({
  declarations: [AllUsersComponent],
  providers: [UserService, NewsService, UsersService],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    BrowserAnimationsModule,
    UserTemplateModule,
    HeaderModule
  ],
  exports: [AllUsersComponent]
})
export class AllUsersModule {}
