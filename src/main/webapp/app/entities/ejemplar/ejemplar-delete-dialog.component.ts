import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Ejemplar } from './ejemplar.model';
import { EjemplarPopupService } from './ejemplar-popup.service';
import { EjemplarService } from './ejemplar.service';

@Component({
    selector: 'jhi-ejemplar-delete-dialog',
    templateUrl: './ejemplar-delete-dialog.component.html'
})
export class EjemplarDeleteDialogComponent {

    ejemplar: Ejemplar;

    constructor(
        private ejemplarService: EjemplarService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.ejemplarService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'ejemplarListModification',
                content: 'Deleted an ejemplar'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-ejemplar-delete-popup',
    template: ''
})
export class EjemplarDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private ejemplarPopupService: EjemplarPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.ejemplarPopupService
                .open(EjemplarDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
