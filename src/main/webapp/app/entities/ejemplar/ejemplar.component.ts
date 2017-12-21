import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Ejemplar } from './ejemplar.model';
import { EjemplarService } from './ejemplar.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-ejemplar',
    templateUrl: './ejemplar.component.html'
})
export class EjemplarComponent implements OnInit, OnDestroy {
ejemplars: Ejemplar[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private ejemplarService: EjemplarService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.ejemplarService.query().subscribe(
            (res: ResponseWrapper) => {
                this.ejemplars = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInEjemplars();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Ejemplar) {
        return item.id;
    }
    registerChangeInEjemplars() {
        this.eventSubscriber = this.eventManager.subscribe('ejemplarListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
