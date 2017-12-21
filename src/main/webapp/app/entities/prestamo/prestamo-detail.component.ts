import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Prestamo } from './prestamo.model';
import { PrestamoService } from './prestamo.service';

@Component({
    selector: 'jhi-prestamo-detail',
    templateUrl: './prestamo-detail.component.html'
})
export class PrestamoDetailComponent implements OnInit, OnDestroy {

    prestamo: Prestamo;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private prestamoService: PrestamoService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPrestamos();
    }

    load(id) {
        this.prestamoService.find(id).subscribe((prestamo) => {
            this.prestamo = prestamo;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPrestamos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'prestamoListModification',
            (response) => this.load(this.prestamo.id)
        );
    }
}
