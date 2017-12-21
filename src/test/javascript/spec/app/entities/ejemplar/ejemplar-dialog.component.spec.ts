/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { BibliotecaTestModule } from '../../../test.module';
import { EjemplarDialogComponent } from '../../../../../../main/webapp/app/entities/ejemplar/ejemplar-dialog.component';
import { EjemplarService } from '../../../../../../main/webapp/app/entities/ejemplar/ejemplar.service';
import { Ejemplar } from '../../../../../../main/webapp/app/entities/ejemplar/ejemplar.model';

describe('Component Tests', () => {

    describe('Ejemplar Management Dialog Component', () => {
        let comp: EjemplarDialogComponent;
        let fixture: ComponentFixture<EjemplarDialogComponent>;
        let service: EjemplarService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BibliotecaTestModule],
                declarations: [EjemplarDialogComponent],
                providers: [
                    EjemplarService
                ]
            })
            .overrideTemplate(EjemplarDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EjemplarDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EjemplarService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Ejemplar(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.ejemplar = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'ejemplarListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Ejemplar();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.ejemplar = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'ejemplarListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
