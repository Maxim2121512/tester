// landing.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {LandingComponent} from "./landing.component";
import {LoginComponent} from "../../components/auth/login-component/login.component";
import {RegistrationComponent} from "../../components/auth/registration-component/registration.component";
import {SharedModal} from "../../shared/components/shared-modal/shared-modal.component";
import {GlobalStyleService} from "../../shared/services/global-styles/global-style.service";
import {ToastrModule, ToastrService} from "ngx-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatIconModule} from "@angular/material/icon";
import {HttpRequestsService} from "../../shared/services/http/http-requests.service";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {ModalService} from "../../shared/components/shared-modal/shared-modal-service";


@NgModule({
    declarations: [
      LandingComponent,
      LoginComponent,
      RegistrationComponent,
      SharedModal

    ],
    providers: [GlobalStyleService, ToastrService, HttpRequestsService, ModalService],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        MatIconModule,
        BrowserAnimationsModule,
        HttpClientModule,
        ToastrModule.forRoot({
            timeOut: 3000,
            enableHtml: true,
            positionClass: 'custom-toast-style',
            preventDuplicates: true,
        })

    ],
    exports: [
        LandingComponent,
        SharedModal
    ]
})
export class LandingModule { }
