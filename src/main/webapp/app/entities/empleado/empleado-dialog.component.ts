import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Empleado } from './empleado.model';
import { EmpleadoPopupService } from './empleado-popup.service';
import { EmpleadoService } from './empleado.service';

@Component({
    selector: 'jhi-empleado-dialog',
    templateUrl: './empleado-dialog.component.html'
})
export class EmpleadoDialogComponent implements OnInit {

    empleado: Empleado;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private empleadoService: EmpleadoService,
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
        if (this.empleado.id !== undefined) {
            this.subscribeToSaveResponse(
                this.empleadoService.update(this.empleado));
        } else {
            this.subscribeToSaveResponse(
                this.empleadoService.create(this.empleado));
        }
    }

    private subscribeToSaveResponse(result: Observable<Empleado>) {
        result.subscribe((res: Empleado) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Empleado) {
        this.eventManager.broadcast({ name: 'empleadoListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-empleado-popup',
    template: ''
})
export class EmpleadoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private empleadoPopupService: EmpleadoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.empleadoPopupService
                    .open(EmpleadoDialogComponent as Component, params['id']);
            } else {
                this.empleadoPopupService
                    .open(EmpleadoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
