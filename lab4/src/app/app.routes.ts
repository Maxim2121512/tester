import {RouterModule, Routes} from '@angular/router';
import {LandingComponent} from "./pages/landing-page/landing.component";
import {NgModule} from "@angular/core";
import {ProfileComponent} from "./pages/profile-page/profile.component";
import {NewsPage} from "./pages/news-page/news.component";
import {AllUsersComponent} from "./pages/allUsers-page/allUsers.component";

export const routes: Routes = [
    {path: '', component: LandingComponent},
    {path: 'profile/:id', component: ProfileComponent},
    {path: 'news', component: NewsPage},
    {path: 'allUsers', component: AllUsersComponent},
    {path: '**', component: LandingComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule{}
