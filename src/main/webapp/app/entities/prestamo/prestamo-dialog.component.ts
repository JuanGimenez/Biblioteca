import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Prestamo } from './prestamo.model';
import { PrestamoPopupService } from './prestamo-popup.service';
import { PrestamoService } from './prestamo.service';
import { Libro, LibroService } from '../libro';
import { Empleado, EmpleadoService } from '../empleado';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-prestamo-dialog',
    templateUrl: './prestamo-dialog.component.html'
})
export class PrestamoDialogComponent implements OnInit {

    prestamo: Prestamo;
    isSaving: boolean;

    libros: Libro[];

    empleados: Empleado[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private prestamoService: PrestamoService,
        private libroService: LibroService,
        private empleadoService: EmpleadoService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.libroService.query()
            .subscribe((res: ResponseWrapper) => { this.libros = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.empleadoService.query()
            .subscribe((res: ResponseWrapper) => { this.empleados = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.prestamo.id !== undefined) {
            this.subscribeToSaveResponse(
                this.prestamoService.update(this.prestamo));
        } else {
            this.subscribeToSaveResponse(
                this.prestamoService.create(this.prestamo));
        }
    }

    private subscribeToSaveResponse(result: Observable<Prestamo>) {
        result.subscribe((res: Prestamo) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Prestamo) {
        this.eventManager.broadcast({ name: 'prestamoListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackLibroById(index: number, item: Libro) {
        return item.id;
    }

    trackEmpleadoById(index: number, item: Empleado) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-prestamo-popup',
    template: ''
})
export class PrestamoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private prestamoPopupService: PrestamoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.prestamoPopupService
                    .open(PrestamoDialogComponent as Component, params['id']);
            } else {
                this.prestamoPopupService
                    .open(PrestamoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
