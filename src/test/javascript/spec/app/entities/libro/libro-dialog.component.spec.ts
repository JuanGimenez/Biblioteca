/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { BibliotecaTestModule } from '../../../test.module';
import { LibroDialogComponent } from '../../../../../../main/webapp/app/entities/libro/libro-dialog.component';
import { LibroService } from '../../../../../../main/webapp/app/entities/libro/libro.service';
import { Libro } from '../../../../../../main/webapp/app/entities/libro/libro.model';
import { EjemplarService } from '../../../../../../main/webapp/app/entities/ejemplar';
import { LibreriaService } from '../../../../../../main/webapp/app/entities/libreria';

describe('Component Tests', () => {

    describe('Libro Management Dialog Component', () => {
        let comp: LibroDialogComponent;
        let fixture: ComponentFixture<LibroDialogComponent>;
        let service: LibroService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BibliotecaTestModule],
                declarations: [LibroDialogComponent],
                providers: [
                    EjemplarService,
                    LibreriaService,
                    LibroService
                ]
            })
            .overrideTemplate(LibroDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LibroDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LibroService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Libro(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.libro = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'libroListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Libro();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.libro = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'libroListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
