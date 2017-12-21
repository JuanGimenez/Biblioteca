import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Libro } from './libro.model';
import { LibroService } from './libro.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-libro',
    templateUrl: './libro.component.html'
})
export class LibroComponent implements OnInit, OnDestroy {
libros: Libro[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private libroService: LibroService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.libroService.query().subscribe(
            (res: ResponseWrapper) => {
                this.libros = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInLibros();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Libro) {
        return item.id;
    }
    registerChangeInLibros() {
        this.eventSubscriber = this.eventManager.subscribe('libroListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
