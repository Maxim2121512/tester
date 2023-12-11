import {NgModule} from "@angular/core";
import {HeaderComponent} from "./header.component";
import {LandingModule} from "../../../pages/landing-page/landing.module";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";


@NgModule({
    declarations: [HeaderComponent],
    imports: [
        LandingModule,
        FormsModule,
        NgIf
    ],
    exports: [HeaderComponent]
})
export class HeaderModule {}
