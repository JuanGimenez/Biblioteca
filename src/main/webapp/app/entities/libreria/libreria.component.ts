import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Libreria } from './libreria.model';
import { LibreriaService } from './libreria.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-libreria',
    templateUrl: './libreria.component.html'
})
export class LibreriaComponent implements OnInit, OnDestroy {
librerias: Libreria[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private libreriaService: LibreriaService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.libreriaService.query().subscribe(
            (res: ResponseWrapper) => {
                this.librerias = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInLibrerias();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Libreria) {
        return item.id;
    }
    registerChangeInLibrerias() {
        this.eventSubscriber = this.eventManager.subscribe('libreriaListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
