import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Prestamo } from './prestamo.model';
import { PrestamoPopupService } from './prestamo-popup.service';
import { PrestamoService } from './prestamo.service';

@Component({
    selector: 'jhi-prestamo-delete-dialog',
    templateUrl: './prestamo-delete-dialog.component.html'
})
export class PrestamoDeleteDialogComponent {

    prestamo: Prestamo;

    constructor(
        private prestamoService: PrestamoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.prestamoService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'prestamoListModification',
                content: 'Deleted an prestamo'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-prestamo-delete-popup',
    template: ''
})
export class PrestamoDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private prestamoPopupService: PrestamoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.prestamoPopupService
                .open(PrestamoDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
