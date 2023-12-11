// landing.component.ts

import {Component, OnDestroy, OnInit} from '@angular/core';
import {GlobalStyleService} from "../../shared/services/global-styles/global-style.service";
import {Title} from "@angular/platform-browser";
import {ModalService} from "../../shared/components/shared-modal/shared-modal-service";

@Component({
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit{

    constructor(private globalStyleService: GlobalStyleService, private titleService: Title, private modalService: ModalService) {}

    ngOnInit() {
        this.titleService.setTitle('Добро Пожаловать!');
        this.globalStyleService.setGlobalStyles('body', {
            'background': 'rgba(10,10,10, 0.9)',
        })
        this.modalService.modalClosed.subscribe(() => {
            this.closeModalForm();
        })
    }


    isLoginFormOpen: boolean = false;
    isRegistrationFormOpen: boolean = false;

    openRegistrationForm(): void {
        this.isRegistrationFormOpen = true;
    }

    openLoginForm(): void {
        this.isLoginFormOpen = true;
    }

    closeModalForm(): void {
          if (this.isLoginFormOpen || this.isRegistrationFormOpen) {
              this.isLoginFormOpen = false;
              this.isRegistrationFormOpen = false;
              this.modalService.closeModals();
          }
    }



}
