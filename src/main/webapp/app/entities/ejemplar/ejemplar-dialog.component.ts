import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Ejemplar } from './ejemplar.model';
import { EjemplarPopupService } from './ejemplar-popup.service';
import { EjemplarService } from './ejemplar.service';

@Component({
    selector: 'jhi-ejemplar-dialog',
    templateUrl: './ejemplar-dialog.component.html'
})
export class EjemplarDialogComponent implements OnInit {

    ejemplar: Ejemplar;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private ejemplarService: EjemplarService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.ejemplar.id !== undefined) {
            this.subscribeToSaveResponse(
                this.ejemplarService.update(this.ejemplar));
        } else {
            this.subscribeToSaveResponse(
                this.ejemplarService.create(this.ejemplar));
        }
    }

    private subscribeToSaveResponse(result: Observable<Ejemplar>) {
        result.subscribe((res: Ejemplar) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Ejemplar) {
        this.eventManager.broadcast({ name: 'ejemplarListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-ejemplar-popup',
    template: ''
})
export class EjemplarPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private ejemplarPopupService: EjemplarPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.ejemplarPopupService
                    .open(EjemplarDialogComponent as Component, params['id']);
            } else {
                this.ejemplarPopupService
                    .open(EjemplarDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
