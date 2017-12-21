import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Libreria } from './libreria.model';
import { LibreriaPopupService } from './libreria-popup.service';
import { LibreriaService } from './libreria.service';

@Component({
    selector: 'jhi-libreria-dialog',
    templateUrl: './libreria-dialog.component.html'
})
export class LibreriaDialogComponent implements OnInit {

    libreria: Libreria;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private libreriaService: LibreriaService,
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
        if (this.libreria.id !== undefined) {
            this.subscribeToSaveResponse(
                this.libreriaService.update(this.libreria));
        } else {
            this.subscribeToSaveResponse(
                this.libreriaService.create(this.libreria));
        }
    }

    private subscribeToSaveResponse(result: Observable<Libreria>) {
        result.subscribe((res: Libreria) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Libreria) {
        this.eventManager.broadcast({ name: 'libreriaListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-libreria-popup',
    template: ''
})
export class LibreriaPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private libreriaPopupService: LibreriaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.libreriaPopupService
                    .open(LibreriaDialogComponent as Component, params['id']);
            } else {
                this.libreriaPopupService
                    .open(LibreriaDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
