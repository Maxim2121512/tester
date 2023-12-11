import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatIconModule} from "@angular/material/icon";
import {UserTemplateComponent} from "./userTemplate.component";
import {UsersService} from "../users.service";
import {UserService} from "../../../services/current-user/user.service";


@NgModule({
  declarations: [UserTemplateComponent],
  providers: [UsersService, UserService],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    BrowserAnimationsModule,
    MatIconModule,
  ],
  exports: [UserTemplateComponent]
})
export class UserTemplateModule {}
