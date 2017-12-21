import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Libro } from './libro.model';
import { LibroService } from './libro.service';

@Component({
    selector: 'jhi-libro-detail',
    templateUrl: './libro-detail.component.html'
})
export class LibroDetailComponent implements OnInit, OnDestroy {

    libro: Libro;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private libroService: LibroService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInLibros();
    }

    load(id) {
        this.libroService.find(id).subscribe((libro) => {
            this.libro = libro;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInLibros() {
        this.eventSubscriber = this.eventManager.subscribe(
            'libroListModification',
            (response) => this.load(this.libro.id)
        );
    }
}
