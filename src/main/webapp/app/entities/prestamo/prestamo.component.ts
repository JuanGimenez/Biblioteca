import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Prestamo } from './prestamo.model';
import { PrestamoService } from './prestamo.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-prestamo',
    templateUrl: './prestamo.component.html'
})
export class PrestamoComponent implements OnInit, OnDestroy {
prestamos: Prestamo[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private prestamoService: PrestamoService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.prestamoService.query().subscribe(
            (res: ResponseWrapper) => {
                this.prestamos = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInPrestamos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Prestamo) {
        return item.id;
    }
    registerChangeInPrestamos() {
        this.eventSubscriber = this.eventManager.subscribe('prestamoListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
