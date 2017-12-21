/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { BibliotecaTestModule } from '../../../test.module';
import { LibreriaDialogComponent } from '../../../../../../main/webapp/app/entities/libreria/libreria-dialog.component';
import { LibreriaService } from '../../../../../../main/webapp/app/entities/libreria/libreria.service';
import { Libreria } from '../../../../../../main/webapp/app/entities/libreria/libreria.model';

describe('Component Tests', () => {

    describe('Libreria Management Dialog Component', () => {
        let comp: LibreriaDialogComponent;
        let fixture: ComponentFixture<LibreriaDialogComponent>;
        let service: LibreriaService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BibliotecaTestModule],
                declarations: [LibreriaDialogComponent],
                providers: [
                    LibreriaService
                ]
            })
            .overrideTemplate(LibreriaDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LibreriaDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LibreriaService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Libreria(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.libreria = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'libreriaListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Libreria();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.libreria = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'libreriaListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
