import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Libreria } from './libreria.model';
import { LibreriaPopupService } from './libreria-popup.service';
import { LibreriaService } from './libreria.service';

@Component({
    selector: 'jhi-libreria-delete-dialog',
    templateUrl: './libreria-delete-dialog.component.html'
})
export class LibreriaDeleteDialogComponent {

    libreria: Libreria;

    constructor(
        private libreriaService: LibreriaService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.libreriaService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'libreriaListModification',
                content: 'Deleted an libreria'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-libreria-delete-popup',
    template: ''
})
export class LibreriaDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private libreriaPopupService: LibreriaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.libreriaPopupService
                .open(LibreriaDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
