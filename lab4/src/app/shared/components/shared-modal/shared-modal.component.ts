
import {Component, EventEmitter, Input, Output} from "@angular/core";
import {ModalService} from "./shared-modal-service";

@Component({
    selector: 'shared-modal',
    templateUrl: './shared-modal.component.html',
    styleUrl: './shared-modal.component.css'
})
export class SharedModal {
    @Input() isOpen: boolean = false;

    constructor(private modalService: ModalService) {
    }

    closeModal(): void {
        this.modalService.closeModals();
    }
}
