import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Libreria } from './libreria.model';
import { LibreriaService } from './libreria.service';

@Component({
    selector: 'jhi-libreria-detail',
    templateUrl: './libreria-detail.component.html'
})
export class LibreriaDetailComponent implements OnInit, OnDestroy {

    libreria: Libreria;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private libreriaService: LibreriaService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInLibrerias();
    }

    load(id) {
        this.libreriaService.find(id).subscribe((libreria) => {
            this.libreria = libreria;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInLibrerias() {
        this.eventSubscriber = this.eventManager.subscribe(
            'libreriaListModification',
            (response) => this.load(this.libreria.id)
        );
    }
}
