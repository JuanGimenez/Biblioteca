import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Ejemplar } from './ejemplar.model';
import { EjemplarService } from './ejemplar.service';

@Component({
    selector: 'jhi-ejemplar-detail',
    templateUrl: './ejemplar-detail.component.html'
})
export class EjemplarDetailComponent implements OnInit, OnDestroy {

    ejemplar: Ejemplar;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private ejemplarService: EjemplarService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInEjemplars();
    }

    load(id) {
        this.ejemplarService.find(id).subscribe((ejemplar) => {
            this.ejemplar = ejemplar;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInEjemplars() {
        this.eventSubscriber = this.eventManager.subscribe(
            'ejemplarListModification',
            (response) => this.load(this.ejemplar.id)
        );
    }
}
