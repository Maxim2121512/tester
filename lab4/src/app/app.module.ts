import {NgModule} from "@angular/core";
import {LandingModule} from "./pages/landing-page/landing.module";
import {BrowserModule} from "@angular/platform-browser";
import {AppRoutingModule} from "./app.routes";
import {ProfileModule} from "./pages/profile-page/profile.module";
import {AppComponent} from "./app.component";
import {NewsPageModule} from "./pages/news-page/news.moudle";
import {AllUsersModule} from "./pages/allUsers-page/allUsers.module";


@NgModule({
    declarations: [
      AppComponent,
    ],
    imports: [
        BrowserModule,
        LandingModule,
        AppRoutingModule,
        ProfileModule,
        NewsPageModule,
        AllUsersModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule{

}
