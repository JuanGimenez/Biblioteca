import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Libro } from './libro.model';
import { LibroPopupService } from './libro-popup.service';
import { LibroService } from './libro.service';

@Component({
    selector: 'jhi-libro-delete-dialog',
    templateUrl: './libro-delete-dialog.component.html'
})
export class LibroDeleteDialogComponent {

    libro: Libro;

    constructor(
        private libroService: LibroService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.libroService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'libroListModification',
                content: 'Deleted an libro'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-libro-delete-popup',
    template: ''
})
export class LibroDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private libroPopupService: LibroPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.libroPopupService
                .open(LibroDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
