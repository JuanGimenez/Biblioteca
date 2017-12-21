/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { BibliotecaTestModule } from '../../../test.module';
import { PrestamoDialogComponent } from '../../../../../../main/webapp/app/entities/prestamo/prestamo-dialog.component';
import { PrestamoService } from '../../../../../../main/webapp/app/entities/prestamo/prestamo.service';
import { Prestamo } from '../../../../../../main/webapp/app/entities/prestamo/prestamo.model';
import { LibroService } from '../../../../../../main/webapp/app/entities/libro';
import { EmpleadoService } from '../../../../../../main/webapp/app/entities/empleado';

describe('Component Tests', () => {

    describe('Prestamo Management Dialog Component', () => {
        let comp: PrestamoDialogComponent;
        let fixture: ComponentFixture<PrestamoDialogComponent>;
        let service: PrestamoService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BibliotecaTestModule],
                declarations: [PrestamoDialogComponent],
                providers: [
                    LibroService,
                    EmpleadoService,
                    PrestamoService
                ]
            })
            .overrideTemplate(PrestamoDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PrestamoDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PrestamoService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Prestamo(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.prestamo = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'prestamoListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Prestamo();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.prestamo = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'prestamoListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
