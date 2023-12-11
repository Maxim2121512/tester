// modal.service.ts
import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class ModalService {
    modalClosed = new EventEmitter<void>();

    closeModals() {
        this.modalClosed.emit();
    }
}
