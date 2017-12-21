import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Libro } from './libro.model';
import { LibroPopupService } from './libro-popup.service';
import { LibroService } from './libro.service';
import { Ejemplar, EjemplarService } from '../ejemplar';
import { Libreria, LibreriaService } from '../libreria';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-libro-dialog',
    templateUrl: './libro-dialog.component.html'
})
export class LibroDialogComponent implements OnInit {

    libro: Libro;
    isSaving: boolean;

    ejemplars: Ejemplar[];

    librerias: Libreria[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private libroService: LibroService,
        private ejemplarService: EjemplarService,
        private libreriaService: LibreriaService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.ejemplarService.query()
            .subscribe((res: ResponseWrapper) => { this.ejemplars = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.libreriaService.query()
            .subscribe((res: ResponseWrapper) => { this.librerias = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.libro.id !== undefined) {
            this.subscribeToSaveResponse(
                this.libroService.update(this.libro));
        } else {
            this.subscribeToSaveResponse(
                this.libroService.create(this.libro));
        }
    }

    private subscribeToSaveResponse(result: Observable<Libro>) {
        result.subscribe((res: Libro) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Libro) {
        this.eventManager.broadcast({ name: 'libroListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackEjemplarById(index: number, item: Ejemplar) {
        return item.id;
    }

    trackLibreriaById(index: number, item: Libreria) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-libro-popup',
    template: ''
})
export class LibroPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private libroPopupService: LibroPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.libroPopupService
                    .open(LibroDialogComponent as Component, params['id']);
            } else {
                this.libroPopupService
                    .open(LibroDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
